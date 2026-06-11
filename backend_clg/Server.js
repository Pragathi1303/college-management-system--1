const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./Routers/authRoutes');
const studentRoutes = require('./Routers/studentRoutes');
const staffRoutes = require('./Routers/staffRoutes');
const dashboardRoutes = require('./Routers/dashboardRoutes');
const applicationRoutes = require('./Routers/applicationRoutes');
const contactRoutes = require('./Routers/contactRoutes');
const { errorMiddleware } = require('./utils/errorHandler');

// ERP Admin Route Imports
const adminAuthRoutes = require('./routes_new/authRoutes');
const dashboardRoutesNew = require('./routes_new/dashboardRoutes');
const studentRoutesNew = require('./routes_new/studentRoutes');
const facultyRoutesNew = require('./routes_new/facultyRoutes');
const departmentRoutesNew = require('./routes_new/departmentRoutes');
const courseRoutesNew = require('./routes_new/courseRoutes');
const attendanceRoutesNew = require('./routes_new/attendanceRoutes');
const feeRoutesNew = require('./routes_new/feeRoutes');
const announcementRoutesNew = require('./routes_new/announcementRoutes');
const analyticsRoutesNew = require('./routes_new/analyticsRoutes');
const seedAdmin = require('./seedAdmin');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// ========== MIDDLEWARE ==========

// CORS Configuration
const corsOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(s => s.trim())
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' ? corsOrigins : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== ROUTES ==========

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'College Management API is running',
    timestamp: new Date().toISOString(),
  });
});

// Auth routes
app.use('/api/auth', authRoutes);

// ========== ERP ADMIN ROUTES ==========
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/dashboard', dashboardRoutesNew);
app.use('/api/admin/students', studentRoutesNew);
app.use('/api/admin/faculty', facultyRoutesNew);
app.use('/api/admin/departments', departmentRoutesNew);
app.use('/api/admin/courses', courseRoutesNew);
app.use('/api/admin/attendance', attendanceRoutesNew);
app.use('/api/admin/fees', feeRoutesNew);
app.use('/api/admin/announcements', announcementRoutesNew);
app.use('/api/admin/analytics', analyticsRoutesNew);

// College Management Routes
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/faculty', staffRoutes); // Alias: /api/faculty -> staff routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to College Management API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      students: '/api/students',
      staff: '/api/staff',
      faculty: '/api/faculty',
      dashboard: '/api/dashboard',
      health: '/api/health',
      admin: {
        auth: '/api/admin',
        dashboard: '/api/admin/dashboard',
        students: '/api/admin/students',
        faculty: '/api/admin/faculty',
        departments: '/api/admin/departments',
        courses: '/api/admin/courses',
        attendance: '/api/admin/attendance',
        fees: '/api/admin/fees',
        announcements: '/api/admin/announcements',
        analytics: '/api/admin/analytics',
      },
    },
  });
});

// 404 route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ========== ERROR MIDDLEWARE ==========
app.use(errorMiddleware);

// ========== SERVER STARTUP ==========

const basePort = Number(process.env.PORT) || 5000;

const startServer = async () => {
  // Run DB Seed
  try {
    await seedAdmin();
  } catch (err) {
    console.error('Failed to seed admin on startup:', err.message);
  }

  let portToTry = basePort;
  const maxTries = 10;

  for (let attempt = 1; attempt <= maxTries; attempt++) {
    try {
      const server = app.listen(portToTry, () => {
        console.log('');
        console.log('╔═══════════════════════════════════════╗');
        console.log('║   🎓 COLLEGE MANAGEMENT API 🎓        ║');
        console.log(`║   Running on http://localhost:${portToTry}      ║`);
        console.log('╚═══════════════════════════════════════╝');
        console.log('');
      });

      // Handle runtime listen errors too (in case of race conditions)
      server.on('error', (err) => {
        if (err && err.code === 'EADDRINUSE' && attempt < maxTries) {
          console.warn(`Port ${portToTry} is already in use. Retrying on port ${portToTry + 1}...`);
          portToTry += 1;
        } else {
          console.error('Server startup error:', err?.message || err);
          process.exit(1);
        }
      });

      return; // success
    } catch (error) {
      if (error && error.code === 'EADDRINUSE' && attempt < maxTries) {
        console.warn(`Port ${portToTry} is already in use. Retrying on port ${portToTry + 1}...`);
        portToTry += 1;
        continue;
      }
      console.error('Server startup error:', error?.message || error);
      process.exit(1);
    }
  }

  console.error(`Could not start server. All ports ${basePort}..${basePort + maxTries - 1} are in use.`);
  process.exit(1);
};

if (!process.env.VERCEL) {
  startServer();
}

module.exports = app;
