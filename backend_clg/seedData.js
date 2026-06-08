const mongoose = require('mongoose');
const Student = require('./Models/Student');
const Staff = require('./Models/Staff');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const students = [
      {
        studentId: 'STU1001',
        name: 'Alice Johnson',
        gender: 'Female',
        dob: '2001-05-15',
        department: 'Computer Science',
        year: '3rd Year',
        email: 'alice.j@example.com',
        phone: '1234567890'
      },
      {
        studentId: 'STU1002',
        name: 'Bob Smith',
        gender: 'Male',
        dob: '2002-08-22',
        department: 'Information Technology',
        year: '2nd Year',
        email: 'bob.s@example.com',
        phone: '0987654321'
      },
      {
        studentId: 'STU1003',
        name: 'Charlie Brown',
        gender: 'Male',
        dob: '2000-11-30',
        department: 'Mechanical Engineering',
        year: '4th Year',
        email: 'charlie.b@example.com',
        phone: '1122334455'
      }
    ];

    const staffs = [
      {
        staffId: 'STF2001',
        name: 'Dr. Emily Chen',
        department: 'Computer Science',
        designation: 'Professor',
        email: 'emily.chen@example.com',
        phone: '5566778899'
      },
      {
        staffId: 'STF2002',
        name: 'Prof. Michael Davis',
        department: 'Information Technology',
        designation: 'Assistant Professor',
        email: 'michael.davis@example.com',
        phone: '6677889900'
      },
      {
        staffId: 'STF2003',
        name: 'Sarah Wilson',
        department: 'Mechanical Engineering',
        designation: 'Lab Instructor',
        email: 'sarah.w@example.com',
        phone: '7788990011'
      }
    ];

    await Student.insertMany(students);
    console.log('Students added');

    await Staff.insertMany(staffs);
    console.log('Staff added');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
