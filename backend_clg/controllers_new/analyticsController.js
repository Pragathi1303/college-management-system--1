const Student = require('../Models/Student');
const Staff = require('../Models/Staff');
const Attendance = require('../models_new/Attendance');
const Fee = require('../models_new/Fee');
const Department = require('../models_new/Department');

// @desc    Get analytics data for charts
// @route   GET /api/analytics
const getAnalytics = async (req, res) => {
  try {
    // 1. Students Per Department
    const studentsPerDept = await Student.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // 2. Faculty Distribution
    const facultyPerDept = await Staff.aggregate([
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // 3. Attendance Percentage (overall)
    const totalAttendance = await Attendance.countDocuments();
    const presentCount = await Attendance.countDocuments({ status: 'Present' });
    const absentCount = await Attendance.countDocuments({ status: 'Absent' });
    const attendancePercentage = totalAttendance > 0
      ? Math.round((presentCount / totalAttendance) * 100)
      : 0;

    // 4. Monthly Fee Collection
    const monthlyFees = await Fee.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          collected: { $sum: '$paidAmount' },
          pending: { $sum: '$remainingAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 12 },
    ]);

    // 5. Department Statistics (combined)
    const deptStats = await Department.find().select('departmentName totalStudents totalFaculty');

    res.json({
      success: true,
      analytics: {
        studentsPerDept: studentsPerDept.map((d) => ({ label: d._id, value: d.count })),
        facultyPerDept: facultyPerDept.map((d) => ({ label: d._id, value: d.count })),
        attendance: {
          total: totalAttendance,
          present: presentCount,
          absent: absentCount,
          percentage: attendancePercentage,
        },
        monthlyFees: monthlyFees.map((m) => ({
          month: m._id,
          collected: m.collected,
          pending: m.pending,
          count: m.count,
        })),
        departmentStats: deptStats,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAnalytics };