import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Forgot() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-navy-50 to-white pt-20">
        <div className="w-full max-w-md mx-auto px-4 animate-fade-up">
          <div className="card p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-green to-green-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-green-500/25">
                🔓
              </div>
              <h1 className="text-2xl font-bold text-navy-900">Reset Password</h1>
              <p className="text-navy-500 text-sm mt-1">Enter your registered email and we'll send you a reset link.</p>
            </div>

            {sent ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-4xl mx-auto mb-6">📧</div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">Reset link sent!</h3>
                <p className="text-navy-500 text-sm mb-6">
                  Check your inbox at <strong className="text-navy-900">{email}</strong>
                </p>
                <Link to="/login" className="btn-primary">🔑 Back to Login</Link>
              </div>
            ) : (
              <>
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium mb-6">
                    ⚠️ {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      placeholder="student@sece.ac.in"
                      autoComplete="email"
                      value={email}
                      onChange={e => { setError(""); setEmail(e.target.value); }}
                      required
                      className="input-field"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "📧 Send Reset Link"
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="border-t border-gray-100 mt-6 pt-6">
              <p className="text-center text-sm text-navy-500">
                Remember your password?{" "}
                <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Forgot;