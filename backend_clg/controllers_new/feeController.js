const Fee = require('../models_new/Fee');

const getFees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || '';
    const department = req.query.department || '';

    let query = {};
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { registerNumber: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.paymentStatus = status;
    if (department) query.department = department;

    const fees = await Fee.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Fee.countDocuments(query);

    res.json({
      success: true,
      fees,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createFee = async (req, res) => {
  try {
    const { student, studentName, registerNumber, department, totalFee, paidAmount, dueDate } = req.body;
    const fee = await Fee.create({ student, studentName, registerNumber, department, totalFee, paidAmount, dueDate });
    res.status(201).json({ success: true, message: 'Fee record created successfully', fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });
    res.json({ success: true, message: 'Fee record updated successfully', fee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) return res.status(404).json({ success: false, message: 'Fee record not found' });
    res.json({ success: true, message: 'Fee record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getFees, createFee, updateFee, deleteFee };