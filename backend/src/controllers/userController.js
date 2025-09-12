const { User, Organization, ChatSession, ChatMessage, Document } = require('../models');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name', 'slug', 'languageSettings']
        }],
        attributes: { exclude: ['passwordHash'] }
      });

      res.json({ user });
    } catch (error) {
      logger.error('Get user profile error:', error);
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const { firstName, lastName, preferences } = req.body;
      const updateData = {};
      
      if (firstName !== undefined) updateData.firstName = firstName;
      if (lastName !== undefined) updateData.lastName = lastName;
      if (preferences !== undefined) updateData.preferences = preferences;

      await req.user.update(updateData);

      logger.info(`Profile updated: ${req.user.email}`);
      
      res.json({
        message: 'Profile updated successfully',
        user: await User.findByPk(req.user.id, {
          attributes: { exclude: ['passwordHash'] }
        })
      });
    } catch (error) {
      logger.error('Update user profile error:', error);
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Validate current password
      const isValidPassword = await req.user.validatePassword(currentPassword);
      if (!isValidPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      await req.user.update({ passwordHash: newPassword });

      logger.info(`Password changed: ${req.user.email}`);
      
      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      logger.error('Change password error:', error);
      next(error);
    }
  }

  async getOrganization(req, res, next) {
    try {
      const organization = await Organization.findByPk(req.user.organizationId, {
        attributes: { exclude: ['settings'] }
      });

      res.json({ organization });
    } catch (error) {
      logger.error('Get organization error:', error);
      next(error);
    }
  }

  async getChatHistory(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const sessions = await ChatSession.findAndCountAll({
        where: { userId: req.user.id },
        limit: parseInt(limit),
        offset,
        order: [['updatedAt', 'DESC']],
        include: [{
          model: ChatMessage,
          as: 'messages',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }]
      });

      res.json({
        sessions: sessions.rows,
        pagination: {
          total: sessions.count,
          pages: Math.ceil(sessions.count / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      logger.error('Get chat history error:', error);
      next(error);
    }
  }

  async getChatSession(req, res, next) {
    try {
      const { id } = req.params;

      const session = await ChatSession.findOne({
        where: { 
          id, 
          userId: req.user.id 
        },
        include: [{
          model: ChatMessage,
          as: 'messages',
          order: [['createdAt', 'ASC']]
        }]
      });

      if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
      }

      res.json({ session });
    } catch (error) {
      logger.error('Get chat session error:', error);
      next(error);
    }
  }

  async createChatSession(req, res, next) {
    try {
      const { sessionName, language = 'en' } = req.body;

      const session = await ChatSession.create({
        userId: req.user.id,
        organizationId: req.user.organizationId,
        sessionName: sessionName || 'New Chat',
        language
      });

      logger.info(`Chat session created: ${session.id} by ${req.user.email}`);
      
      res.status(201).json({
        message: 'Chat session created successfully',
        session
      });
    } catch (error) {
      logger.error('Create chat session error:', error);
      next(error);
    }
  }

  async updateChatSession(req, res, next) {
    try {
      const { id } = req.params;
      const { sessionName } = req.body;

      const session = await ChatSession.findOne({
        where: { 
          id, 
          userId: req.user.id 
        }
      });

      if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
      }

      await session.update({ sessionName });

      res.json({
        message: 'Chat session updated successfully',
        session
      });
    } catch (error) {
      logger.error('Update chat session error:', error);
      next(error);
    }
  }

  async deleteChatSession(req, res, next) {
    try {
      const { id } = req.params;

      const session = await ChatSession.findOne({
        where: { 
          id, 
          userId: req.user.id 
        }
      });

      if (!session) {
        return res.status(404).json({ error: 'Chat session not found' });
      }

      await session.destroy();

      logger.info(`Chat session deleted: ${id} by ${req.user.email}`);
      
      res.json({ message: 'Chat session deleted successfully' });
    } catch (error) {
      logger.error('Delete chat session error:', error);
      next(error);
    }
  }
}

module.exports = new UserController();
