const Joi = require('joi');
const AI_MODELS = require('../utils/constants')

const documentUploadValidator = Joi.object({
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .default('en')
    .messages({
      'string.length': 'Language code must be exactly 2 characters',
      'string.pattern.base': 'Language code must contain only lowercase letters'
    })
});

const documentProcessValidator = Joi.object({
  documentId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Document ID must be a number',
      'number.integer': 'Document ID must be an integer',
      'number.positive': 'Document ID must be positive',
      'any.required': 'Document ID is required'
    })
});

const documentSearchValidator = Joi.object({
  query: Joi.string()
    .min(1)
    .max(500)
    .required()
    .messages({
      'string.min': 'Search query must be at least 1 character long',
      'string.max': 'Search query must not exceed 500 characters',
      'any.required': 'Search query is required'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(10)
    .messages({
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit must not exceed 50'
    }),
  
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .optional()
    .messages({
      'string.length': 'Language code must be exactly 2 characters',
      'string.pattern.base': 'Language code must contain only lowercase letters'
    })
});

const chatValidator = Joi.object({
  sessionId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'Session ID must be a number',
      'number.integer': 'Session ID must be an integer',
      'number.positive': 'Session ID must be positive',
      'any.required': 'Session ID is required'
    }),
  
  message: Joi.string()
    .min(1)
    .max(4000)
    .required()
    .messages({
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must not exceed 4000 characters',
      'any.required': 'Message is required'
    }),
  
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .default('en')
    .messages({
      'string.length': 'Language code must be exactly 2 characters',
      'string.pattern.base': 'Language code must contain only lowercase letters'
    }),
  
  model: Joi.string()
    .valid(AI_MODELS.AI_MODELS.QWEN3_0_6B, AI_MODELS.AI_MODELS.QWEN3_8B, AI_MODELS.AI_MODELS.QWEN3_32B, AI_MODELS.AI_MODELS.QWEN2_5_VL_3B, AI_MODELS.AI_MODELS.QWEN2_5_VL_7B, AI_MODELS.AI_MODELS.QWEN2_5_VL_72B)
    .default(AI_MODELS.AI_MODELS.QWEN3_0_6B)
    .messages({
      'any.only': 'Model must be one of the supported AI models'
    })
});

const documentListValidator = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(10)
    .messages({
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit must not exceed 100'
    }),
  
  status: Joi.string()
    .valid('pending', 'processing', 'completed', 'failed')
    .optional()
    .messages({
      'any.only': 'Status must be one of: pending, processing, completed, failed'
    }),
  
  fileType: Joi.string()
    .valid('application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png')
    .optional(),
  
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .optional()
});

const documentUpdateValidator = Joi.object({
  filename: Joi.string()
    .min(1)
    .max(255)
    .optional(),
  
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .optional(),
  
  extractedData: Joi.object()
    .optional()
}).min(1);

module.exports = {
  documentUploadValidator,
  documentProcessValidator,
  documentSearchValidator,
  chatValidator,
  documentListValidator,
  documentUpdateValidator
};
