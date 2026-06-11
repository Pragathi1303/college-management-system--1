const Student = require('../Models/Student');
const Staff = require('../Models/Staff');
const Department = require('../models_new/Department');
const Course = require('../models_new/Course');
const Attendance = require('../models_new/Attendance');
const Fee = require('../models_new/Fee');
const Announcement = require('../models_new/Announcement');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalStudents,
      totalFaculty,
      totalCourses,
      totalDepartments,
      totalAttendance,
      totalFees,
      recentAnnouncements,
    ] = await Promise.all([
      Student.countDocuments(),
      Staff.countDocuments(),
      Course.countDocuments(),
      Department.countDocuments(),
      Attendance.countDocuments(),
      Fee.aggregate([
        {
          $group: {
            _id: null,
            totalCollected: { $sum: '$paidAmount' },
            totalPending: { $sum: '$remainingAmount' },
          },
        },
      ]),
      Announcement.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalFaculty,
        totalCourses,
        totalDepartments,
        totalAttendance,
        totalFeesCollected: totalFees.length > 0 ? totalFees[0].totalCollected : 0,
        totalFeesPending: totalFees.length > 0 ? totalFees[0].totalPending : 0,
      },
      recentAnnouncements,
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };