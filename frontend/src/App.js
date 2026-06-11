import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Application from "./pages/Application";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Forgot from "./pages/Forgot";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Faculty from "./pages/admin/Faculty";
import Departments from "./pages/admin/Departments";
import Courses from "./pages/admin/Courses";
import Attendance from "./pages/admin/Attendance";
import Fees from "./pages/admin/Fees";
import Analytics from "./pages/admin/Analytics";
import Announcements from "./pages/admin/Announcements";
import Settings from "./pages/admin/Settings";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Toaster position="top-right" toastOptions={{ className: 'text-sm' }} />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/application" element={<Application />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />

            {/* Admin Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
            <Route path="/admin/faculty" element={<ProtectedRoute><Faculty /></ProtectedRoute>} />
            <Route path="/admin/departments" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
            <Route path="/admin/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="/admin/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;