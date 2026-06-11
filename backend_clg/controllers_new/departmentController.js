const Department = require('../models_new/Department');

const getDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    let query = {};
    if (search) {
      query.$or = [
        { departmentName: { $regex: search, $options: 'i' } },
        { departmentCode: { $regex: search, $options: 'i' } },
      ];
    }

    const departments = await Department.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await Department.countDocuments(query);

    res.json({
      success: true,
      departments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { departmentName, departmentCode, hodName } = req.body;
    const existing = await Department.findOne({ $or: [{ departmentName }, { departmentCode }] });
    if (existing) return res.status(400).json({ success: false, message: 'Department name or code already exists' });

    const department = await Department.create({ departmentName, departmentCode, hodName });
    res.status(201).json({ success: true, message: 'Department created successfully', department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, message: 'Department updated successfully', department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return res.status(404).json({ success: false, message: 'Department not found' });
    res.json({ success: true, message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDepartments, getDepartmentById, createDepartment, updateDepartment, deleteDepartment };