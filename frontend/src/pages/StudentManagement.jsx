import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-hot-toast";

const EMPTY = { studentId: "", name: "", gender: "", dob: "", department: "", year: "", email: "", phone: "" };

function StudentManagement() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(s => `${s.studentId} ${s.name} ${s.department} ${s.email}`.toLowerCase().includes(q));
  }, [students, query]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/students");
      if (res.data.success) {
        setStudents(res.data.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch students");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  function handleChange(e) { setError(""); setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  function validate() {
    for (const k of ["studentId","name","gender","dob","department","year","email","phone"]) {
      if (!form[k]) return `Missing ${k.replace(/([A-Z])/g," $1").toLowerCase()}.`;
    }
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    
    try {
      if (editingId) {
        const res = await api.put(`/students/${editingId}`, form);
        if (res.data.success) {
          toast.success("Student updated successfully");
          fetchStudents();
        }
      } else {
        const res = await api.post("/students", form);
        if (res.data.success) {
          toast.success("Student added successfully");
          fetchStudents();
        }
      }
      setEditingId(null);
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
      toast.error(err.response?.data?.message || "Operation failed");
    }
  }

  function startEdit(s) {
    setEditingId(s.studentId);
    setForm({ ...s });
    setError("");
  }

  function cancelEdit() { setEditingId(null); setForm(EMPTY); setError(""); }

  async function onDelete(sid) {
    if (!window.confirm("Delete this student?")) return;
    try {
      const res = await api.delete(`/students/${sid}`);
      if (res.data.success) {
        toast.success("Student deleted successfully");
        fetchStudents();
        if (editingId === sid) cancelEdit();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete student");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user?.name || "Admin"} />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="mb-8">
          <div className="badge-primary mb-3">👨🎓 Student Management</div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Students</h1>
          <p className="text-navy-500 mt-1">Add, edit, delete and search students.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="font-bold text-navy-900 mb-1">{editingId ? "Edit Student" : "Add Student"}</h3>
              <p className="text-navy-500 text-sm mb-4">Provide complete student details.</p>
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium mb-4">
                  ⚠️ {error}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Student ID</label>
                    <input name="studentId" value={form.studentId} onChange={handleChange} disabled={!!editingId} className="input-field" placeholder="e.g. 22CSE001" />
                  </div>
                  <div>
                    <label className="label">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Full name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">DOB</label>
                    <input name="dob" type="date" value={form.dob} onChange={handleChange} className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Department</label>
                    <input name="department" value={form.department} onChange={handleChange} className="input-field" placeholder="e.g. CSE" />
                  </div>
                  <div>
                    <label className="label">Year</label>
                    <input name="year" value={form.year} onChange={handleChange} className="input-field" placeholder="e.g. 3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="email@sece.ac.in" />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="9876543210" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary flex-1 justify-center">
                    {editingId ? "💾 Save Changes" : "➕ Add Student"}
                  </button>
                  {editingId && (
                    <button type="button" onClick={cancelEdit} className="btn-outline">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Table */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      placeholder="Search by ID, name, department…"
                      className="input-field pl-10"
                    />
                  </div>
                  <span className="text-xs text-navy-400 font-medium whitespace-nowrap">{filtered.length} result(s)</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-navy-50/50">
                      {["ID", "Name", "Gender", "DOB", "Dept", "Year", "Email", "Phone", "Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-12 text-navy-400">No students found.</td>
                      </tr>
                    ) : filtered.map(s => (
                      <tr key={s.studentId} className="border-b border-gray-50 hover:bg-navy-50/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-navy-900">{s.studentId}</td>
                        <td className="px-4 py-3 text-sm text-navy-700">{s.name}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.gender}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.dob}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.department}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.year}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.email}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.phone}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(s)} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-semibold hover:bg-primary-100 transition-colors">Edit</button>
                            <button onClick={() => onDelete(s.studentId)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition-colors">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentManagement;