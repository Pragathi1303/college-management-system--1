const Staff = require('../Models/Staff');

// @desc    Get all faculty with pagination, search, filter
// @route   GET /api/faculty
const getFaculty = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const department = req.query.department || '';

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { staffId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (department) query.department = department;

    const faculty = await Staff.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Staff.countDocuments(query);

    res.json({
      success: true,
      faculty,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create faculty
// @route   POST /api/faculty
const createFaculty = async (req, res) => {
  try {
    const { staffId, name, department, designation, email, phone } = req.body;
    const existing = await Staff.findOne({ staffId });
    if (existing) return res.status(400).json({ success: false, message: 'Faculty ID already exists' });

    const faculty = await Staff.create({ staffId, name, department, designation, email, phone });
    res.status(201).json({ success: true, message: 'Faculty added successfully', faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update faculty
// @route   PUT /api/faculty/:id
const updateFaculty = async (req, res) => {
  try {
    const faculty = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, message: 'Faculty updated successfully', faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete faculty
// @route   DELETE /api/faculty/:id
const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Staff.findByIdAndDelete(req.params.id);
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFaculty, createFaculty, updateFaculty, deleteFaculty };