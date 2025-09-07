import React from 'react';

export const EstablishmentCardSkeleton = () => {
  return (
    <div className="p-5 bg-slate-800/70 border border-slate-700 rounded-lg shadow-lg shadow-black/20 animate-pulse">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-6 w-6 bg-slate-700 rounded-md"></div>
        <div className="h-3 w-20 bg-slate-700 rounded-full"></div>
      </div>
      <div className="h-5 w-3/4 bg-slate-700 rounded-full mb-3"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-700 rounded-full"></div>
        <div className="h-3 w-5/6 bg-slate-700 rounded-full"></div>
      </div>
      <div className="h-2.5 w-1/2 bg-slate-700 rounded-full mt-4"></div>
    </div>
  );
};
