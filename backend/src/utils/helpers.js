const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const config = require('../config/config');

class Helpers {
  // JWT Token Generation
  generateToken(userId, expiresIn = config.jwtExpire) {
    return jwt.sign(
      { userId },
      config.jwtSecret,
      { expiresIn }
    );
  }

  // Generate Refresh Token
  generateRefreshToken(userId) {
    return jwt.sign(
      { userId, type: 'refresh' },
      config.jwtSecret,
      { expiresIn: '30d' }
    );
  }

  // Password Hashing
  async hashPassword(password) {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Password Validation
  async validatePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  // Generate Random String
  generateRandomString(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Generate Secure Random Password
  generateSecurePassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // Slug Generation
  generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Email Validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone Number Validation
  isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }

  // Sanitize HTML
  sanitizeHtml(html) {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
      .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  }

  // Format File Size
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Format Date
  formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  // Pagination Helper
  getPaginationData(page, limit, total) {
    const currentPage = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const totalItems = parseInt(total) || 0;
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset = (currentPage - 1) * pageSize;

    return {
      currentPage,
      pageSize,
      totalItems,
      totalPages,
      offset,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1
    };
  }

  // Deep Clone Object
  deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
      return obj.map(item => this.deepClone(item));
    }
    
    if (typeof obj === 'object') {
      const cloned = {};
      Object.keys(obj).forEach(key => {
        cloned[key] = this.deepClone(obj[key]);
      });
      return cloned;
    }
  }

  // Remove Sensitive Data from User Object
  sanitizeUser(user) {
    const sanitized = { ...user };
    delete sanitized.passwordHash;
    delete sanitized.password;
    return sanitized;
  }

  // Calculate Password Strength
  calculatePasswordStrength(password) {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[^A-Za-z0-9]/.test(password)
    };

    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][score] || 'Very Weak';
    
    return {
      score,
      strength,
      checks
    };
  }

  // Validate Language Code
  isValidLanguageCode(code) {
    const supportedLanguages = config.supportedLanguages;
    return supportedLanguages.includes(code);
  }

  // Generate API Key
  generateApiKey(prefix = 'ak') {
    const timestamp = Date.now().toString(36);
    const random = this.generateRandomString(16);
    return `${prefix}_${timestamp}_${random}`;
  }

  // Rate Limit Key Generator
  generateRateLimitKey(identifier, action = 'default') {
    return `ratelimit:${action}:${identifier}`;
  }

  // Error Response Helper
  createErrorResponse(message, code = 'GENERAL_ERROR', details = null) {
    return {
      error: {
        message,
        code,
        timestamp: new Date().toISOString(),
        ...(details && { details })
      }
    };
  }

  // Success Response Helper
  createSuccessResponse(data, message = null) {
    return {
      success: true,
      ...(message && { message }),
      data,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = new Helpers();