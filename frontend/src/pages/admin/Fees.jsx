import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import feeService from '../../services/feeService';
import { toast } from 'react-hot-toast';

const Fees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await feeService.getAll({ page, limit: 10, search, status });
      setData(data.fees);
      setPagination(data.pagination);
    } catch (err) { toast.error('Failed to fetch'); }
    finally { setLoading(false); }
  }, [page, search, status]);

  useEffect(() => { fetch(); }, [fetch]);

  const statusColors = {
    Paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    Pending: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    Partial: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  return (
    <AdminLayout title="Fee Management">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name or register no..." className="w-full sm:w-72" />
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm">
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 dark:border-gray-700"><th className="text-left py-3 px-2 font-medium text-gray-500">Reg No</th><th className="text-left py-3 px-2 font-medium text-gray-500">Name</th><th className="text-left py-3 px-2 font-medium text-gray-500">Dept</th><th className="text-right py-3 px-2 font-medium text-gray-500">Total</th><th className="text-right py-3 px-2 font-medium text-gray-500">Paid</th><th className="text-right py-3 px-2 font-medium text-gray-500">Remaining</th><th className="text-center py-3 px-2 font-medium text-gray-500">Status</th><th className="text-right py-3 px-2 font-medium text-gray-500">Actions</th></tr></thead>
              <tbody>
                {data.length === 0 ? <tr><td colSpan={8} className="text-center py-8 text-gray-500">No fee records</td></tr> : data.map((f) => (
                  <tr key={f._id} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="py-3 px-2 text-gray-900 dark:text-white">{f.registerNumber}</td>
                    <td className="py-3 px-2 font-medium text-gray-900 dark:text-white">{f.studentName}</td>
                    <td className="py-3 px-2 text-gray-600">{f.department}</td>
                    <td className="py-3 px-2 text-right text-gray-900 dark:text-white">₹{f.totalFee?.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-green-600 font-medium">₹{f.paidAmount?.toLocaleString()}</td>
                    <td className="py-3 px-2 text-right text-red-600 font-medium">₹{f.remainingAmount?.toLocaleString()}</td>
                    <td className="py-3 px-2 text-center"><span className={`px-2 py-1 text-xs rounded-full font-medium ${statusColors[f.paymentStatus]}`}>{f.paymentStatus}</span></td>
                    <td className="py-3 px-2 text-right"><button onClick={() => setDeleteId(f._id)} className="text-red-600 hover:text-red-800 text-sm">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination pagination={pagination} onPageChange={setPage} />
      </div>
      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={async () => { await feeService.delete(deleteId); toast.success('Fee record deleted'); setDeleteId(null); fetch(); }} title="Delete Fee Record?" />
    </AdminLayout>
  );
};

export default Fees;