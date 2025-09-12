const jwt = require('jsonwebtoken');
const { User, Organization } = require('../models');
const config = require('../config/config');
const logger = require('../utils/logger');
const { generateToken, hashPassword } = require('../utils/helpers');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, organizationId, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Verify organization exists if provided
      if (organizationId) {
        const organization = await Organization.findByPk(organizationId);
        if (!organization) {
          return res.status(400).json({ error: 'Organization not found' });
        }
      }

      // Create user
      const user = await User.create({
        email,
        passwordHash: password, // Will be hashed by model hook
        firstName,
        lastName,
        organizationId,
        role: role || 'user'
      });

      const token = generateToken(user.id);
      
      logger.info(`User registered: ${email}`);
      
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organizationId: user.organizationId
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Find user with organization
      const user = await User.findOne({
        where: { email },
        include: [{
          model: Organization,
          as: 'organization'
        }]
      });

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Validate password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      await user.update({ lastLoginAt: new Date() });

      const token = generateToken(user.id);
      
      logger.info(`User logged in: ${email}`);

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organizationId: user.organizationId,
          organization: user.organization
        }
      });
    } catch (error) {
      logger.error('Login error:', error);
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token required' });
      }

      const decoded = jwt.verify(refreshToken, config.jwtSecret);
      const user = await User.findByPk(decoded.userId);

      if (!user || !user.isActive) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      const newToken = generateToken(user.id);
      
      res.json({
        token: newToken,
        message: 'Token refreshed successfully'
      });
    } catch (error) {
      logger.error('Token refresh error:', error);
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  }

  async logout(req, res) {
    // In a more complex implementation, you might maintain a blacklist of tokens
    logger.info(`User logged out: ${req.user.email}`);
    res.json({ message: 'Logout successful' });
  }

  async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Organization,
          as: 'organization'
        }],
        attributes: { exclude: ['passwordHash'] }
      });

      res.json({ user });
    } catch (error) {
      logger.error('Get profile error:', error);
      next(error);
    }
  }
}

module.exports = new AuthController();
