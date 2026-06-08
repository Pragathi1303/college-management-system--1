const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', protect, adminOnly, studentController.getAllStudents);
router.get('/search', protect, adminOnly, studentController.searchStudents);
router.post('/', protect, adminOnly, studentController.addStudent);
router.put('/:studentId', protect, adminOnly, studentController.updateStudent);
router.delete('/:studentId', protect, adminOnly, studentController.deleteStudent);

module.exports = router;