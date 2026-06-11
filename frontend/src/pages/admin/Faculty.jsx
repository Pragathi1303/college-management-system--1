import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import facultyService from '../../services/facultyService';
import { toast } from 'react-hot-toast';

const initForm = { staffId: '', name: '', department: '', designation: '', email: '', phone: '' };

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(initForm);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await facultyService.getAll({ page, limit: 10, search, department: deptFilter });
      setFaculty(data.faculty);
      setPagination(data.pagination);
    } catch (err) { toast.error('Failed to fetch faculty'); }
    finally { setLoading(false); }
  }, [page, search, deptFilter]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await facultyService.update(editing, form); toast.success('Faculty updated'); }
      else { await facultyService.create(form); toast.success('Faculty added'); }
      setShowModal(false); setEditing(null); setForm(initForm); fetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleEdit = (f) => {
    setForm({ staffId: f.staffId, name: f.name, department: f.department, designation: f.designation, email: f.email, phone: f.phone });
    setEditing(f._id); setShowModal(true);
  };

  return (
    <AdminLayout title="Faculty Management">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search faculty..." className="w-full sm:w-72" />
          <div className="flex gap-3">
            <select value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option value="">All Depts</option>
              {['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <button onClick={() => { setForm(initForm); setEditing(null); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">+ Add Faculty</button>
          </div>
        </div>

        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">ID</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Dept</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Designation</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Phone</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faculty.length === 0 ? <tr><td colSpan={7} className="text-center py-8 text-gray-500">No faculty found</td></tr> :
                  faculty.map((f) => (
                    <tr key={f._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{f.staffId}</td>
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{f.name}</td>
                      <td className="py-3 px-2 text-gray-600">{f.department}</td>
                      <td className="py-3 px-2 text-gray-600">{f.designation}</td>
                      <td className="py-3 px-2 text-gray-600">{f.email}</td>
                      <td className="py-3 px-2 text-gray-600">{f.phone}</td>
                      <td className="py-3 px-2 text-right">
                        <button onClick={() => handleEdit(f)} className="text-blue-600 hover:text-blue-800 mr-3 text-sm">Edit</button>
                        <button onClick={() => setDeleteId(f._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing ? 'Edit Faculty' : 'Add Faculty'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faculty ID</label><input type="text" value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label><input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label><input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label><input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await facultyService.delete(deleteId); toast.success('Faculty deleted'); setDeleteId(null); fetch(); }} title="Delete Faculty?" />
    </AdminLayout>
  );
};

export default Faculty;