const FAQ = require('../Models/FAQ');
const { catchAsyncErrors } = require('../utils/errorHandler');

exports.getFAQs = catchAsyncErrors(async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: faqs });
});