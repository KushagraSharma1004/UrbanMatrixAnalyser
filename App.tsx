import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ResultsGrid } from './components/ResultsGrid';
import { MapSelector } from './components/MapSelector';
import { fetchEstablishments } from './services/geminiService';
import { CATEGORIES } from './constants';
import { AnalysisSummary } from './components/AnalysisSummary';
import { ExportButton } from './components/ExportButton';

const App = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(CATEGORIES.map(c => c.id));
  const [establishments, setEstablishments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ field: 'name', order: 'asc' });
  const [focusedEstablishment, setFocusedEstablishment] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    try {
      const savedCategories = localStorage.getItem('urban_matrix_categories');
      if (savedCategories) {
        setSelectedCategories(JSON.parse(savedCategories));
      }
      const savedSort = localStorage.getItem('urban_matrix_sort');
      if (savedSort) {
        setSortOption(JSON.parse(savedSort));
      }
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('urban_matrix_categories', JSON.stringify(selectedCategories));
  }, [selectedCategories]);

  useEffect(() => {
    localStorage.setItem('urban_matrix_sort', JSON.stringify(sortOption));
  }, [sortOption]);

  const handleSearch = useCallback(async () => {
    if (!selectedArea || selectedCategories.length === 0) {
      setError('Please select an area on the map and choose at least one category.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEstablishments([]);
    setFocusedEstablishment(null);
    setHasSearched(true);
    try {
      const results = await fetchEstablishments(selectedArea, selectedCategories);
      setEstablishments(results);
    } catch (err) {
      setError(err instanceof Error ? `Failed to fetch data: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedArea, selectedCategories]);

  const handleAreaSelect = useCallback((area) => {
    setSelectedArea(area);
    setFocusedEstablishment(null);
  }, []);
  
  const handleCardClick = useCallback((establishment) => {
    setFocusedEstablishment(establishment);
  }, []);

  const displayedEstablishments = useMemo(() => {
    return establishments
      .filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const field = sortOption.field;
        const order = sortOption.order;

        if (a[field] < b[field]) {
          return order === 'asc' ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [establishments, searchTerm, sortOption]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans animated-grid-background">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
      <div className="relative container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 drop-shadow-[0_0_15px_rgba(72,187,255,0.5)]">
            Urban Matrix Analyzer
          </h1>
          <p className="text-slate-400 mt-2 text-lg">AI-Powered Geospatial Intelligence</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8">
            <MapSelector
              onAreaSelect={handleAreaSelect}
              focusedEstablishment={focusedEstablishment}
              establishments={establishments}
              showHeatmap={showHeatmap}
              onMarkerClick={handleCardClick}
            />
          </section>
          <aside className="lg:col-span-4">
            <ControlPanel
              isAreaSelected={!!selectedArea}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onAnalyze={handleSearch}
              isLoading={isLoading}
              showHeatmap={showHeatmap}
              setShowHeatmap={setShowHeatmap}
              hasResults={establishments.length > 0}
            />
          </aside>
        </div>

        <section className="mt-8">
           {establishments.length > 0 && !isLoading && (
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <AnalysisSummary establishments={establishments} />
              <ExportButton data={displayedEstablishments} />
            </div>
          )}
          <ResultsGrid
            establishments={displayedEstablishments}
            isLoading={isLoading}
            error={error}
            onCardClick={handleCardClick}
            hasSearched={hasSearched}
            searchTerm={searchTerm}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
