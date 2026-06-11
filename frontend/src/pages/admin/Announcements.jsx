import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import announcementService from '../../services/announcementService';
import { toast } from 'react-hot-toast';

const Announcements = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium' });
  const [deleteId, setDeleteId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try { const { data } = await announcementService.getAll({ page, limit: 10, search }); setData(data.announcements); setPagination(data.pagination); } catch (err) { toast.error('Failed to fetch'); }
    finally { setLoading(false); }
  }, [page, search]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await announcementService.update(editing, form); toast.success('Announcement updated'); }
      else { await announcementService.create(form); toast.success('Announcement created'); }
      setShowModal(false); setEditing(null); setForm({ title: '', description: '', priority: 'Medium' }); fetch();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const priorityColors = { High: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', Low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };

  return (
    <AdminLayout title="Announcements">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search announcements..." className="w-full sm:w-72" />
          <button onClick={() => { setForm({ title: '', description: '', priority: 'Medium' }); setEditing(null); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">+ New Announcement</button>
        </div>
        {loading ? <Loader /> : (
          <div className="space-y-4">
            {data.length === 0 ? <p className="text-center py-8 text-gray-500">No announcements</p> :
              data.map((a) => (
                <div key={a._id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{a.title}</h4>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${priorityColors[a.priority]}`}>{a.priority}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{a.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{new Date(a.createdAt).toLocaleDateString()} {a.createdBy?.name ? `by ${a.createdBy.name}` : ''}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => { setForm({ title: a.title, description: a.description, priority: a.priority }); setEditing(a._id); setShowModal(true); }} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button onClick={() => setDeleteId(a._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            <Pagination pagination={pagination} onPageChange={setPage} />
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label><input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label><select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"><option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option></select></div>
                <div className="flex justify-end gap-3"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-700 bg-gray-100 dark:bg-gray-700 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg">{editing ? 'Update' : 'Post'}</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await announcementService.delete(deleteId); toast.success('Announcement deleted'); setDeleteId(null); fetch(); }} />
    </AdminLayout>
  );
};

export default Announcements;