import React, { useRef, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
 * Reusable LineChart component with gradient area fill and smooth curves.
 *
 * @param {Object} props
 * @param {string[]} props.labels - X-axis labels (e.g. months).
 * @param {Array<{ label: string, data: number[], borderColor?: string, fill?: boolean }>} props.datasets - Chart.js dataset objects.
 * @param {string} [props.title] - Chart title displayed above the chart.
 * @param {number} [props.height=300] - Chart container height in pixels.
 * @param {boolean} [props.showLegend=true] - Whether to display the legend.
 * @param {boolean} [props.showPoints=true] - Whether to show data points on the line.
 * @param {string} [props.className] - Additional CSS classes for the wrapper.
 */
const LineChart = ({
  labels = [],
  datasets = [],
  title = '',
  height = 300,
  showLegend = true,
  showPoints = true,
  className = '',
}) => {
  const chartRef = useRef(null);

  const isDarkMode = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  const textColor = isDarkMode ? '#e2e8f0' : '#334155';
  const gridColor = isDarkMode ? 'rgba(148, 163, 184, 0.15)' : 'rgba(148, 163, 184, 0.25)';

  // Build base chart data (gradients applied in useEffect)
  const chartData = useMemo(() => {
    const enrichedDatasets = datasets.map((ds, index) => {
      const color = ds.borderColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      return {
        ...ds,
        borderColor: color,
        backgroundColor: `${color}20`, // fallback before gradient is applied
        fill: ds.fill !== undefined ? ds.fill : true,
        tension: ds.tension ?? 0.4,
        borderWidth: ds.borderWidth ?? 2.5,
        pointRadius: showPoints ? 4 : 0,
        pointHoverRadius: showPoints ? 6 : 4,
        pointBackgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        pointBorderColor: color,
        pointBorderWidth: 2,
        pointHitRadius: 20,
      };
    });
    return { labels, datasets: enrichedDatasets };
  }, [labels, datasets, isDarkMode, showPoints]);

  // Apply canvas gradients after chart renders
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;

    chart.data.datasets.forEach((ds, index) => {
      const color = ds.borderColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient.addColorStop(0, `${color}40`);
      gradient.addColorStop(0.6, `${color}15`);
      gradient.addColorStop(1, `${color}00`);
      ds.backgroundColor = gradient;
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
            pointStyle: 'circle',
            padding: 16,
            font: { size: 12, family: "'Inter', sans-serif" },
          },
        },
        title: {
          display: false,
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
          grid: { display: false },
          ticks: {
            color: textColor,
            font: { size: 12, family: "'Inter', sans-serif" },
          },
          border: { color: gridColor },
        },
        y: {
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
        duration: 1000,
        easing: 'easeOutQuart',
      },
    }),
    [isDarkMode, textColor, gridColor, showLegend, datasets.length]
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {title && (
        <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
      )}
      <div style={{ height }}>
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </motion.div>
  );
};

export default LineChart;
