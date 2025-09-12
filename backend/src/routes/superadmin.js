const express = require('express');
const superadminController = require('../controllers/superadminController');
const { authenticateToken } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { organizationValidator } = require('../validators/organizationValidator');

const router = express.Router();

// All routes require super admin access
router.use(authenticateToken('super_admin'));

router.get('/dashboard', superadminController.getDashboard);
router.get('/organizations', superadminController.getOrganizations);
router.post('/organizations', validate(organizationValidator), superadminController.createOrganization);
router.put('/organizations/:id', validate(organizationValidator), superadminController.updateOrganization);
router.delete('/organizations/:id', superadminController.deleteOrganization);
router.get('/users', superadminController.getAllUsers);

module.exports = router;
