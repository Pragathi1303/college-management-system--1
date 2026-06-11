const Admin = require('./models_new/Admin');
const mongoose = require('mongoose');

const seedAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await Admin.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'Admin@123',
        role: 'admin',
      });
      console.log('✅ Default Admin account created successfully!');
      console.log('   Email: admin@example.com');
      console.log('   Password: Admin@123');
    } else {
      console.log('✅ Default Admin account already exists.');
      console.log('   Email: admin@example.com');
    }
  } catch (error) {
    console.error('Seed admin error:', error.message);
  }
};

module.exports = seedAdmin;