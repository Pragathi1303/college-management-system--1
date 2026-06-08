import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-hot-toast";

const defaultStats = {
  totalStudents: 0,
  totalStaff: 0,
  totalCourses: 24,
  totalDepartments: 8,
};

function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(defaultStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        if (res.data.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const metricCards = [
    { label: "Total Students", value: stats.totalStudents, icon: "👨🎓", color: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
    { label: "Total Staff", value: stats.totalStaff, icon: "👩🏫", color: "from-cyan-500 to-blue-500", bg: "bg-cyan-50" },
    { label: "Total Courses", value: stats.totalCourses, icon: "📚", color: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
    { label: "Total Departments", value: stats.totalDepartments, icon: "🏛️", color: "from-red-500 to-rose-500", bg: "bg-red-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user?.name || "Admin"} />
      <main className="flex-1 lg:ml-0 p-4 lg:p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="mb-8">
          <div className="badge-primary mb-3">📊 ERP Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">College Management Overview</h1>
          <p className="text-navy-500 mt-1">Admin operations, admissions metrics, and management modules.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/admin/students" className="btn-primary btn-sm">👨🎓 Manage Students</Link>
          <Link to="/admin/staff" className="btn-outline btn-sm">👩🏫 Manage Staff</Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metricCards.map((card, i) => (
            <div key={card.label} className="card p-5 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} ${card.bg} flex items-center justify-center text-xl`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-navy-900">{card.value}</div>
                  <div className="text-navy-500 text-xs font-medium">{card.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & System Notes */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="font-bold text-navy-900 mb-1">Quick Actions</h3>
            <p className="text-navy-500 text-sm mb-4">Manage academics, admissions, and administration tasks.</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-bold text-navy-900 text-sm">Overview</h4>
                <p className="text-navy-500 text-xs mt-1">View KPIs and ERP summary.</p>
              </div>
              <Link to="/admin/students" className="block p-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors">
                <div className="text-2xl mb-2">👨🎓</div>
                <h4 className="font-bold text-navy-900 text-sm">Students</h4>
                <p className="text-navy-500 text-xs mt-1">Add, edit, delete & search.</p>
              </Link>
              <Link to="/admin/staff" className="block p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors">
                <div className="text-2xl mb-2">👩🏫</div>
                <h4 className="font-bold text-navy-900 text-sm">Staff</h4>
                <p className="text-navy-500 text-xs mt-1">Add, edit, delete & search.</p>
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-bold text-navy-900 mb-1">System Notes</h3>
            <p className="text-navy-500 text-sm mb-4">Overview of the college ERP system.</p>
            <div className="space-y-3">
              {[
                "✅ Sri Eshwar College of Engineering – ERP Portal",
                "✅ Manage student records, staff details & courses",
                "🧭 Navigate using the sidebar for all modules",
                "📱 Fully responsive & mobile-friendly interface",
              ].map((note, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-navy-50 text-navy-700 text-sm">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;