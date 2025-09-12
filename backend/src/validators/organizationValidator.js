const Joi = require('joi');

const organizationValidator = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .required()
    .messages({
      'string.min': 'Organization name must be at least 2 characters long',
      'string.max': 'Organization name must not exceed 255 characters',
      'any.required': 'Organization name is required'
    }),
  
  slug: Joi.string()
    .min(2)
    .max(100)
    .pattern(/^[a-z0-9-]+$/)
    .required()
    .messages({
      'string.min': 'Organization slug must be at least 2 characters long',
      'string.max': 'Organization slug must not exceed 100 characters',
      'string.pattern.base': 'Organization slug must contain only lowercase letters, numbers, and hyphens',
      'any.required': 'Organization slug is required'
    }),
  
  description: Joi.string()
    .max(1000)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description must not exceed 1000 characters'
    }),
  
  settings: Joi.object()
    .optional()
    .default({}),
  
  languageSettings: Joi.object({
    default: Joi.string()
      .length(2)
      .pattern(/^[a-z]{2}$/)
      .default('en')
      .messages({
        'string.length': 'Default language code must be exactly 2 characters',
        'string.pattern.base': 'Default language code must contain only lowercase letters'
      }),
    
    supported: Joi.array()
      .items(
        Joi.string()
          .length(2)
          .pattern(/^[a-z]{2}$/)
      )
      .min(1)
      .default(['en'])
      .messages({
        'array.min': 'At least one supported language is required',
        'string.length': 'Language codes must be exactly 2 characters',
        'string.pattern.base': 'Language codes must contain only lowercase letters'
      })
  })
    .optional()
    .default({ default: 'en', supported: ['en'] }),
  
  isActive: Joi.boolean()
    .optional()
    .default(true)
});

const organizationUpdateValidator = Joi.object({
  name: Joi.string()
    .min(2)
    .max(255)
    .optional(),
  
  description: Joi.string()
    .max(1000)
    .optional()
    .allow(''),
  
  settings: Joi.object()
    .optional(),
  
  languageSettings: Joi.object({
    default: Joi.string()
      .length(2)
      .pattern(/^[a-z]{2}$/),
    
    supported: Joi.array()
      .items(
        Joi.string()
          .length(2)
          .pattern(/^[a-z]{2}$/)
      )
      .min(1)
  })
    .optional(),
  
  isActive: Joi.boolean()
    .optional()
}).min(1); // At least one field must be provided for update

module.exports = {
  organizationValidator,
  organizationUpdateValidator
};
