const express = require('express');
const router = express.Router();
const dashboardController = require('../Controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, dashboardController.getDashboardStats);

module.exports = router;