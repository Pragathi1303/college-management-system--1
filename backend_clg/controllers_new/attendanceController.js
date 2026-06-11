const Attendance = require('../models_new/Attendance');
const Student = require('../Models/Student');

const getAttendance = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const department = req.query.department || '';
    const date = req.query.date || '';

    let query = {};
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { registerNumber: { $regex: search, $options: 'i' } },
      ];
    }
    if (department) query.department = department;
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query).skip(skip).limit(limit).sort({ date: -1 });
    const total = await Attendance.countDocuments(query);

    res.json({
      success: true,
      attendance,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createAttendance = async (req, res) => {
  try {
    const { student, registerNumber, studentName, department, date, status } = req.body;

    const existing = await Attendance.findOne({ student, date: new Date(date) });
    if (existing) return res.status(400).json({ success: false, message: 'Attendance already marked for this student on this date' });

    const attendance = await Attendance.create({ student, registerNumber, studentName, department, date, status });
    res.status(201).json({ success: true, message: 'Attendance marked successfully', attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!attendance) return res.status(404).json({ success: false, message: 'Attendance record not found' });
    res.json({ success: true, message: 'Attendance updated successfully', attendance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    if (!attendance) return res.status(404).json({ success: false, message: 'Attendance record not found' });
    res.json({ success: true, message: 'Attendance deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const markBulkAttendance = async (req, res) => {
  try {
    const { records } = req.body; // Array of { student, registerNumber, studentName, department, date, status }
    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide attendance records array' });
    }

    const created = await Attendance.insertMany(records, { ordered: false });
    res.status(201).json({ success: true, message: `${created.length} attendance records created`, attendance: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAttendance, createAttendance, updateAttendance, deleteAttendance, markBulkAttendance };