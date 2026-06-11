const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers_new/studentController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getStudents);
router.get('/:id', protect, getStudentById);
router.post('/', protect, createStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;