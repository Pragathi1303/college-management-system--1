const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers_new/analyticsController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getAnalytics);

module.exports = router;