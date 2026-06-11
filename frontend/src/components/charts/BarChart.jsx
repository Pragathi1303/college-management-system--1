import React, { useRef, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DEFAULT_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#ec4899',
  '#f43f5e',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
];

/**
 * Reusable BarChart component with gradient fills and dark mode support.
 *
 * @param {Object} props
 * @param {string[]} props.labels - Category labels for the x-axis.
 * @param {Array<{ label: string, data: number[], backgroundColor?: string | string[], borderColor?: string | string[], borderWidth?: number }>} props.datasets - Chart.js dataset objects.
 * @param {string} [props.title] - Chart title displayed above the chart.
 * @param {number} [props.height=300] - Chart container height in pixels.
 * @param {boolean} [props.showLegend=true] - Whether to display the legend.
 * @param {boolean} [props.stacked=false] - Whether bars should be stacked.
 * @param {string} [props.className] - Additional CSS classes for the wrapper.
 */
const BarChart = ({
  labels = [],
  datasets = [],
  title = '',
  height = 300,
  showLegend = true,
  stacked = false,
  className = '',
}) => {
  const chartRef = useRef(null);

  const isDarkMode = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  const textColor = isDarkMode ? '#e2e8f0' : '#334155';
  const gridColor = isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.25)';

  // Build datasets with gradient fills
  const chartData = useMemo(() => {
    const enrichedDatasets = datasets.map((ds, index) => {
      const baseColor = ds.backgroundColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      return {
        ...ds,
        backgroundColor: Array.isArray(baseColor)
          ? baseColor
          : baseColor,
        borderColor: ds.borderColor || baseColor,
        borderWidth: ds.borderWidth ?? 0,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 50,
      };
    });
    return { labels, datasets: enrichedDatasets };
  }, [labels, datasets]);

  // Apply canvas gradients after chart mounts
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;

    chart.data.datasets.forEach((ds, index) => {
      const color = DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, `${color}99`);
      gradient.addColorStop(1, `${color}dd`);

      if (!Array.isArray(datasets[index]?.backgroundColor)) {
        ds.backgroundColor = gradient;
      }
    });

    chart.update('none');
  }, [datasets]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: showLegend && datasets.length > 1,
          position: 'top',
          align: 'end',
          labels: {
            color: textColor,
            usePointStyle: true,
            pointStyle: 'rectRounded',
            padding: 16,
            font: { size: 12, family: "'Inter', sans-serif" },
          },
        },
        title: {
          display: false, // We render our own title via JSX
        },
        tooltip: {
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          titleColor: isDarkMode ? '#f1f5f9' : '#0f172a',
          bodyColor: isDarkMode ? '#cbd5e1' : '#475569',
          borderColor: isDarkMode ? '#334155' : '#e2e8f0',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
          titleFont: { size: 13, weight: '600', family: "'Inter', sans-serif" },
          bodyFont: { size: 12, family: "'Inter', sans-serif" },
        },
      },
      scales: {
        x: {
          stacked,
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { size: 12, family: "'Inter', sans-serif" },
          },
          border: { color: gridColor },
        },
        y: {
          stacked,
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 12, family: "'Inter', sans-serif" },
            padding: 8,
          },
          border: { display: false },
        },
      },
      animation: {
        duration: 800,
        easing: 'easeOutQuart',
      },
    }),
    [isDarkMode, textColor, gridColor, showLegend, stacked, datasets.length]
  );

  if (!labels.length || !datasets.length) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 ${className}`}
        style={{ height }}
      >
        <p className="text-sm text-slate-400 dark:text-slate-500">No data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {title && (
        <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default BarChart;
