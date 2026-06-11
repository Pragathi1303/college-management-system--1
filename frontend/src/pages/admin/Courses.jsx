import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import courseService from '../../services/courseService';
import { toast } from 'react-hot-toast';

const initForm = { courseName: '', courseCode: '', credits: 3, semester: 1, department: '' };

const Courses = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initForm);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await courseService.getAll({ page, limit: 10, search });
      setData(data.courses);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await courseService.update(editing, form);
        toast.success('Course updated');
      } else {
        await courseService.create(form);
        toast.success('Course created');
      }
      setShowModal(false);
      setEditing(null);
      setForm(initForm);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <AdminLayout title="Course Management">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search courses..." className="w-full sm:w-72" />
          <button onClick={() => { setForm(initForm); setEditing(null); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">+ Add Course</button>
        </div>
        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Code</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-500">Credits</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-500">Semester</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Dept</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No courses</td></tr>
                ) : (
                  data.map((c) => (
                    <tr key={c._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-2 font-mono text-gray-900 dark:text-white">{c.courseCode}</td>
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{c.courseName}</td>
                      <td className="py-3 px-2 text-center text-gray-600">{c.credits}</td>
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Sem {c.semester}</span>
                      </td>
                      <td className="py-3 px-2 text-gray-600">{c.department}</td>
                      <td className="py-3 px-2 text-right">
                        <button onClick={() => { setForm({ courseName: c.courseName, courseCode: c.courseCode, credits: c.credits, semester: c.semester, department: c.department }); setEditing(c._id); setShowModal(true); }} className="text-blue-600 hover:text-blue-800 mr-3 text-sm">Edit</button>
                        <button onClick={() => setDeleteId(c._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing ? 'Edit Course' : 'Add Course'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
                    <input type="text" value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name</label>
                    <input type="text" value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credits</label>
                    <input type="number" min="1" max="10" value={form.credits} onChange={(e) => setForm({ ...form, credits: parseInt(e.target.value) })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                    <input type="number" min="1" max="8" value={form.semester} onChange={(e) => setForm({ ...form, semester: parseInt(e.target.value) })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 rounded-lg">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">{editing ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await courseService.delete(deleteId); toast.success('Course deleted'); setDeleteId(null); fetch(); }} />
    </AdminLayout>
  );
};

export default Courses;