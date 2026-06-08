const Contact = require('../Models/Contact');
const { catchAsyncErrors } = require('../utils/errorHandler');

exports.submitContact = catchAsyncErrors(async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: contact,
  });
});