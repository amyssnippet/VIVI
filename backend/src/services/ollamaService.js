const axios = require('axios');
const fs = require('fs');
const config = require('../config/config');
const logger = require('../utils/logger');
const AI_MODELS = require('../utils/constants');

class OllamaService {
  constructor() {
    this.baseURL = config.ollamaBaseUrl;
    this.timeout = 30000; // 30 seconds
  }

  async chat(messages, model = "qwen3:0.6b", stream = false) {
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

  async processDocument(filePath, model = "qwen2.5vl:3b") {
    try {
      // Read the file as base64 assuming it is an image or pdf
      const imageBase64 = fs.readFileSync(filePath, { encoding: 'base64' });

      const response = await axios.post(`${this.baseURL}/api/chat`, {
        model: model,
        messages: [
          {
            role: "user",
            content: `Please analyze this document. Extract key information in JSON:
          {
            "title": "",
            "summary": "",
            "key_points": [],
            "entities": [],
            "dates": [],
            "numbers": []
          }`,
            images: [imageBase64]
          }
        ],
        stream: false,
        options: {temperature:0.3}
      }, { timeout: 60000 });

      const content = response.data.message?.content?.trim() || "";

      return {
        response: content,
        raw: response.data
      };
      
    } catch (error) {
      logger.error('Ollama document processing error:', error.message);
      throw new Error('Document processing failed');
    }
  }

  async generateEmbeddings(text, model = "nomic-embed-text") {
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
