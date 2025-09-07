import React from 'react';

const IconWrapper = ({ children }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const HospitalIcon = () => (
  <IconWrapper>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 11h4"></path>
    <path d="M14 9v4"></path>
  </IconWrapper>
);

export const SchoolIcon = () => (
  <IconWrapper>
    <path d="m4 6 8-4 8 4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
    <path d="M18 5v17" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </IconWrapper>
);

export const ShopIcon = () => (
  <IconWrapper>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7H12v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7" />
  </IconWrapper>
);

export const RestaurantIcon = () => (
  <IconWrapper>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z" />
    <path d="M21 15v7" />
    <path d="M15 15h.01" />
  </IconWrapper>
);

export const ParkIcon = () => (
  <IconWrapper>
    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
    <path d="m12 13-2-2" />
    <path d="m14 15-2-2" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </IconWrapper>
);

export const BankIcon = () => (
  <IconWrapper>
    <path d="m3 21 18-0" />
    <path d="m5 18 0-10" />
    <path d="m9 18 0-10" />
    <path d="m13 18 0-10" />
    <path d="m17 18 0-10" />
    <path d="m3 7 9-4 9 4" />
  </IconWrapper>
);

export const ExportIcon = () => (
  <IconWrapper>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </IconWrapper>
);

export const LocateIcon = () => (
  <IconWrapper>
    <line x1="2" x2="5" y1="12" y2="12" />
    <line x1="19" x2="22" y1="12" y2="12" />
    <line x1="12" x2="12" y1="2" y2="5" />
    <line x1="12" x2="12" y1="19" y2="22" />
    <circle cx="12" cy="12" r="7" />
  </IconWrapper>
);
