const jwt = require('jsonwebtoken');
const { User, Organization } = require('../models');
const config = require('../config/config');

const authenticateToken = (requiredRole = null) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[21];

      if (!token) {
        return res.status(401).json({ error: 'Access token required' });
      }

      const decoded = jwt.verify(token, config.jwtSecret);
      
      const user = await User.findByPk(decoded.userId, {
        include: [{
          model: Organization,
          as: 'organization'
        }]
      });

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid token or inactive user' });
      }

      req.user = user;

      // Role-based access control
      if (requiredRole) {
        if (Array.isArray(requiredRole)) {
          if (!requiredRole.includes(user.role) && user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Insufficient permissions' });
          }
        } else {
          if (user.role !== requiredRole && user.role !== 'super_admin') {
            return res.status(403).json({ error: 'Insufficient permissions' });
          }
        }
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};

const organizationAccess = async (req, res, next) => {
  try {
    if (req.user.role === 'super_admin') {
      return next();
    }

    const organizationId = req.params.organizationId || req.body.organizationId || req.user.organizationId;
    
    if (!organizationId || req.user.organizationId !== parseInt(organizationId)) {
      return res.status(403).json({ error: 'Access denied to this organization' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Organization access check failed' });
  }
};

module.exports = { authenticateToken, organizationAccess };
