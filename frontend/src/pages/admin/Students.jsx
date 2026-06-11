import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import studentService from '../../services/studentService';
import { Toaster, toast } from 'react-hot-toast';

const initialForm = { studentId: '', name: '', gender: 'Male', dob: '', department: '', year: '1', email: '', phone: '' };

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [deleteId, setDeleteId] = useState(null);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, search, department, year };
      const { data } = await studentService.getAll(params);
      setStudents(data.students);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  }, [page, search, department, year]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await studentService.update(editing, form);
        toast.success('Student updated successfully');
      } else {
        await studentService.create(form);
        toast.success('Student created successfully');
      }
      setShowModal(false);
      setEditing(null);
      setForm(initialForm);
      fetchStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (student) => {
    setForm({ studentId: student.studentId, name: student.name, gender: student.gender, dob: student.dob, department: student.department, year: student.year, email: student.email, phone: student.phone });
    setEditing(student._id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await studentService.delete(deleteId);
      toast.success('Student deleted successfully');
      setDeleteId(null);
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const openCreate = () => {
    setForm(initialForm);
    setEditing(null);
    setShowModal(true);
  };

  return (
    <AdminLayout title="Student Management">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name, ID or email..." className="w-full sm:w-72" />
          <div className="flex gap-3 w-full sm:w-auto">
            <select value={department} onChange={(e) => { setDepartment(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option value="">All Depts</option>
              {['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={year} onChange={(e) => { setYear(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option value="">All Years</option>
              {['1', '2', '3', '4'].map((y) => <option key={y} value={y}>Year {y}</option>)}
            </select>
            <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">+ Add Student</button>
          </div>
        </div>

        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Dept</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Year</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Phone</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-8 text-gray-500">No students found</td></tr>
                ) : students.map((s) => (
                  <tr key={s._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-3 px-2 text-gray-900 dark:text-white">{s.studentId}</td>
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{s.department}</td>
                    <td className="py-3 px-2"><span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Year {s.year}</span></td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{s.email}</td>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{s.phone}</td>
                    <td className="py-3 px-2 text-right">
                      <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 mr-3 text-sm">Edit</button>
                      <button onClick={() => setDeleteId(s._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing ? 'Edit Student' : 'Add Student'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student ID</label><input type="text" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label><select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"><option>Male</option><option>Female</option><option>Other</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DOB</label><input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label><input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label><select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} title="Delete Student?" message="This will permanently delete this student." />
    </AdminLayout>
  );
};

export default Students;