const { Organization, User, Document, ChatSession } = require('../models');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

class SuperAdminController {
  async getDashboard(req, res, next) {
    try {
      const stats = await Promise.all([
        Organization.count(),
        User.count(),
        Document.count(),
        ChatSession.count()
      ]);

      const recentOrganizations = await Organization.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          as: 'users',
          attributes: ['id']
        }]
      });

      res.json({
        stats: {
          organizations: stats[0],
          users: stats[1],
          documents: stats[2],
          chatSessions: stats[3]
        },
        recentOrganizations
      });
    } catch (error) {
      logger.error('Super admin dashboard error:', error);
      next(error);
    }
  }

  async getOrganizations(req, res, next) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = search ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { slug: { [Op.iLike]: `%${search}%` } }
        ]
      } : {};

      const organizations = await Organization.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          model: User,
          as: 'users',
          attributes: ['id', 'role']
        }]
      });

      res.json({
        organizations: organizations.rows,
        pagination: {
          total: organizations.count,
          pages: Math.ceil(organizations.count / limit),
          currentPage: parseInt(page),
          limit: parseInt(limit)
        }
      });
    } catch (error) {
      logger.error('Get organizations error:', error);
      next(error);
    }
  }

  async createOrganization(req, res, next) {
    try {
      const { name, slug, description, languageSettings } = req.body;

      // Check if slug already exists
      const existingOrg = await Organization.findOne({ where: { slug } });
      if (existingOrg) {
        return res.status(400).json({ error: 'Organization slug already exists' });
      }

      const organization = await Organization.create({
        name,
        slug,
        description,
        languageSettings: languageSettings || { default: 'en', supported: ['en'] }
      });

      logger.info(`Organization created: ${name} by ${req.user.email}`);
      
      res.status(201).json({
        message: 'Organization created successfully',
        organization
      });
    } catch (error) {
      logger.error('Create organization error:', error);
      next(error);
    }
  }

  async updateOrganization(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const organization = await Organization.findByPk(id);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      await organization.update(updateData);
      
      logger.info(`Organization updated: ${organization.name} by ${req.user.email}`);
      
      res.json({
        message: 'Organization updated successfully',
        organization
      });
    } catch (error) {
      logger.error('Update organization error:', error);
      next(error);
    }
  }

  async deleteOrganization(req, res, next) {
    try {
      const { id } = req.params;

      const organization = await Organization.findByPk(id);
      if (!organization) {
        return res.status(404).json({ error: 'Organization not found' });
      }

      await organization.destroy();
      
      logger.info(`Organization deleted: ${organization.name} by ${req.user.email}`);
      
      res.json({ message: 'Organization deleted successfully' });
    } catch (error) {
      logger.error('Delete organization error:', error);
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10, role, organizationId } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = {};
      if (role) whereClause.role = role;
      if (organizationId) whereClause.organizationId = organizationId;

      const users = await User.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          model: Organization,
          as: 'organization',
          attributes: ['id', 'name', 'slug']
        }],
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
      logger.error('Get all users error:', error);
      next(error);
    }
  }
}

module.exports = new SuperAdminController();
