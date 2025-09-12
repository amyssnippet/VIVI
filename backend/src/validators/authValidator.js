const Joi = require('joi');

const registerValidator = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 128 characters',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required'
    }),
  
  firstName: Joi.string()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.min': 'First name must be at least 1 character long',
      'string.max': 'First name must not exceed 50 characters'
    }),
  
  lastName: Joi.string()
    .min(1)
    .max(50)
    .optional()
    .messages({
      'string.min': 'Last name must be at least 1 character long',
      'string.max': 'Last name must not exceed 50 characters'
    }),
  
  organizationId: Joi.number()
    .integer()
    .positive()
    .optional(),
  
  role: Joi.string()
    .valid('super_admin', 'admin', 'user')
    .default('user')
});

const loginValidator = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

const refreshTokenValidator = Joi.object({
  refreshToken: Joi.string()
    .required()
    .messages({
      'any.required': 'Refresh token is required'
    })
});

const profileUpdateValidator = Joi.object({
  firstName: Joi.string()
    .min(1)
    .max(50)
    .optional(),
  
  lastName: Joi.string()
    .min(1)
    .max(50)
    .optional(),
  
  preferences: Joi.object()
    .optional()
});

const passwordChangeValidator = Joi.object({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Current password is required'
    }),
  
  newPassword: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]'))
    .required()
    .messages({
      'string.min': 'New password must be at least 8 characters long',
      'string.max': 'New password must not exceed 128 characters',
      'string.pattern.base': 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'New password is required'
    })
});

const userInviteValidator = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  
  firstName: Joi.string()
    .min(1)
    .max(50)
    .optional(),
  
  lastName: Joi.string()
    .min(1)
    .max(50)
    .optional(),
  
  role: Joi.string()
    .valid('admin', 'user')
    .default('user')
});

const userRoleValidator = Joi.object({
  role: Joi.string()
    .valid('admin', 'user')
    .required()
    .messages({
      'any.required': 'Role is required',
      'any.only': 'Role must be either admin or user'
    })
});

const chatSessionValidator = Joi.object({
  sessionName: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Session name must be at least 1 character long',
      'string.max': 'Session name must not exceed 100 characters'
    }),
  
  language: Joi.string()
    .length(2)
    .pattern(/^[a-z]{2}$/)
    .default('en')
    .messages({
      'string.length': 'Language code must be exactly 2 characters',
      'string.pattern.base': 'Language code must contain only lowercase letters'
    })
});

module.exports = {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  profileUpdateValidator,
  passwordChangeValidator,
  userInviteValidator,
  userRoleValidator,
  chatSessionValidator
};
