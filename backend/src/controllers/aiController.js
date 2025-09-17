const { ChatSession, ChatMessage, Document } = require('../models');
const ollamaService = require('../services/ollamaService');
const documentService = require('../services/documentService');
const logger = require('../utils/logger');

class AIController {
  constructor() {
    this.chat = this.chat.bind(this);
    this.processDocument = this.processDocument.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.getModels = this.getModels.bind(this);
    this.searchDocuments = this.searchDocuments.bind(this);
  }

  async chat(req, res, next) {
    try {
      const { sessionId, message, language = 'en', model } = req.body;

      const session = await ChatSession.findOne({
        where: {
          id: sessionId,
          userId: req.user.id,
          organizationId: req.user.organizationId
        }
      });

      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }

      const recentMessages = await ChatMessage.findAll({
        where: { sessionId },
        order: [['createdAt', 'DESC']],
        limit: 10
      });

      const conversation = recentMessages.reverse().map(m => ({ role: m.role, content: m.content }));
      conversation.push({ role: 'user', content: message });

      const orgContext = await this.getOrganizationalContext(req.user.organizationId, message);

      const systemPrompt = {
        role: 'system',
        content: `You are an AI assistant for ${req.user.organization.name}.\n` +
          `Answer questions based ONLY on the following organizational data and domain knowledge:\n${orgContext}\n` +
          `Respond in ${language}.`
      };

      const messages = [systemPrompt, ...conversation];

      const aiResponse = await ollamaService.chat(messages, model);

      await ChatMessage.create({
        sessionId,
        role: 'user',
        content: message,
        metadata: { language, model }
      });

      const assistantMessage = await ChatMessage.create({
        sessionId,
        role: 'assistant',
        content: aiResponse.message.content,
        metadata: { language, model }
      });

      await session.update({ updatedAt: new Date() });

      logger.info(`AI convo done for user: ${req.user.email}`);

      res.json({
        message: assistantMessage,
        usage: { tokens: aiResponse.eval_count || 0, model }
      });
    } catch (error) {
      logger.error('AI chat error:', error);
      next(error);
    }
  }

  async processDocument(req, res, next) {
    try {
      const { documentId } = req.body;

      const document = await Document.findOne({
        where: { id: documentId, organizationId: req.user.organizationId }
      });

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      if (document.processedStatus === 'completed') {
        return res.json({ message: 'Document already processed', document });
      }

      await document.update({ processedStatus: 'processing' });

      try {
        // OCR text extraction using vision-language model
        const result = await ollamaService.processDocument(document.filePath, "qwen2.5vl:3b");

        if (!result.response || !result.response.trim()) {
          await document.update({ processedStatus: 'failed' });
          return res.status(500).json({ error: 'Empty OCR response from AI' });
        }

        // Generate embeddings for doc text
        const embeddings = await ollamaService.generateEmbeddings(result.response);

        await document.update({
          processedStatus: 'completed',
          processedContent: result.response,
          extractedData: {
            processing_result: result,
            processed_at: new Date()
          },
          embeddings
        });

        logger.info(`Document OCR processed: ${document.filename}`);

        res.json({ message: 'Document processed successfully', document, extractedData: result });
      } catch (processingError) {
        await document.update({ processedStatus: 'failed', extractedData: { error: processingError.message } });
        throw processingError;
      }
    } catch (error) {
      logger.error('Process document error:', error);
      next(error);
    }
  }

  // Upload document
  async uploadDocument(req, res, next) {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const document = await Document.create({
        organizationId: req.user.organizationId,
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        uploadedBy: req.user.id,
        language: req.body.language || 'en',
        processedStatus: 'pending'
      });

      logger.info(`Document uploaded: ${document.originalName} by user: ${req.user.email}`);

      res.status(201).json({ message: 'Document uploaded successfully', document });
    } catch (error) {
      logger.error('Upload document error:', error);
      next(error);
    }
  }

  // List available AI models from Ollama
  async getModels(req, res, next) {
    try {
      const models = await ollamaService.getAvailableModels();
      res.json({
        models: models.map(m => ({ name: m.name, size: m.size, modified: m.modified_at }))
      });
    } catch (error) {
      logger.error('Get models error:', error);
      next(error);
    }
  }

  // Search documents by free text query (simple ILIKE search here; improve with vector search in production)
  async searchDocuments(req, res, next) {
    try {
      const { query, limit = 5 } = req.body;

      const documents = await Document.findAll({
        where: {
          organizationId: req.user.organizationId,
          processedStatus: 'completed',
          processedContent: { [Op.iLike]: `%${query}%` }
        },
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']]
      });

      res.json({ documents, query, count: documents.length });
    } catch (error) {
      logger.error('Search documents error:', error);
      next(error);
    }
  }

  // Helper: retrieve top organizational doc contents as context
  async getOrganizationalContext(organizationId, query) {
    try {
      const relevantDocuments = await Document.findAll({
        where: { organizationId, processedStatus: 'completed' },
        limit: 3,
        order: [['createdAt', 'DESC']]
      });

      return relevantDocuments
        .map(doc => `Document: ${doc.originalName}\nContent: ${doc.processedContent?.substring(0, 500)}...`)
        .join('\n\n');
    } catch (error) {
      logger.error('Error getting organizational context:', error);
      return '';
    }
  }
}


module.exports = new AIController();
