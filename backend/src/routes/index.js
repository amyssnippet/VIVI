const express = require('express');
const authRoutes = require('./auth');
const superadminRoutes = require('./superadmin');
const adminRoutes = require('./admin');
const userRoutes = require('./user');
const aiRoutes = require('./ai');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/superadmin', superadminRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/ai', aiRoutes);

module.exports = router;
