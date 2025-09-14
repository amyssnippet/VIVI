// User Roles
const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  USER: 'user'
};

// Document Processing Status
const DOCUMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

// Supported File Types
const SUPPORTED_FILE_TYPES = {
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  TXT: 'text/plain',
  JPEG: 'image/jpeg',
  JPG: 'image/jpg',
  PNG: 'image/png'
};

// Chat Message Roles
const CHAT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};

// Supported Languages
const SUPPORTED_LANGUAGES = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh',
  'hi', 'ar', 'tr', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs',
  'sk', 'hu', 'el', 'bg', 'ro', 'hr', 'sr', 'sl', 'et', 'lv',
  'lt', 'mt', 'ga', 'cy', 'eu', 'ca', 'gl', 'be', 'uk', 'mk',
  'sq', 'bs', 'is', 'fo', 'kl', 'sa', 'bn', 'gu', 'ta', 'te',
  'kn', 'ml', 'or', 'pa', 'as', 'ne', 'si', 'my', 'km', 'lo',
  'ka', 'am', 'ti', 'om', 'so', 'sw', 'zu', 'af', 'xh', 'st',
  'tn', 'ts', 've', 'nr', 'ss', 'nso', 'ha', 'yo', 'ig', 'ff',
  'wo', 'bm', 'dyu', 'ee', 'tw', 'ak', 'lg', 'ln', 'rw', 'rn',
  'ny', 'sn', 'mg', 'ms', 'tl', 'ceb', 'hil', 'war', 'bcl', 'pag',
  'vi', 'th', 'id', 'jv', 'su', 'mad', 'min', 'bug', 'mak', 'ban'
];

// AI Model Types
const AI_MODELS = {
  QWEN3_0_6B: 'qwen3:0.6b', // this is used everywhere
  QWEN3_8B: 'qwen3:8b',
  QWEN3_32B: 'qwen3:32b',
  QWEN2_5_VL_3B: 'qwen2.5-vl:3b', //this is used everywhere
  QWEN2_5_VL_7B: 'qwen2.5-vl:7b',
  QWEN2_5_VL_72B: 'qwen2.5-vl:72b',
  NOMIC_EMBED: 'nomic-embed-text'
};

// API Rate Limits
const RATE_LIMITS = {
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 attempts per window
  },
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requests per window
  },
  AI_CHAT: {
    windowMs: 60 * 1000, // 1 minute
    max: 10 // 10 chat requests per minute
  },
  FILE_UPLOAD: {
    windowMs: 60 * 1000, // 1 minute
    max: 5 // 5 uploads per minute
  }
};

// File Size Limits
const FILE_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_UPLOAD: 1,
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png']
};

// Error Codes
const ERROR_CODES = {
  // Authentication Errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_INACTIVE: 'USER_INACTIVE',

  // Organization Errors
  ORGANIZATION_NOT_FOUND: 'ORGANIZATION_NOT_FOUND',
  ORGANIZATION_INACTIVE: 'ORGANIZATION_INACTIVE',
  SLUG_ALREADY_EXISTS: 'SLUG_ALREADY_EXISTS',

  // Document Errors
  DOCUMENT_NOT_FOUND: 'DOCUMENT_NOT_FOUND',
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  PROCESSING_FAILED: 'PROCESSING_FAILED',

  // AI Service Errors
  AI_SERVICE_UNAVAILABLE: 'AI_SERVICE_UNAVAILABLE',
  MODEL_NOT_FOUND: 'MODEL_NOT_FOUND',
  CONTEXT_TOO_LONG: 'CONTEXT_TOO_LONG',

  // General Errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED'
};

// Log Levels
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly'
};

// Database Config
const DB_CONFIG = {
  POOL: {
    MAX: 20,
    MIN: 0,
    ACQUIRE: 30000,
    IDLE: 10000
  },
  RETRY: {
    MAX: 3
  }
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = {
  USER_SESSION: 7 * 24 * 60 * 60, // 7 days
  DOCUMENT_METADATA: 60 * 60, // 1 hour
  ORGANIZATION_DATA: 30 * 60, // 30 minutes
  AI_MODELS: 24 * 60 * 60 // 24 hours
};

// Email Templates
const EMAIL_TEMPLATES = {
  USER_INVITATION: 'user_invitation',
  PASSWORD_RESET: 'password_reset',
  ACCOUNT_ACTIVATION: 'account_activation',
  WELCOME: 'welcome'
};

// Webhook Events
const WEBHOOK_EVENTS = {
  USER_CREATED: 'user.created',
  USER_DELETED: 'user.deleted',
  DOCUMENT_PROCESSED: 'document.processed',
  DOCUMENT_FAILED: 'document.failed',
  ORGANIZATION_CREATED: 'organization.created'
};

module.exports = {
  USER_ROLES,
  DOCUMENT_STATUS,
  SUPPORTED_FILE_TYPES,
  CHAT_ROLES,
  SUPPORTED_LANGUAGES,
  AI_MODELS,
  RATE_LIMITS,
  FILE_LIMITS,
  ERROR_CODES,
  LOG_LEVELS,
  DB_CONFIG,
  CACHE_TTL,
  EMAIL_TEMPLATES,
  WEBHOOK_EVENTS
};
