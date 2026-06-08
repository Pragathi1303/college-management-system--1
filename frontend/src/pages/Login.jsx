import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../utils/axios";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  // Changed "email" to "identifier" to accurately reflect Email / Roll Number support
  const [form, setForm] = useState({ identifier: "", password: "", role: "student" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { 
        email: form.identifier, // Sent as 'email' key assuming backend expects this parameter name
        password: form.password,
        role: form.role
      });
      
      if (res.data.success) {
        login({ 
          token: res.data.token, 
          user: res.data.user 
        });
        toast.success(`Logged in as ${form.role}`);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-50 to-white pt-20">
        <div className="w-full max-w-md mx-auto px-4 animate-fade-up">
          <div className="card p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-primary-500/25">
                🔑
              </div>
              <h1 className="text-2xl font-bold text-navy-900">Welcome Back</h1>
              <p className="text-navy-500 text-sm mt-1">Sign in to your campus portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label">Login As</label>
                <select name="role" value={form.role} onChange={handleChange} className="input-field">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              <div>
                <label className="label">Email / Roll Number</label>
                <input
                  name="identifier"
                  type="text"
                  placeholder="Enter email or roll number"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label mb-0">Password</label>
                  <Link to="/forgot" className="text-xs text-primary-600 hover:text-primary-700 font-semibold">
                    Forgot?
                  </Link>
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "🔑 Sign In"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-navy-500 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;