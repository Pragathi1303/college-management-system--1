const express = require('express');
const router = express.Router();
const { getAttendance, createAttendance, updateAttendance, deleteAttendance, markBulkAttendance } = require('../controllers_new/attendanceController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getAttendance);
router.post('/', protect, createAttendance);
router.post('/bulk', protect, markBulkAttendance);
router.put('/:id', protect, updateAttendance);
router.delete('/:id', protect, deleteAttendance);

module.exports = router;