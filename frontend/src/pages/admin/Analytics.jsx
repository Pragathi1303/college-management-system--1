import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader from '../../components/common/Loader';
import analyticsService from '../../services/analyticsService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const isDark = () => document.documentElement.classList.contains('dark');

const getGridColor = () => (isDark() ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)');
const getTextColor = () => (isDark() ? '#9ca3af' : '#6b7280');

// Animated counter hook
const useCountUp = (end, duration = 1200) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof end !== 'number' || end === 0) { setCount(end || 0); return; }
    let start = 0;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(start + (end - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    };
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);

  return count;
};

const SummaryCard = ({ label, value, color, icon, delay = 0 }) => {
  const animatedValue = useCountUp(value);
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ backgroundColor: color + '20' }}>
          <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? animatedValue.toLocaleString() : value}</p>
    </motion.div>
  );
};

const ChartCard = ({ children, title, subtitle, delay = 0, className = '' }) => (
  <motion.div
    variants={fadeUp}
    initial="initial"
    animate="animate"
    transition={{ duration: 0.6, delay }}
    className={`bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
  >
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {children}
  </motion.div>
);

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await analyticsService.getData();
        setData(res.data.analytics);
      } catch (err) {
        console.error('Analytics fetch error:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <AdminLayout title="Analytics"><Loader /></AdminLayout>;
  if (error) return (
    <AdminLayout title="Analytics">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">Retry</button>
        </div>
      </div>
    </AdminLayout>
  );

  // Prepare chart data
  const studentLabels = data?.studentsPerDept?.map(d => d.label) || [];
  const studentValues = data?.studentsPerDept?.map(d => d.value) || [];
  const facultyLabels = data?.facultyPerDept?.map(d => d.label) || [];
  const facultyValues = data?.facultyPerDept?.map(d => d.value) || [];
  const feeMonths = data?.monthlyFees?.map(m => m.month) || [];
  const feeCollected = data?.monthlyFees?.map(m => m.collected) || [];
  const feePending = data?.monthlyFees?.map(m => m.pending) || [];

  const totalStudents = studentValues.reduce((a, b) => a + b, 0);
  const totalFaculty = facultyValues.reduce((a, b) => a + b, 0);
  const totalFeeCollected = feeCollected.reduce((a, b) => a + b, 0);
  const totalFeePending = feePending.reduce((a, b) => a + b, 0);

  // Students per Dept Bar Chart
  const studentsBarData = {
    labels: studentLabels,
    datasets: [{
      label: 'Students',
      data: studentValues,
      backgroundColor: studentLabels.map((_, i) => COLORS[i % COLORS.length] + 'CC'),
      borderColor: studentLabels.map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 1.5,
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  // Faculty Doughnut
  const facultyDoughnutData = {
    labels: facultyLabels,
    datasets: [{
      data: facultyValues,
      backgroundColor: facultyLabels.map((_, i) => COLORS[i % COLORS.length]),
      borderWidth: 0,
      hoverOffset: 8,
    }],
  };

  // Attendance Doughnut
  const attendanceDoughnutData = {
    labels: ['Present', 'Absent'],
    datasets: [{
      data: [data?.attendance?.present || 0, data?.attendance?.absent || 0],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  };

  // Monthly Fees Line Chart
  const feesLineData = {
    labels: feeMonths,
    datasets: [
      {
        label: 'Collected',
        data: feeCollected,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointBorderWidth: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Pending',
        data: feePending,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ef4444',
        pointBorderWidth: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark() ? '#1f2937' : '#fff',
        titleColor: isDark() ? '#fff' : '#111827',
        bodyColor: isDark() ? '#d1d5db' : '#4b5563',
        borderColor: isDark() ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: getTextColor(), font: { size: 12 } } },
      y: { grid: { color: getGridColor() }, ticks: { color: getTextColor(), font: { size: 12 } }, border: { display: false } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: getTextColor(), padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: isDark() ? '#1f2937' : '#fff',
        titleColor: isDark() ? '#fff' : '#111827',
        bodyColor: isDark() ? '#d1d5db' : '#4b5563',
        borderColor: isDark() ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { color: getTextColor(), padding: 16, usePointStyle: true, pointStyleWidth: 10, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: isDark() ? '#1f2937' : '#fff',
        titleColor: isDark() ? '#fff' : '#111827',
        bodyColor: isDark() ? '#d1d5db' : '#4b5563',
        borderColor: isDark() ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ₹${ctx.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: getTextColor(), font: { size: 12 } } },
      y: {
        grid: { color: getGridColor() },
        ticks: { color: getTextColor(), font: { size: 12 }, callback: (v) => `₹${(v / 1000).toFixed(0)}k` },
        border: { display: false },
      },
    },
  };

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Students" value={totalStudents} color="#6366f1" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" delay={0} />
          <SummaryCard label="Total Faculty" value={totalFaculty} color="#8b5cf6" icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" delay={0.1} />
          <SummaryCard label="Attendance Rate" value={data?.attendance?.percentage || 0} color="#22c55e" icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" delay={0.2} />
          <SummaryCard label="Fee Collected" value={totalFeeCollected} color="#f97316" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" delay={0.3} />
        </div>

        {/* Row 1: Students Bar + Faculty Doughnut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Students Per Department" subtitle="Distribution across departments" delay={0.2} className="lg:col-span-2">
            <div className="h-72">
              {studentLabels.length > 0 ? (
                <Bar data={studentsBarData} options={barOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No student data available</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Faculty Distribution" subtitle="Department-wise breakdown" delay={0.3}>
            <div className="h-72 relative">
              {facultyLabels.length > 0 ? (
                <>
                  <Doughnut data={facultyDoughnutData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: '40px' }}>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{totalFaculty}</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No faculty data available</div>
              )}
            </div>
          </ChartCard>
        </div>

        {/* Row 2: Attendance Doughnut + Monthly Fee Line */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard title="Attendance Overview" subtitle={`${data?.attendance?.percentage || 0}% overall attendance rate`} delay={0.4}>
            <div className="h-72 relative">
              {data?.attendance ? (
                <>
                  <Doughnut data={attendanceDoughnutData} options={doughnutOptions} />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: '40px' }}>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">{data.attendance.percentage}%</span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No attendance data</div>
              )}
            </div>
          </ChartCard>

          <ChartCard title="Monthly Fee Collection" subtitle="Revenue collection vs pending" delay={0.5} className="lg:col-span-2">
            <div className="h-72">
              {feeMonths.length > 0 ? (
                <Line data={feesLineData} options={lineOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">No fee data available</div>
              )}
            </div>
          </ChartCard>
        </div>

        {/* Row 3: Department Statistics Table */}
        <ChartCard title="Department Statistics" subtitle="Comprehensive department overview" delay={0.6}>
          {data?.departmentStats?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Students</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Faculty</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-600 dark:text-gray-400">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.departmentStats.map((d, i) => {
                    const ratio = d.totalFaculty > 0 ? Math.round(d.totalStudents / d.totalFaculty) : '-';
                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                            <span className="font-medium text-gray-900 dark:text-white">{d.departmentName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {d.totalStudents}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                            {d.totalFaculty}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-400 font-medium">
                          {ratio !== '-' ? `${ratio}:1` : ratio}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No department statistics available</p>
          )}
        </ChartCard>

        {/* Fee Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20"
          >
            <p className="text-emerald-100 text-sm font-medium">Total Collected</p>
            <p className="text-2xl font-bold mt-1">₹{totalFeeCollected.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg shadow-red-500/20"
          >
            <p className="text-red-100 text-sm font-medium">Total Pending</p>
            <p className="text-2xl font-bold mt-1">₹{totalFeePending.toLocaleString()}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20"
          >
            <p className="text-blue-100 text-sm font-medium">Collection Rate</p>
            <p className="text-2xl font-bold mt-1">
              {totalFeeCollected + totalFeePending > 0
                ? `${Math.round((totalFeeCollected / (totalFeeCollected + totalFeePending)) * 100)}%`
                : '0%'}
            </p>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;