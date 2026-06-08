import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/axios";
import { toast } from "react-hot-toast";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", roll: "", dept: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { 
      toast.error("Passwords do not match!"); 
      return; 
    }
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "student",
        rollNumber: form.roll,
        department: form.dept
      });
      if (res.data.success) {
        setDone(true);
        toast.success("Account created successfully!");
      }
    } catch (err) {
      // utils/axios interceptor wraps errors as plain Error with message
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-50 to-white pt-20">
          <div className="w-full max-w-md mx-auto px-4 animate-fade-up">
            <div className="card p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Account Created!</h2>
              <p className="text-navy-500 mb-6">Your student account has been successfully created.</p>
              <Link to="/login" className="btn-primary">🔑 Login Now →</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-50 to-white pt-20 pb-10">
        <div className="w-full max-w-lg mx-auto px-4 animate-fade-up">
          <div className="card p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-gold-500/25">
                📝
              </div>
              <h1 className="text-2xl font-bold text-navy-900">Create Account</h1>
              <p className="text-navy-500 text-sm mt-1">Register to access your student portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required className="input-field" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email Address</label>
                  <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="label">Roll Number</label>
                  <input name="roll" type="text" placeholder="e.g. 22CSE001" value={form.roll} onChange={handleChange} required className="input-field" />
                </div>
              </div>

              <div>
                <label className="label">Department</label>
                <select name="dept" value={form.dept} onChange={handleChange} required className="input-field">
                  <option value="">-- Select Department --</option>
                  <option>Computer Science & Engineering</option>
                  <option>Electronics & Communication</option>
                  <option>Mechanical Engineering</option>
                  <option>Civil Engineering</option>
                  <option>Electrical & Electronics</option>
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Password</label>
                  <input name="password" type="password" placeholder="Create password" value={form.password} onChange={handleChange} required className="input-field" />
                </div>
                <div>
                  <label className="label">Confirm Password</label>
                  <input name="confirm" type="password" placeholder="Repeat password" value={form.confirm} onChange={handleChange} required className="input-field" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  "✅ Create Account"
                )}
              </button>
            </form>

            <p className="text-center text-sm text-navy-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Signup;