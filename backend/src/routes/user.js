const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, organizationAccess } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { 
  profileUpdateValidator, 
  passwordChangeValidator,
  chatSessionValidator 
} = require('../validators/authValidator');

const router = express.Router();

// All routes require user authentication
router.use(authenticateToken());
router.use(organizationAccess);

// Profile management
router.get('/profile', userController.getProfile);
router.put('/profile', validate(profileUpdateValidator), userController.updateProfile);
router.put('/password', validate(passwordChangeValidator), userController.changePassword);

// Organization info
router.get('/organization', userController.getOrganization);

// Chat management
router.get('/chat/history', userController.getChatHistory);
router.get('/chat/sessions/:id', userController.getChatSession);
router.post('/chat/sessions', validate(chatSessionValidator), userController.createChatSession);
router.put('/chat/sessions/:id', validate(chatSessionValidator), userController.updateChatSession);
router.delete('/chat/sessions/:id', userController.deleteChatSession);

module.exports = router;
