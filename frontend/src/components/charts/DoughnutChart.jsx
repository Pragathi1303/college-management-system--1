import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

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
 * Reusable DoughnutChart component with center text overlay.
 *
 * @param {Object} props
 * @param {string[]} props.labels - Segment labels.
 * @param {number[]} props.data - Values for each segment.
 * @param {string[]} [props.colors] - Custom color palette. Falls back to DEFAULT_COLORS.
 * @param {string} [props.title] - Chart title displayed above the chart.
 * @param {string|number} [props.centerText] - Text displayed at the center of the doughnut.
 * @param {string} [props.centerSubText] - Smaller subtitle below the center text.
 * @param {number} [props.height=280] - Chart container height in pixels.
 * @param {number} [props.cutout=70] - Cutout percentage (controls hole size).
 * @param {boolean} [props.showLegend=true] - Whether to display the legend.
 * @param {string} [props.className] - Additional CSS classes for the wrapper.
 */
const DoughnutChart = ({
  labels = [],
  data = [],
  colors,
  title = '',
  centerText = '',
  centerSubText = '',
  height = 280,
  cutout = 70,
  showLegend = true,
  className = '',
}) => {
  const isDarkMode = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, []);

  const textColor = isDarkMode ? '#e2e8f0' : '#334155';
  const palette = colors && colors.length ? colors : DEFAULT_COLORS;

  const chartData = useMemo(() => {
    const segmentColors = labels.map((_, i) => palette[i % palette.length]);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: segmentColors,
          borderColor: isDarkMode ? '#1e293b' : '#ffffff',
          borderWidth: 3,
          hoverBorderColor: isDarkMode ? '#334155' : '#f8fafc',
          hoverOffset: 6,
        },
      ],
    };
  }, [labels, data, palette, isDarkMode]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: `${cutout}%`,
      plugins: {
        legend: {
          display: showLegend,
          position: 'bottom',
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
          callbacks: {
            label: (context) => {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.parsed;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return ` ${context.label}: ${value.toLocaleString()} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1000,
        easing: 'easeOutQuart',
      },
    }),
    [isDarkMode, textColor, cutout, showLegend]
  );

  if (!labels.length || !data.length) {
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {title && (
        <h3 className="mb-3 text-base font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
      )}
      <div className="relative" style={{ height }}>
        <Doughnut data={chartData} options={options} />

        {/* Center text overlay */}
        {centerText && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-bold text-slate-800 dark:text-slate-100"
              style={{ marginTop: showLegend ? '-2rem' : 0 }}
            >
              {centerText}
            </span>
            {centerSubText && (
              <span
                className="mt-0.5 text-xs font-medium text-slate-400 dark:text-slate-500"
                style={{ marginTop: showLegend ? undefined : '0.125rem' }}
              >
                {centerSubText}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DoughnutChart;
