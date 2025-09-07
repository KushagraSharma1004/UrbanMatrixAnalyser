import React from 'react';

export const Loader = () => (
  <>
    <div className="w-24 h-24 relative">
      <div className="absolute inset-0 border-2 border-sky-500/30 rounded-full"></div>
      <div className="absolute inset-2 border-2 border-sky-500/40 rounded-full animate-spin-slow"></div>
      <div className="absolute inset-4 border-2 border-sky-500/60 rounded-full animate-ping"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-sky-400 rounded-full shadow-[0_0_10px_#0ea5e9]"></div>
      </div>
    </div>
    <style>{`
      @keyframes spin-slow {
        from { transform: rotate(0deg); }
        to { transform: rotate(-360deg); }
      }
      .animate-spin-slow {
        animation: spin-slow 3s linear infinite;
      }
    `}</style>
  </>
);
