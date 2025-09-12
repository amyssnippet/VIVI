const express = require('express');
const aiController = require('../controllers/aiController');
const { authenticateToken, organizationAccess } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { uploadMiddleware, upload } = require('../middleware/upload');
const { 
  chatValidator, 
  documentProcessValidator,
  documentSearchValidator 
} = require('../validators/documentValidator');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken());
router.use(organizationAccess);

// Chat endpoints
router.post('/chat', validate(chatValidator), aiController.chat);

// Document processing
router.post('/documents/upload', uploadMiddleware, aiController.uploadDocument);
router.post('/documents/process', validate(documentProcessValidator), aiController.processDocument);
router.post('/documents/search', validate(documentSearchValidator), aiController.searchDocuments);

// Model management
router.get('/models', aiController.getModels);

module.exports = router;
