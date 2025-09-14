const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');
const AI_MODELS = require('../utils/constants')

class OllamaService {
  constructor() {
    this.baseURL = config.ollamaBaseUrl;
    this.timeout = 30000; // 30 seconds
  }

  async chat(messages, model = AI_MODELS.AI_MODELS.QWEN3_0_6B, stream = false) {
    try {
      const response = await axios.post(`${this.baseURL}/api/chat`, {
        model: model,
        messages: messages,
        stream: stream,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40
        }
      }, { timeout: this.timeout });

      return response.data;
    } catch (error) {
      logger.error('Ollama chat error:', error.message);
      throw new Error('AI service unavailable');
    }
  }

  async processDocument(filePath, model = AI_MODELS.AI_MODELS.QWEN2_5_VL_3B) {
    try {
      const fs = require('fs');
      const imageBase64 = fs.readFileSync(filePath, { encoding: 'base64' });

      const response = await axios.post(`${this.baseURL}/api/generate`, {
        model: model,
        prompt: `Analyze this document and extract all key information including:
        1. Document type and purpose
        2. Main topics and sections  
        3. Important facts, figures, and dates
        4. Key people, organizations, or entities mentioned
        5. Any questions that could be answered from this content
        
        Format the response as structured JSON with clear categories.`,
        images: [imageBase64],
        stream: false,
        options: {
          temperature: 0.3
        }
      }, { timeout: 60000 });

      return response.data;
    } catch (error) {
      logger.error('Ollama document processing error:', error.message);
      throw new Error('Document processing failed');
    }
  }

  async generateEmbeddings(text, model = 'nomic-embed-text') {
    try {
      const response = await axios.post(`${this.baseURL}/api/embeddings`, {
        model: model,
        prompt: text
      }, { timeout: this.timeout });

      return response.data.embedding;
    } catch (error) {
      logger.error('Ollama embedding error:', error.message);
      throw new Error('Embedding generation failed');
    }
  }

  async getAvailableModels() {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      return response.data.models || [];
    } catch (error) {
      logger.error('Failed to get available models:', error.message);
      return [];
    }
  }
}

module.exports = new OllamaService();
