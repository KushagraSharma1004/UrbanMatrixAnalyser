import React, { useMemo } from 'react';
import { CATEGORIES, CATEGORY_MAP } from '../constants';
import { Establishment } from '../types';

interface AnalysisSummaryProps {
  establishments: Establishment[];
}

export const AnalysisSummary: React.FC<AnalysisSummaryProps> = ({ establishments }) => {
  const summary = useMemo(() => {
    const counts = new Map<string, number>();
    CATEGORIES.forEach(cat => counts.set(cat.id, 0));
    
    for (const est of establishments) {
      if (counts.has(est.category)) {
        counts.set(est.category, counts.get(est.category)! + 1);
      }
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({
        ...(CATEGORY_MAP.get(id) || {id, label: 'Unknown', color: '#64748b'}),
        count,
      }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [establishments]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-sky-500/20 rounded-lg p-4 w-full md:w-auto flex-shrink">
      <h3 className="text-base font-bold text-sky-300 mb-2">Analysis Summary</h3>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <div className="text-white font-semibold">Total: {establishments.length}</div>
        {summary.map(item => (
          <div key={item.id} className="flex items-center gap-1.5 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-slate-300">{item.label}:</span>
            <span className="font-semibold text-white">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
