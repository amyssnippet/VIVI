const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateToken, organizationAccess } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { 
  userInviteValidator, 
  userRoleValidator 
} = require('../validators/authValidator');

const router = express.Router();

// All routes require admin access
router.use(authenticateToken('admin'));
router.use(organizationAccess);

router.get('/dashboard', adminController.getDashboard);
router.get('/organization', adminController.getOrganization);
router.put('/organization', adminController.updateOrganization);

// User management
router.get('/users', adminController.getUsers);
router.post('/users/invite', validate(userInviteValidator), adminController.inviteUser);
router.put('/users/:id/role', validate(userRoleValidator), adminController.updateUserRole);
router.delete('/users/:id', adminController.removeUser);

// Document management
router.get('/documents', adminController.getDocuments);
router.delete('/documents/:id', adminController.deleteDocument);

// Analytics
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
