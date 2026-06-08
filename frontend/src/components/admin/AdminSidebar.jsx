import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/students", label: "Students", icon: "👨🎓" },
  { to: "/admin/staff", label: "Staff", icon: "👩🏫" },
];

function Sidebar({ username }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center shadow-lg"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen z-40 w-64 bg-navy-900 text-white flex flex-col
        transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Brand */}
        <div className="p-6 border-b border-navy-800">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900 font-bold text-sm">
              A
            </div>
            <div>
              <div className="font-bold text-white">SECE Admin</div>
              <div className="text-navy-400 text-xs">ERP & Management</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="px-6 py-4 border-b border-navy-800 flex items-center justify-between">
          <span className="text-sm text-navy-300">
            👤 <span className="text-white font-medium">{username || "Admin"}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-navy-400 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-600/20 text-primary-300 border border-primary-500/20"
                    : "text-navy-300 hover:text-white hover:bg-navy-800"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          <div className="border-t border-navy-800 my-4" />

          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-navy-300 hover:text-white hover:bg-navy-800 transition-all"
          >
            <span>🏠</span>
            Home
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-navy-800">
          <p className="text-navy-500 text-xs">Manage your college efficiently.</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;