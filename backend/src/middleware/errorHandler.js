const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details = null;

  // Log the error
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Handle different error types
  if (error.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    details = error.errors.map(err => ({
      field: err.path,
      message: err.message
    }));
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = 'Duplicate Entry';
    details = error.errors.map(err => ({
      field: err.path,
      message: `${err.path} must be unique`
    }));
  } else if (error.name === 'SequelizeForeignKeyConstraintError') {
    statusCode = 400;
    message = 'Invalid Reference';
    details = 'Referenced resource does not exist';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid Token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token Expired';
  } else if (error.message === 'AI service unavailable') {
    statusCode = 503;
    message = 'AI Service Unavailable';
    details = 'The AI service is temporarily unavailable. Please try again later.';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong';
    details = null;
  }

  res.status(statusCode).json({
    error: message,
    ...(details && { details }),
    ...(process.env.NODE_ENV === 'development' && statusCode === 500 && { 
      stack: error.stack 
    })
  });
};

module.exports = errorHandler;
