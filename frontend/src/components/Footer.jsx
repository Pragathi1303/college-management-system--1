import React from "react";
import { Link } from "react-router-dom";

const footerLinks = {
  students: [
    { label: "Student Login", to: "/login", icon: "🔑" },
    { label: "Register", to: "/signup", icon: "📝" },
    { label: "Apply Now", to: "/application", icon: "🎓" },
    { label: "Reset Password", to: "/forgot", icon: "🔒" },
  ],
  college: [
    { label: "About SECE", to: "/about", icon: "🏛️" },
    { label: "Admin Panel", to: "/admin", icon: "⚙️" },
    { label: "Contact Us", to: "/contact", icon: "📬" },
    { label: "FAQ", to: "/faq", icon: "❓" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/privacy", icon: "🔐" },
    { label: "Terms & Conditions", to: "/terms", icon: "📜" },
  ],
};

function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900 font-bold">
                CF
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Campus<span className="text-gold-400">Flow</span>
              </span>
            </Link>
            <p className="text-navy-300 text-sm leading-relaxed max-w-sm mb-6">
              A modern college management system designed for students, faculty, 
              and administrators. Streamlining admissions, academics, and campus life.
            </p>
            <div className="flex gap-3">
              <span className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-navy-400 hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">in</span>
              <span className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-navy-400 hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">𝕏</span>
              <span className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-navy-400 hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">f</span>
              <span className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center text-navy-400 hover:bg-gold-500 hover:text-navy-900 transition-all cursor-pointer">ig</span>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">Students</h4>
            <ul className="space-y-3">
              {footerLinks.students.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors group"
                  >
                    <span className="text-xs">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">College</h4>
            <ul className="space-y-3">
              {footerLinks.college.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors group"
                  >
                    <span className="text-xs">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors group"
                  >
                    <span className="text-xs">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-navy-400 text-xs">
            © 2026 CampusFlow — Sri Eshwar College of Engineering. All rights reserved.
          </span>
          <span className="text-navy-500 text-xs flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> for students
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;