export const CATEGORIES = [
  { id: 'Hospital', label: 'Hospitals', color: '#f87171' }, // red-400
  { id: 'School', label: 'Schools', color: '#60a5fa' }, // blue-400
  { id: 'Shop', label: 'Shops', color: '#4ade80' }, // green-400
  { id: 'Restaurant', label: 'Restaurants', color: '#facc15' }, // yellow-400
  { id: 'Park', label: 'Parks', color: '#34d399' }, // emerald-400
  { id: 'Bank', label: 'Banks', color: '#818cf8' }, // indigo-400
];

export const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.id, c]));

export const AI_MODEL_NAME = 'gemini-2.5-flash';
