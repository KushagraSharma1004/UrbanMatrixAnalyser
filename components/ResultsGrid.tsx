import React from 'react';
import { EstablishmentCard } from './EstablishmentCard';
import { EstablishmentCardSkeleton } from './EstablishmentCardSkeleton';

export const ResultsGrid = ({ establishments, isLoading, error, onCardClick, hasSearched, searchTerm }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <EstablishmentCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-red-900/20 border border-red-500/50 rounded-lg text-center p-4">
        <div>
          <h3 className="text-2xl font-bold text-red-400">Analysis Failed</h3>
          <p className="text-red-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (establishments.length === 0) {
    if (!hasSearched) {
      return (
        <div className="flex items-center justify-center h-96 bg-slate-800/50 border border-sky-500/20 rounded-lg text-center p-4">
          <div>
            <h3 className="text-2xl font-bold text-sky-300">Matrix is standing by</h3>
            <p className="text-slate-400 mt-2">Select an area and categories, then run an analysis.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-96 bg-slate-800/50 border border-sky-500/20 rounded-lg text-center p-4">
        <div>
          <h3 className="text-2xl font-bold text-sky-300">No matching results</h3>
          <p className="text-slate-400 mt-2">
            Try adjusting your search term "{searchTerm}" or changing filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
      {establishments.map((est, index) => (
        <EstablishmentCard key={`${est.name}-${index}`} establishment={est} onClick={onCardClick} />
      ))}
    </div>
  );
};

// Add fade-in animation to tailwind config or global style if needed
// For simplicity, defining it here. In a real app, this would be in a CSS file or tailwind.config.js
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
