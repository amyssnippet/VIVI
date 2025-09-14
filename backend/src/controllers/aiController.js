const { ChatSession, ChatMessage, Document } = require('../models');
const ollamaService = require('../services/ollamaService');
const documentService = require('../services/documentService');
const logger = require('../utils/logger');

class AIController {
  async chat(req, res, next) {
    try {
      const { sessionId, message, language = 'en', model = "qwen3:0.6b" } = req.body;

      // Validate session ownership
      const session = await ChatSession.findOne({
        where: { 
          id: sessionId, 
          userId: req.user.id,
          organizationId: req.user.organizationId
        }
      });

      if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
      }

      // Get recent conversation history
      const recentMessages = await ChatMessage.findAll({
        where: { sessionId },
        order: [['createdAt', 'DESC']],
        limit: 10
      });

      // Build conversation context
      const conversationHistory = recentMessages
        .reverse()
        .map(msg => ({ role: msg.role, content: msg.content }));

      // Add current user message
      const userMessage = { role: 'user', content: message };
      conversationHistory.push(userMessage);

      // Get organizational context (documents)
      const organizationalContext = await this.getOrganizationalContext(req.user.organizationId, message);

      // Build enhanced prompt with context
      const systemPrompt = {
        role: 'system',
        content: `You are a helpful AI assistant for ${req.user.organization.name}. 
        Answer questions based on the organizational information provided and general knowledge.
        Always be helpful, accurate, and professional.
        
        Organizational Context:
        ${organizationalContext}
        
        Respond in ${language} language.`
      };

      const messages = [systemPrompt, ...conversationHistory];

      // Get AI response
      const aiResponse = await ollamaService.chat(messages, model);

      // Save messages to database
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
        metadata: { 
          language, 
          model,
          tokens: aiResponse.eval_count || 0
        }
      });

      // Update session timestamp
      await session.update({ updatedAt: new Date() });

      logger.info(`AI chat completed for user: ${req.user.email}`);

      res.json({
        message: assistantMessage,
        usage: {
          tokens: aiResponse.eval_count || 0,
          model: model
        }
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
        where: { 
          id: documentId,
          organizationId: req.user.organizationId
        }
      });

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      if (document.processedStatus === 'completed') {
        return res.json({
          message: 'Document already processed',
          document
        });
      }

      // Update status to processing
      await document.update({ processedStatus: 'processing' });

      try {
        // Process document with Qwen2.5-VL
        const result = await ollamaService.processDocument(
          document.filePath, 
          "qwen2.5vl:3b"
        );

        // Generate embeddings for the processed content
        const embeddings = await ollamaService.generateEmbeddings(
          result.response
        );

        // Update document with processed data
        await document.update({
          processedStatus: 'completed',
          processedContent: result.response || result.raw.message?.content || null,
          extractedData: { 
            processing_result: result.raw,
            processed_at: new Date()
          },
          embeddings: embeddings
        });

        logger.info(`Document processed successfully: ${document.filename}`);

        res.json({
          message: 'Document processed successfully',
          document,
          extractedData: result
        });

      } catch (processingError) {
        await document.update({ 
          processedStatus: 'failed',
          extractedData: { error: processingError.message }
        });
        throw processingError;
      }

    } catch (error) {
      logger.error('Process document error:', error);
      next(error);
    }
  }

  async uploadDocument(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const document = await Document.create({
        organizationId: req.user.organizationId,
        filename: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        uploadedBy: req.user.id,
        language: req.body.language || 'en'
      });

      logger.info(`Document uploaded: ${req.file.originalname} by ${req.user.email}`);

      res.status(201).json({
        message: 'Document uploaded successfully',
        document
      });
    } catch (error) {
      logger.error('Upload document error:', error);
      next(error);
    }
  }

  async getModels(req, res, next) {
    try {
      const models = await ollamaService.getAvailableModels();
      
      res.json({
        models: models.map(model => ({
          name: model.name,
          size: model.size,
          modified: model.modified_at
        }))
      });
    } catch (error) {
      logger.error('Get models error:', error);
      next(error);
    }
  }

  async searchDocuments(req, res, next) {
    try {
      const { query, limit = 5 } = req.body;

      // Generate query embeddings
      const queryEmbeddings = await ollamaService.generateEmbeddings(query);

      // Search similar documents (simplified version - in production use proper vector similarity)
      const documents = await Document.findAll({
        where: {
          organizationId: req.user.organizationId,
          processedStatus: 'completed',
          processedContent: { [Op.iLike]: `%${query}%` }
        },
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        documents,
        query,
        count: documents.length
      });
    } catch (error) {
      logger.error('Search documents error:', error);
      next(error);
    }
  }

  // Helper method to get organizational context
  async getOrganizationalContext(organizationId, query) {
    try {
      const relevantDocuments = await Document.findAll({
        where: {
          organizationId,
          processedStatus: 'completed'
        },
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
