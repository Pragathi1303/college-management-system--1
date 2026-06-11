import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import attendanceService from '../../services/attendanceService';
import { toast } from 'react-hot-toast';

const Attendance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20, search, department: dept, date };
      const { data } = await attendanceService.getAll(params);
      setData(data.attendance);
      setPagination(data.pagination);
    } catch (err) { toast.error('Failed to fetch'); }
    finally { setLoading(false); }
  }, [page, search, dept, date]);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <AdminLayout title="Attendance Management">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search..." className="w-full sm:w-72" />
          <div className="flex gap-3">
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm" />
            <select value={dept} onChange={(e) => { setDept(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
              <option value="">All Depts</option>
              {['CSE','ECE','EEE','MECH','CIVIL','IT'].map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Reg No</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Dept</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-500">Date</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-500">Status</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-8 text-gray-500">No attendance records</td></tr>
                ) : (
                  data.map((a) => (
                    <tr key={a._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="py-3 px-2 text-gray-900 dark:text-white">{a.registerNumber}</td>
                      <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{a.studentName}</td>
                      <td className="py-3 px-2 text-gray-600">{a.department}</td>
                      <td className="py-3 px-2 text-gray-600">{new Date(a.date).toLocaleDateString()}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${a.status === 'Present' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{a.status}</span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button onClick={() => setDeleteId(a._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
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
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await attendanceService.delete(deleteId); toast.success('Deleted'); setDeleteId(null); fetch(); }} title="Delete?" />
    </AdminLayout>
  );
};

export default Attendance;