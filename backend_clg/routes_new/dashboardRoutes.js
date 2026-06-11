const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers_new/dashboardController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getDashboardStats);

module.exports = router;