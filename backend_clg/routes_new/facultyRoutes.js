const express = require('express');
const router = express.Router();
const { getFaculty, createFaculty, updateFaculty, deleteFaculty } = require('../controllers_new/facultyController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getFaculty);
router.post('/', protect, createFaculty);
router.put('/:id', protect, updateFaculty);
router.delete('/:id', protect, deleteFaculty);

module.exports = router;