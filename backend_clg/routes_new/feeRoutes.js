const express = require('express');
const router = express.Router();
const { getFees, createFee, updateFee, deleteFee } = require('../controllers_new/feeController');
const { protect } = require('../middleware_new/authMiddleware');

router.get('/', protect, getFees);
router.post('/', protect, createFee);
router.put('/:id', protect, updateFee);
router.delete('/:id', protect, deleteFee);

module.exports = router;