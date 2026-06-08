import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-hot-toast";

const EMPTY = { staffId: "", name: "", department: "", designation: "", email: "", phone: "" };

function StaffManagement() {
  const { user } = useAuth();
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staff;
    return staff.filter(s => `${s.staffId} ${s.name} ${s.department} ${s.designation}`.toLowerCase().includes(q));
  }, [staff, query]);

  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/staff");
      if (res.data.success) {
        setStaff(res.data.data);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch staff");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  function handleChange(e) { setError(""); setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); }

  function validate() {
    for (const k of ["staffId","name","department","designation","email","phone"]) {
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
        const res = await api.put(`/staff/${editingId}`, form);
        if (res.data.success) {
          toast.success("Staff updated successfully");
          fetchStaff();
        }
      } else {
        const res = await api.post("/staff", form);
        if (res.data.success) {
          toast.success("Staff added successfully");
          fetchStaff();
        }
      }
      setEditingId(null);
      setForm(EMPTY);
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
      toast.error(err.response?.data?.message || "Operation failed");
    }
  }

  function startEdit(s) { setEditingId(s.staffId); setForm({ ...s }); setError(""); }
  function cancelEdit() { setEditingId(null); setForm(EMPTY); setError(""); }

  async function onDelete(sid) {
    if (!window.confirm("Delete this staff member?")) return;
    try {
      const res = await api.delete(`/staff/${sid}`);
      if (res.data.success) {
        toast.success("Staff deleted successfully");
        fetchStaff();
        if (editingId === sid) cancelEdit();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete staff");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar username={user?.name || "Admin"} />
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="mb-8">
          <div className="badge-primary mb-3">👩🏫 Staff Management</div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900">Staff</h1>
          <p className="text-navy-500 mt-1">Add, edit, delete and search staff members.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <h3 className="font-bold text-navy-900 mb-1">{editingId ? "Edit Staff" : "Add Staff"}</h3>
              <p className="text-navy-500 text-sm mb-4">Provide complete staff details.</p>
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium mb-4">
                  ⚠️ {error}
                </div>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Staff ID</label>
                    <input name="staffId" value={form.staffId} onChange={handleChange} disabled={!!editingId} className="input-field" placeholder="e.g. FAC001" />
                  </div>
                  <div>
                    <label className="label">Name</label>
                    <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Full name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Department</label>
                    <input name="department" value={form.department} onChange={handleChange} className="input-field" placeholder="e.g. CSE" />
                  </div>
                  <div>
                    <label className="label">Designation</label>
                    <input name="designation" value={form.designation} onChange={handleChange} className="input-field" placeholder="e.g. Professor" />
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
                    {editingId ? "💾 Save Changes" : "➕ Add Staff"}
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
                    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by ID, name, department…" className="input-field pl-10" />
                  </div>
                  <span className="text-xs text-navy-400 font-medium whitespace-nowrap">{filtered.length} result(s)</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-navy-50/50">
                      {["ID", "Name", "Department", "Designation", "Email", "Phone", "Actions"].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-navy-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-navy-400">No staff found.</td>
                      </tr>
                    ) : filtered.map(s => (
                      <tr key={s.staffId} className="border-b border-gray-50 hover:bg-navy-50/30 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-navy-900">{s.staffId}</td>
                        <td className="px-4 py-3 text-sm text-navy-700">{s.name}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.department}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.designation}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.email}</td>
                        <td className="px-4 py-3 text-sm text-navy-600">{s.phone}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(s)} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-semibold hover:bg-primary-100">Edit</button>
                            <button onClick={() => onDelete(s.staffId)} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100">Delete</button>
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

export default StaffManagement;