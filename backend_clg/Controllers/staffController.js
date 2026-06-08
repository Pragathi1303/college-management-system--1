const Staff = require('../Models/Staff');
const { catchAsyncErrors } = require('../utils/errorHandler');

/**
 * @route   GET /api/staff
 * @desc    Get all staff
 * @access  Private/Admin
 */
exports.getAllStaff = catchAsyncErrors(async (req, res) => {
  const staff = await Staff.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: staff.length, data: staff });
});

/**
 * @route   GET /api/staff/search?q=
 * @desc    Search staff by query
 * @access  Private/Admin
 */
exports.searchStaff = catchAsyncErrors(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const staff = await Staff.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: staff.length, data: staff });
  }
  const regex = new RegExp(q, 'i');
  const staff = await Staff.find({
    $or: [
      { staffId: regex },
      { name: regex },
      { department: regex },
      { designation: regex },
    ],
  }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: staff.length, data: staff });
});

/**
 * @route   POST /api/staff
 * @desc    Add a new staff member
 * @access  Private/Admin
 */
exports.addStaff = catchAsyncErrors(async (req, res) => {
  const staff = await Staff.create(req.body);
  res.status(201).json({ success: true, data: staff });
});

/**
 * @route   PUT /api/staff/:staffId
 * @desc    Update a staff member
 * @access  Private/Admin
 */
exports.updateStaff = catchAsyncErrors(async (req, res) => {
  const { staffId } = req.params;
  const staff = await Staff.findOneAndUpdate({ staffId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    return res.status(404).json({ success: false, message: 'Staff not found' });
  }
  res.status(200).json({ success: true, data: staff });
});

/**
 * @route   DELETE /api/staff/:staffId
 * @desc    Delete a staff member
 * @access  Private/Admin
 */
exports.deleteStaff = catchAsyncErrors(async (req, res) => {
  const { staffId } = req.params;
  const staff = await Staff.findOneAndDelete({ staffId });
  if (!staff) {
    return res.status(404).json({ success: false, message: 'Staff not found' });
  }
  res.status(200).json({ success: true, message: 'Staff deleted successfully' });
});