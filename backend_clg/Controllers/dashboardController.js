const Student = require('../Models/Student');
const Staff = require('../Models/Staff');
const { catchAsyncErrors } = require('../utils/errorHandler');

exports.getDashboardStats = catchAsyncErrors(async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalStaff = await Staff.countDocuments();
  res.status(200).json({
    success: true,
    data: {
      totalStudents,
      totalStaff,
      totalCourses: 24,
      totalDepartments: 8,
    },
  });
});