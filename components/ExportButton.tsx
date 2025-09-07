import React from 'react';
import { Establishment } from '../types';
import { ExportIcon } from './icons/CategoryIcons';

interface ExportButtonProps {
  data: Establishment[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = ['name', 'category', 'description', 'latitude', 'longitude'];
    const csvContent = [
      headers.join(','),
      ...data.map(row =>
        headers.map(header => `"${String(row[header]).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'urban_matrix_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={data.length === 0}
      className="flex-shrink-0 flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
      aria-label="Export data to CSV"
      title="Export data to CSV"
    >
      <ExportIcon />
      Export CSV
    </button>
  );
};
