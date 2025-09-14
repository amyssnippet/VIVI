const { Organization, User, Document, ChatSession, ChatMessage } = require('../models');
const logger = require('../utils/logger');
const { Op } = require('sequelize');
const emailService = require('../services/emailService');

class AdminController {
  async getDashboard(req, res, next) {
    try {
      const organizationId = req.user.organizationId;

      const stats = await Promise.all([
        User.count({ where: { organizationId } }),
        Document.count({ where: { organizationId } }),
        ChatSession.count({ where: { organizationId } }),
        ChatMessage.count({
          include: [{
            model: ChatSession,
            as: 'session',
            where: { organizationId }
          }]
        })
      ]);

      const recentUsers = await User.findAll({
        where: { organizationId },
        limit: 5,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['passwordHash'] }
      });

      const recentDocuments = await Document.findAll({
        where: { organizationId },
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          as: 'uploader',
          attributes: ['firstName', 'lastName', 'email']
        }]
      });

      res.json({
        stats: {
          users: stats[0],
          documents: stats[1],
          chatSessions: stats[2],
          totalMessages: stats[3]
        },
        recentUsers,
        recentDocuments
      });
    } catch (error) {
      logger.error('Admin dashboard error:', error);
      next(error);
    }
  }

  async getOrganization(req, res, next) {
    try {
      const organization = await Organization.findByPk(req.user.organizationId);
      res.json({ organization });
    } catch (error) {
      logger.error('Get organization error:', error);
      next(error);
    }
  }

  async updateOrganization(req, res, next) {
    try {
      const updateData = req.body;
      delete updateData.id; // Prevent ID modification

      const organization = await Organization.findByPk(req.user.organizationId);
      await organization.update(updateData);

      logger.info(`Organization updated by admin: ${req.user.email}`);
      
      res.json({
        message: 'Organization updated successfully',
        organization
      });
    } catch (error) {
      logger.error('Update organization error:', error);
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { page = 1, limit = 10, role } = req.query;
      const offset = (page - 1) * limit;
      
      const whereClause = { organizationId: req.user.organizationId };
      if (role) whereClause.role = role;

      const users = await User.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['passwordHash'] }
      });

      res.json({
        users: users.rows,
        pagination: {
          total: users.count,
          pages: Math.ceil(users.count / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      logger.error('Get users error:', error);
      next(error);
    }
  }

  async inviteUser(req, res, next) {
    try {
      const { email, role = 'user', firstName, lastName } = req.body;
      const organizationId = req.user.organizationId;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-8);

      const user = await User.create({
        email,
        passwordHash: tempPassword,
        firstName,
        lastName,
        role,
        organizationId,
        isActive: true // User must activate account
      });

      // Send invitation email
      await emailService.sendInvitationEmail({
        email,
        firstName,
        tempPassword,
        organizationName: req.user.organization.name,
        invitedBy: `${req.user.firstName} ${req.user.lastName}`
      });

      logger.info(`User invited: ${email} by ${req.user.email}`);
      
      res.status(201).json({
        message: 'User invitation sent successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      logger.error('Invite user error:', error);
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findOne({
        where: { 
          id, 
          organizationId: req.user.organizationId 
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({ role });

      logger.info(`User role updated: ${user.email} to ${role} by ${req.user.email}`);
      
      res.json({
        message: 'User role updated successfully',
        user
      });
    } catch (error) {
      logger.error('Update user role error:', error);
      next(error);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { 
          id, 
          organizationId: req.user.organizationId 
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.role === 'admin') {
        const adminCount = await User.count({
          where: { 
            organizationId: req.user.organizationId,
            role: 'admin'
          }
        });

        if (adminCount <= 1) {
          return res.status(400).json({ 
            error: 'Cannot remove the last admin from organization' 
          });
        }
      }

      await user.destroy();

      logger.info(`User removed: ${user.email} by ${req.user.email}`);
      
      res.json({ message: 'User removed successfully' });
    } catch (error) {
      logger.error('Remove user error:', error);
      next(error);
    }
  }

  async getDocuments(req, res, next) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const offset = (page - 1) * limit;
      
      const whereClause = { organizationId: req.user.organizationId };
      if (status) whereClause.processedStatus = status;

      const documents = await Document.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          as: 'uploader',
          attributes: ['firstName', 'lastName', 'email']
        }]
      });

      res.json({
        documents: documents.rows,
        pagination: {
          total: documents.count,
          pages: Math.ceil(documents.count / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      logger.error('Get documents error:', error);
      next(error);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      const { id } = req.params;

      const document = await Document.findOne({
        where: { 
          id, 
          organizationId: req.user.organizationId 
        }
      });

      if (!document) {
        return res.status(404).json({ error: 'Document not found' });
      }

      // Delete file from filesystem
      const fs = require('fs');
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      await document.destroy();

      logger.info(`Document deleted: ${document.filename} by ${req.user.email}`);
      
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      logger.error('Delete document error:', error);
      next(error);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      const organizationId = req.user.organizationId;
      const { period = '30' } = req.query; // days
      
      const since = new Date();
      since.setDate(since.getDate() - parseInt(period));

      const analytics = await Promise.all([
        // Message count by day
        ChatMessage.findAll({
          attributes: [
            [ChatMessage.sequelize.fn('DATE', ChatMessage.sequelize.col('created_at')), 'date'],
            [ChatMessage.sequelize.fn('COUNT', '*'), 'count']
          ],
          include: [{
            model: ChatSession,
            as: 'session',
            where: { organizationId },
            attributes: []
          }],
          where: {
            createdAt: { [Op.gte]: since }
          },
          group: [ChatMessage.sequelize.fn('DATE', ChatMessage.sequelize.col('created_at'))],
          order: [[ChatMessage.sequelize.fn('DATE', ChatMessage.sequelize.col('created_at')), 'ASC']]
        }),

        // Most active users
        User.findAll({
          where: { organizationId },
          include: [{
            model: ChatSession,
            as: 'chatSessions',
            where: {
              createdAt: { [Op.gte]: since }
            },
            required: true
          }],
          attributes: [
            'id', 'firstName', 'lastName', 'email',
            [User.sequelize.fn('COUNT', User.sequelize.col('chatSessions.id')), 'sessionCount']
          ],
          group: ['User.id'],
          order: [[User.sequelize.fn('COUNT', User.sequelize.col('chatSessions.id')), 'DESC']],
          limit: 10
        }),

        // Document processing status
        Document.findAll({
          where: { organizationId },
          attributes: [
            'processedStatus',
            [Document.sequelize.fn('COUNT', '*'), 'count']
          ],
          group: ['processedStatus']
        })
      ]);

      res.json({
        messagesByDay: analytics[0],
        topUsers: analytics[1],
        documentStatus: analytics[2]
      });
    } catch (error) {
      logger.error('Get analytics error:', error);
      next(error);
    }
  }
}

module.exports = new AdminController();
