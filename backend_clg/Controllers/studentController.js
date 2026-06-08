const Student = require('../Models/Student');
const { catchAsyncErrors } = require('../utils/errorHandler');

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Private/Admin
 */
exports.getAllStudents = catchAsyncErrors(async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: students.length, data: students });
});

/**
 * @route   GET /api/students/search?q=
 * @desc    Search students by query
 * @access  Private/Admin
 */
exports.searchStudents = catchAsyncErrors(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const students = await Student.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: students.length, data: students });
  }
  const regex = new RegExp(q, 'i');
  const students = await Student.find({
    $or: [
      { studentId: regex },
      { name: regex },
      { department: regex },
      { email: regex },
    ],
  }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: students.length, data: students });
});

/**
 * @route   POST /api/students
 * @desc    Add a new student
 * @access  Private/Admin
 */
exports.addStudent = catchAsyncErrors(async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json({ success: true, data: student });
});

/**
 * @route   PUT /api/students/:studentId
 * @desc    Update a student
 * @access  Private/Admin
 */
exports.updateStudent = catchAsyncErrors(async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate({ studentId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.status(200).json({ success: true, data: student });
});

/**
 * @route   DELETE /api/students/:studentId
 * @desc    Delete a student
 * @access  Private/Admin
 */
exports.deleteStudent = catchAsyncErrors(async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({ studentId });
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found' });
  }
  res.status(200).json({ success: true, message: 'Student deleted successfully' });
});