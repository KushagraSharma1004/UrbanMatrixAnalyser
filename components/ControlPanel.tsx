import React from 'react';
import { CATEGORIES } from '../constants';

export const ControlPanel = ({
  isAreaSelected,
  selectedCategories,
  setSelectedCategories,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,
  onAnalyze,
  isLoading,
  showHeatmap,
  setShowHeatmap,
  hasResults,
}) => {
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(
      selectedCategories.includes(categoryId)
        ? selectedCategories.filter(c => c !== categoryId)
        : [...selectedCategories, categoryId]
    );
  };

  const handleSortChange = (field) => {
    if (sortOption.field === field) {
      setSortOption({ field, order: sortOption.order === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortOption({ field, order: 'asc' });
    }
  };

  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-sky-500/20 rounded-lg shadow-2xl shadow-sky-900/20 space-y-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-sky-300">Analysis Controls</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-sky-300">Target Area</label>
        <div className="w-full bg-slate-900/80 border border-slate-600 rounded-md py-3 px-3 text-slate-400 text-center">
          {isAreaSelected ? (
            <span className="text-green-400 font-medium">Area Selected</span>
          ) : (
            <span>Draw a fence on the map</span>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="block text-sm font-medium text-sky-300">Establishment Categories</label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map(category => (
            <label key={category.id} className="flex items-center space-x-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="form-checkbox h-4 w-4 bg-slate-700 border-slate-500 text-sky-500 rounded focus:ring-sky-500 focus:ring-offset-slate-800"
              />
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={onAnalyze}
        disabled={isLoading || !isAreaSelected || selectedCategories.length === 0}
        className="w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-bold py-3 px-4 rounded-lg hover:from-sky-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-sky-500/20 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing Matrix...
          </>
        ) : (
          'Analyze Matrix'
        )}
      </button>

      <div className="flex-grow"></div>
      
      {hasResults && (
      <>
        <div className="border-t border-slate-700"></div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-sky-300">View Options</h3>
          
          <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-lg border border-slate-600">
             <label htmlFor="heatmap-toggle" className="text-sm font-medium text-slate-300">
               Heatmap View
             </label>
             <button
               id="heatmap-toggle"
               onClick={() => setShowHeatmap(!showHeatmap)}
               className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                 showHeatmap ? 'bg-sky-500' : 'bg-slate-700'
               }`}
               role="switch"
               aria-checked={showHeatmap}
             >
               <span
                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                   showHeatmap ? 'translate-x-6' : 'translate-x-1'
                 }`}
               />
             </button>
           </div>
           
          <div className="space-y-2">
            <label htmlFor="search" className="block text-sm font-medium text-sky-300">Filter Results</label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-slate-900/80 border border-slate-600 rounded-md py-2 px-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-sky-300">Sort By</label>
            <div className="flex space-x-2">
              <button onClick={() => handleSortChange('name')} className={`flex-1 text-sm py-2 rounded-md transition-colors ${sortOption.field === 'name' ? 'bg-sky-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                Name {sortOption.field === 'name' && (sortOption.order === 'asc' ? '↑' : '↓')}
              </button>
              <button onClick={() => handleSortChange('category')} className={`flex-1 text-sm py-2 rounded-md transition-colors ${sortOption.field === 'category' ? 'bg-sky-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                Category {sortOption.field === 'category' && (sortOption.order === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  );
};