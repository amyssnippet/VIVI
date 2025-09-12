const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { 
  registerValidator, 
  loginValidator, 
  refreshTokenValidator 
} = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validate(registerValidator), authController.register);
router.post('/login', validate(loginValidator), authController.login);
router.post('/refresh', validate(refreshTokenValidator), authController.refresh);
router.post('/logout', authenticateToken(), authController.logout);
router.get('/profile', authenticateToken(), authController.getProfile);

module.exports = router;
