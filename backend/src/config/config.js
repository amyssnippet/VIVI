module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  uploadPath: './uploads',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  supportedLanguages: [
    'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh',
    'hi', 'ar', 'tr', 'nl', 'sv', 'no', 'da', 'fi', 'pl', 'cs'
  ],
  userRoles: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    USER: 'user'
  }
};
