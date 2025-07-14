import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchPanel from '../../components/ui/SearchPanel';
import MapContainer from './components/MapContainer';
import FloatingSearchBar from './components/FloatingSearchBar';
import FloatingActionButton from './components/FloatingActionButton';
import StationInfoPanel from './components/StationInfoPanel';

const MapDashboard = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [isStationPanelOpen, setIsStationPanelOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    fuelType: 'all',
    maxDistance: 10,
    sortBy: 'price'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (query) => {
    setSearchFilters(prev => ({ ...prev, query }));
    setIsSearchPanelOpen(false);
  };

  const handleFilterChange = (filters) => {
    setSearchFilters(prev => ({ ...prev, ...filters }));
  };

  const handleStationSelect = (station) => {
    setSelectedStation(station);
    setIsStationPanelOpen(true);
  };

  const handleLocationFound = (location) => {
    setUserLocation(location);
  };

  const handleQuickUpload = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleGetDirections = (station) => {
    console.log('Getting directions to:', station.name);
  };

  const handleCallStation = (station) => {
    console.log('Calling station:', station.name);
  };

  const toggleSearchPanel = () => {
    setIsSearchPanelOpen(!isSearchPanelOpen);
  };

  const closeStationPanel = () => {
    setIsStationPanelOpen(false);
    setSelectedStation(null);
  };

  return (
    <>
      <Helmet>
        <title>Map Dashboard - Melbourne Fuel Finder</title>
        <meta name="description" content="Interactive map showing Melbourne petrol stations with real-time fuel prices. Find the cheapest fuel near you." />
        <meta name="keywords" content="Melbourne, fuel prices, petrol stations, map, dashboard" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16 lg:pt-20 h-screen">
          <div className="relative h-full">
            {/* Map Container */}
            <MapContainer
              stations={stations}
              selectedStation={selectedStation}
              onStationSelect={handleStationSelect}
              onLocationFound={handleLocationFound}
              filters={searchFilters}
              isLoading={isLoading}
            />

            {/* Floating Search Bar */}
            <FloatingSearchBar
              onSearch={handleSearch}
              onFilterToggle={toggleSearchPanel}
              isFilterOpen={isSearchPanelOpen}
            />

            {/* Search Panel */}
            <SearchPanel
              isOpen={isSearchPanelOpen}
              onClose={() => setIsSearchPanelOpen(false)}
              onSearch={handleSearch}
              onFilterChange={handleFilterChange}
            />

            {/* Station Info Panel */}
            <StationInfoPanel
              station={selectedStation}
              isOpen={isStationPanelOpen}
              onClose={closeStationPanel}
              onGetDirections={handleGetDirections}
              onCallStation={handleCallStation}
            />

            {/* Floating Action Button */}
            <FloatingActionButton
              onQuickUpload={handleQuickUpload}
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-surface bg-opacity-90 flex items-center justify-center z-50">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-text-secondary font-medium">Loading fuel stations...</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default MapDashboard;