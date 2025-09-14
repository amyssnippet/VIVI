const fs = require('fs').promises;
const path = require('path');
const { Document } = require('../models');
const ollamaService = require('./ollamaService');
const logger = require('../utils/logger');
const AI_MODELS = require('../utils/constants')

class DocumentService {
  constructor() {
    this.supportedFormats = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'];
  }

  async processDocument(documentId) {
    try {
      const document = await Document.findByPk(documentId);
      
      if (!document) {
        throw new Error('Document not found');
      }

      // Update status to processing
      await document.update({ processedStatus: 'processing' });

      // Check if file exists
      const fileExists = await this.fileExists(document.filePath);
      if (!fileExists) {
        throw new Error('Document file not found on disk');
      }

      // Process based on file type
      let processedContent = '';
      const fileExt = path.extname(document.filename).toLowerCase();

      if (['.jpg', '.jpeg', '.png', '.pdf'].includes(fileExt)) {
        // Use Qwen2.5-VL for vision processing
        const result = await ollamaService.processDocument(document.filePath);
        processedContent = result.response;
      } else if (['.txt'].includes(fileExt)) {
        // Read text files directly
        processedContent = await fs.readFile(document.filePath, 'utf8');
      } else {
        // For other formats, attempt vision processing
        const result = await ollamaService.processDocument(document.filePath);
        processedContent = result.response;
      }

      // Generate embeddings
      const embeddings = await ollamaService.generateEmbeddings(processedContent);

      // Extract structured data
      const structuredData = await this.extractStructuredData(processedContent);

      // Update document with results
      await document.update({
        processedStatus: 'completed',
        processedContent,
        extractedData: {
          structuredData,
          processedAt: new Date(),
          processingMethod: fileExt.includes('image') || fileExt === '.pdf' ? 'vision' : 'text'
        },
        embeddings
      });

      logger.info(`Document processed successfully: ${document.id}`);
      return document;

    } catch (error) {
      logger.error(`Document processing failed: ${error.message}`);
      
      // Update document status to failed
      if (documentId) {
        await Document.update(
          { 
            processedStatus: 'failed',
            extractedData: { error: error.message, failedAt: new Date() }
          },
          { where: { id: documentId } }
        );
      }
      
      throw error;
    }
  }

  async extractStructuredData(content) {
    try {
      // Use AI to extract structured information
      const prompt = `
        Analyze the following document content and extract structured information in JSON format.
        Include: title, summary, key_points, entities (people, organizations, dates), topics, and any important numbers or statistics.
        
        Content: ${content.substring(0, 2000)}...
        
        Return only valid JSON:
      `;

      const result = await ollamaService.chat([
        { role: 'user', content: prompt }
      ], AI_MODELS.AI_MODELS.QWEN3_0_6B);

      try {
        return JSON.parse(result.message.content);
      } catch (parseError) {
        // If JSON parsing fails, return raw response
        return { raw_analysis: result.message.content };
      }
    } catch (error) {
      logger.error('Failed to extract structured data:', error);
      return { error: 'Failed to extract structured data' };
    }
  }

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      logger.info(`File deleted: ${filePath}`);
    } catch (error) {
      logger.error(`Failed to delete file ${filePath}:`, error);
    }
  }

  async getDocumentsByOrganization(organizationId, filters = {}) {
    const where = { organizationId };
    
    if (filters.status) {
      where.processedStatus = filters.status;
    }
    
    if (filters.language) {
      where.language = filters.language;
    }
    
    if (filters.fileType) {
      where.fileType = filters.fileType;
    }

    return Document.findAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: filters.limit || 50,
      offset: filters.offset || 0
    });
  }

  async searchDocuments(organizationId, query, limit = 10) {
    try {
      // Generate embeddings for search query
      const queryEmbeddings = await ollamaService.generateEmbeddings(query);
      
      // For now, use text search (in production, use vector similarity)
      const { Op } = require('sequelize');
      
      const documents = await Document.findAll({
        where: {
          organizationId,
          processedStatus: 'completed',
          [Op.or]: [
            { processedContent: { [Op.iLike]: `%${query}%` } },
            { originalName: { [Op.iLike]: `%${query}%` } }
          ]
        },
        limit,
        order: [['createdAt', 'DESC']]
      });

      return documents.map(doc => ({
        id: doc.id,
        filename: doc.originalName,
        relevance: this.calculateRelevance(doc.processedContent, query),
        excerpt: this.getExcerpt(doc.processedContent, query),
        createdAt: doc.createdAt
      }));
    } catch (error) {
      logger.error('Document search failed:', error);
      throw error;
    }
  }

  calculateRelevance(content, query) {
    if (!content) return 0;
    
    const queryTerms = query.toLowerCase().split(' ');
    const contentLower = content.toLowerCase();
    
    let matches = 0;
    queryTerms.forEach(term => {
      const termMatches = (contentLower.match(new RegExp(term, 'g')) || []).length;
      matches += termMatches;
    });
    
    return Math.min(matches / queryTerms.length, 1);
  }

  getExcerpt(content, query, excerptLength = 200) {
    if (!content) return '';
    
    const queryTerms = query.toLowerCase().split(' ');
    const contentLower = content.toLowerCase();
    
    // Find first occurrence of any query term
    let firstIndex = content.length;
    queryTerms.forEach(term => {
      const index = contentLower.indexOf(term);
      if (index !== -1 && index < firstIndex) {
        firstIndex = index;
      }
    });
    
    if (firstIndex === content.length) {
      return content.substring(0, excerptLength) + '...';
    }
    
    const start = Math.max(0, firstIndex - 50);
    const end = Math.min(content.length, start + excerptLength);
    
    return '...' + content.substring(start, end) + '...';
  }
}

module.exports = new DocumentService();
