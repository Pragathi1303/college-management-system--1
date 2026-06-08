const Application = require('../Models/Application');
const { catchAsyncErrors } = require('../utils/errorHandler');

exports.submitApplication = catchAsyncErrors(async (req, res) => {
  const application = await Application.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Application submitted successfully',
    data: application,
  });
});