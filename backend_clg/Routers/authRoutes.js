const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require('../utils/validation');

/**
 * Auth Routes
 */

// Public routes
router.post('/register', validateRegister(), authController.register);
router.post('/login', validateLogin(), authController.login);
router.post('/forgot-password', validateForgotPassword(), authController.forgotPassword);
router.post('/reset-password', validateResetPassword(), authController.resetPassword);

// Private routes
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
