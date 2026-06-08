import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { toast } from "react-hot-toast";

function Application() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/applications", form);
      if (res.data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-50 to-white pt-20">
          <div className="w-full max-w-lg mx-auto px-4 animate-fade-up">
            <div className="card p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">✅</div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Application Submitted!</h2>
              <p className="text-navy-500 mb-2">
                We'll contact you at <strong className="text-navy-900">{form.email}</strong> within 48 hours.
              </p>
              <p className="text-navy-400 text-sm mb-6">Our admissions team will review your application and get back to you.</p>
              <a href="/" className="btn-primary">🏠 Back to Home</a>
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
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
          <div className="shape-blob w-[400px] h-[400px] bg-gold-500/20 top-0 right-0 animate-float" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="badge bg-white/10 text-white border border-white/10 mb-4">🎓 Admissions 2026</div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Apply for <span className="gradient-gold">Admission</span>
            </h1>
            <p className="text-navy-200 text-lg max-w-2xl mx-auto">
              Fill in your details below to start your application. Our team will contact you within 48 hours.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="page-section">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Info Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                <div className="card p-6 space-y-4">
                  <h3 className="font-bold text-navy-900">📋 Requirements</h3>
                  <ul className="space-y-3">
                    {["Valid email address", "Phone number", "Course preference", "Academic documents (optional)"].map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-navy-600">
                        <span className="text-accent-green mt-0.5">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6 space-y-3">
                  <h3 className="font-bold text-navy-900">⏱️ Timeline</h3>
                  <div className="space-y-2 text-sm text-navy-600">
                    <p><strong className="text-navy-900">Application Review:</strong> Within 48 hours</p>
                    <p><strong className="text-navy-900">Entrance Test:</strong> As scheduled</p>
                    <p><strong className="text-navy-900">Final Decision:</strong> 2-3 weeks</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-3">
                <div className="card p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="label">Full Name</label>
                      <input name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handleChange} required className="input-field" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label">Email Address</label>
                        <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className="input-field" />
                      </div>
                      <div>
                        <label className="label">Phone Number</label>
                        <input name="phone" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={handleChange} required className="input-field" />
                      </div>
                    </div>

                    <div>
                      <label className="label">Course Applying For</label>
                      <select name="course" value={form.course} onChange={handleChange} required className="input-field">
                        <option value="">-- Select Course --</option>
                        <option>B.E. Computer Science & Engineering</option>
                        <option>B.E. Electronics & Communication</option>
                        <option>B.E. Mechanical Engineering</option>
                        <option>B.E. Civil Engineering</option>
                        <option>B.E. Electrical & Electronics</option>
                        <option>M.E. Computer Science</option>
                        <option>MBA</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">Message <span className="text-navy-400 font-normal">(Optional)</span></label>
                      <textarea name="message" placeholder="Any queries or additional information..." rows={4} value={form.message} onChange={handleChange} className="input-field resize-none" />
                    </div>

                    <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "🚀 Submit Application"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Application;