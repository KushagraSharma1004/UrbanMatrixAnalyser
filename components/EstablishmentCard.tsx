import React from 'react';
import { HospitalIcon, SchoolIcon, ShopIcon, ParkIcon, BankIcon, RestaurantIcon } from './icons/CategoryIcons';
import { CATEGORY_MAP } from '../constants';

const categoryIcons = {
  'Hospital': <HospitalIcon />,
  'School': <SchoolIcon />,
  'Shop': <ShopIcon />,
  'Restaurant': <RestaurantIcon />,
  'Park': <ParkIcon />,
  'Bank': <BankIcon />,
};

export const EstablishmentCard = ({ establishment, onClick }) => {
  const categoryInfo = CATEGORY_MAP.get(establishment.category) || { color: '#64748b', label: 'Unknown' };
  const icon = categoryIcons[establishment.category] || <ShopIcon />;

  const glowStyle = {
    boxShadow: `0 0 15px -3px ${categoryInfo.color}30, 0 0 5px -2px ${categoryInfo.color}50`
  };

  return (
    <div 
      className="relative p-5 bg-slate-800/50 backdrop-blur-sm border rounded-lg shadow-lg shadow-black/20 transition-all duration-300 hover:scale-[1.03] overflow-hidden cursor-pointer group"
      style={{ borderColor: categoryInfo.color }}
      onClick={() => onClick(establishment)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(establishment)}
    >
      <div className="absolute top-0 right-0 h-16 w-16 text-slate-700/50 transition-transform duration-300 group-hover:scale-110 group-hover:text-slate-600/50">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-3">
          <div style={{ color: categoryInfo.color }}>
            {icon}
          </div>
          <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: categoryInfo.color }}>{establishment.category}</p>
        </div>
        <h3 className="text-xl font-bold text-slate-100 truncate">{establishment.name}</h3>
        <p className="text-slate-400 mt-2 text-sm min-h-[2.5rem]">{establishment.description}</p>
        <p className="text-slate-500 mt-3 text-xs font-mono">
          Coords: {establishment.latitude.toFixed(4)}, {establishment.longitude.toFixed(4)}
        </p>
      </div>
       <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={glowStyle}
      ></div>
    </div>
  );
};
