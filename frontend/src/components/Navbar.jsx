import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/", icon: "🏠" },
  { label: "About", to: "/about", icon: "🏛️" },
  { label: "Apply", to: "/application", icon: "📝" },
  { label: "Contact", to: "/contact", icon: "📬" },
  { label: "FAQ", to: "/faq", icon: "❓" },
];

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-cyan flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              CF
            </div>
            <div>
              <span className="text-lg font-extrabold text-navy-900 tracking-tight">
                Campus<span className="text-primary-600">Flow</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.to)
                    ? "bg-primary-50 text-primary-700"
                    : "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn-gold text-sm">
              Get Started →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 rounded-xl hover:bg-navy-50 transition-colors"
            aria-label="Toggle navigation"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
              <span
                className={`block w-5 h-0.5 bg-navy-700 rounded transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-navy-700 rounded transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-navy-700 rounded transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive(link.to)
                  ? "bg-primary-50 text-primary-700"
                  : "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 pt-3 mt-3 space-y-2">
            <Link
              to="/login"
              className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-navy-200 text-navy-700 font-semibold text-sm hover:bg-navy-50 transition-colors"
            >
              🔑 Sign In
            </Link>
            <Link
              to="/signup"
              className="flex items-center justify-center px-4 py-3 rounded-xl bg-gold-500 text-navy-900 font-semibold text-sm hover:bg-gold-400 transition-colors"
            >
              🚀 Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;