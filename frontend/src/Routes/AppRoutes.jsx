import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CampusFlowHome from "../pages/CampusFlowHome";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Forgot from "../pages/Forgot";
import About from "../pages/About";
import Contact from "../pages/Contact";
import FAQ from "../pages/FAQ";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import StudentManagement from "../pages/StudentManagement";
import StaffManagement from "../pages/StaffManagement";
import Application from "../pages/Application";
import AdminProtectedRoute from "../components/admin/AdminProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampusFlowHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminProtectedRoute>
              <StudentManagement />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/staff"
          element={
            <AdminProtectedRoute>
              <StaffManagement />
            </AdminProtectedRoute>
          }
        />

        <Route path="/application" element={<Application />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;