const express = require('express');
const router = express.Router();
const staffController = require('../Controllers/staffController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, staffController.getAllStaff);
router.get('/search', protect, adminOnly, staffController.searchStaff);
router.post('/', protect, adminOnly, staffController.addStaff);
router.put('/:staffId', protect, adminOnly, staffController.updateStaff);
router.delete('/:staffId', protect, adminOnly, staffController.deleteStaff);

module.exports = router;