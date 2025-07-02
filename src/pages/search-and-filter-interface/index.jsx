import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import LocationSearch from './components/LocationSearch';
import FuelTypeFilter from './components/FuelTypeFilter';
import PriceRangeFilter from './components/PriceRangeFilter';
import DistanceFilter from './components/DistanceFilter';
import AdvancedFilters from './components/AdvancedFilters';
import ActiveFilters from './components/ActiveFilters';
import SavedSearches from './components/SavedSearches';

const SearchAndFilterInterface = () => {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  // Filter states
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 120, max: 220 });
  const [selectedDistance, setSelectedDistance] = useState(10);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);
  const [operatingHours, setOperatingHours] = useState('any');

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState({
    fuelType: false,
    priceRange: false,
    distance: false,
    advanced: true
  });

  // Check for mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowFilters(true);
      }
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Simulate search results
  useEffect(() => {
    const simulateSearch = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate mock result count based on filters
      let count = 45; // Base count
      
      if (selectedFuelTypes.length > 0) count = Math.max(count - selectedFuelTypes.length * 5, 5);
      if (selectedBrands.length > 0) count = Math.max(count - selectedBrands.length * 8, 3);
      if (selectedAmenities.length > 0) count = Math.max(count - selectedAmenities.length * 3, 2);
      if (selectedDistance < 10) count = Math.max(count - 10, 1);
      if (priceRange.max < 180) count = Math.max(count - 15, 1);
      
      setResultCount(count);
      setIsLoading(false);
    };

    simulateSearch();
  }, [
    currentLocation,
    selectedFuelTypes,
    priceRange,
    selectedDistance,
    selectedBrands,
    selectedAmenities,
    selectedPaymentMethods,
    operatingHours
  ]);

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLocationSelect = (location) => {
    setCurrentLocation(location);
  };

  const handleApplyFilters = () => {
    // In a real app, this would trigger the search
    console.log('Applying filters:', {
      location: currentLocation,
      fuelTypes: selectedFuelTypes,
      priceRange,
      distance: selectedDistance,
      brands: selectedBrands,
      amenities: selectedAmenities,
      paymentMethods: selectedPaymentMethods,
      operatingHours
    });

    if (isMobileView) {
      setShowFilters(false);
    }

    // Navigate to map with filters
    navigate('/map-dashboard', { 
      state: { 
        filters: {
          location: currentLocation,
          fuelTypes: selectedFuelTypes,
          priceRange,
          distance: selectedDistance,
          brands: selectedBrands,
          amenities: selectedAmenities,
          paymentMethods: selectedPaymentMethods,
          operatingHours
        }
      }
    });
  };

  const handleClearAllFilters = () => {
    setCurrentLocation(null);
    setSelectedFuelTypes([]);
    setPriceRange({ min: 120, max: 220 });
    setSelectedDistance(10);
    setSelectedBrands([]);
    setSelectedAmenities([]);
    setSelectedPaymentMethods([]);
    setOperatingHours('any');
  };

  const handleRemoveFilter = (type, value) => {
    switch (type) {
      case 'location':
        setCurrentLocation(null);
        break;
      case 'fuelType':
        setSelectedFuelTypes(prev => prev.filter(ft => ft !== value));
        break;
      case 'priceRange':
        setPriceRange({ min: 120, max: 220 });
        break;
      case 'distance':
        setSelectedDistance(10);
        break;
      case 'brand':
        setSelectedBrands(prev => prev.filter(b => b !== value));
        break;
      case 'amenity':
        setSelectedAmenities(prev => prev.filter(a => a !== value));
        break;
      case 'paymentMethod':
        setSelectedPaymentMethods(prev => prev.filter(pm => pm !== value));
        break;
      case 'operatingHours': setOperatingHours('any');
        break;
    }
  };

  const handleSaveCurrentSearch = () => {
    // This would typically save to localStorage or backend
    console.log('Saving current search filters');
  };

  const handleLoadSavedSearch = (filters) => {
    if (filters.location) setCurrentLocation(filters.location);
    if (filters.fuelTypes) setSelectedFuelTypes(filters.fuelTypes);
    if (filters.priceRange) setPriceRange(filters.priceRange);
    if (filters.distance) setSelectedDistance(filters.distance);
    if (filters.brands) setSelectedBrands(filters.brands);
    if (filters.amenities) setSelectedAmenities(filters.amenities);
    if (filters.paymentMethods) setSelectedPaymentMethods(filters.paymentMethods);
    if (filters.operatingHours) setOperatingHours(filters.operatingHours);
  };

  const currentFilters = {
    location: currentLocation,
    fuelTypes: selectedFuelTypes,
    priceRange,
    distance: selectedDistance,
    brands: selectedBrands,
    amenities: selectedAmenities,
    paymentMethods: selectedPaymentMethods,
    operatingHours
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Header */}
          {isMobileView && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-heading font-bold text-text-primary">
                  Search & Filter
                </h1>
                <p className="text-sm text-text-secondary">
                  Find the perfect fuel station for your needs
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                iconName={showFilters ? "X" : "Filter"}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Close' : 'Filters'}
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Filter Panel */}
            <div className={`lg:col-span-1 ${isMobileView && !showFilters ? 'hidden' : ''}`}>
              <div className="space-y-6">
                {/* Desktop Header */}
                {!isMobileView && (
                  <div className="mb-6">
                    <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
                      Search & Filter Interface
                    </h1>
                    <p className="text-text-secondary">
                      Refine your search to find the perfect fuel station with the best prices and amenities.
                    </p>
                  </div>
                )}

                {/* Location Search */}
                <LocationSearch
                  onLocationSelect={handleLocationSelect}
                  currentLocation={currentLocation}
                  isLoading={isLoading}
                />

                {/* Fuel Type Filter */}
                <FuelTypeFilter
                  selectedFuelTypes={selectedFuelTypes}
                  onFuelTypeChange={setSelectedFuelTypes}
                  isCollapsed={collapsedSections.fuelType}
                  onToggleCollapse={() => toggleSection('fuelType')}
                />

                {/* Price Range Filter */}
                <PriceRangeFilter
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  isCollapsed={collapsedSections.priceRange}
                  onToggleCollapse={() => toggleSection('priceRange')}
                />

                {/* Distance Filter */}
                <DistanceFilter
                  selectedDistance={selectedDistance}
                  onDistanceChange={setSelectedDistance}
                  isCollapsed={collapsedSections.distance}
                  onToggleCollapse={() => toggleSection('distance')}
                />

                {/* Advanced Filters */}
                <AdvancedFilters
                  selectedBrands={selectedBrands}
                  selectedAmenities={selectedAmenities}
                  selectedPaymentMethods={selectedPaymentMethods}
                  operatingHours={operatingHours}
                  onBrandsChange={setSelectedBrands}
                  onAmenitiesChange={setSelectedAmenities}
                  onPaymentMethodsChange={setSelectedPaymentMethods}
                  onOperatingHoursChange={setOperatingHours}
                  isCollapsed={collapsedSections.advanced}
                  onToggleCollapse={() => toggleSection('advanced')}
                />

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <Button
                    variant="primary"
                    size="md"
                    iconName="Search"
                    iconPosition="left"
                    onClick={handleApplyFilters}
                    loading={isLoading}
                    fullWidth
                  >
                    {isLoading ? 'Searching...' : 'Apply Filters & Search'}
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="RotateCcw"
                      onClick={handleClearAllFilters}
                    >
                      Clear All
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Map"
                      onClick={() => navigate('/map-dashboard')}
                    >
                      View Map
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className={`lg:col-span-2 ${isMobileView && showFilters ? 'hidden' : ''}`}>
              <div className="space-y-6">
                {/* Active Filters */}
                <ActiveFilters
                  filters={currentFilters}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAllFilters}
                  resultCount={resultCount}
                  isLoading={isLoading}
                />

                {/* Saved Searches */}
                <SavedSearches
                  onLoadSearch={handleLoadSavedSearch}
                  onSaveCurrentSearch={handleSaveCurrentSearch}
                  currentFilters={currentFilters}
                />

                {/* Search Tips */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Lightbulb" size={20} className="text-accent mt-1" />
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                        Search Tips
                      </h3>
                      <div className="space-y-2 text-sm text-text-secondary">
                        <p className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Use your current location for the most accurate distance calculations</span>
                        </p>
                        <p className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Save frequently used searches for quick access</span>
                        </p>
                        <p className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Combine multiple fuel types to see more options</span>
                        </p>
                        <p className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Use brand filters to find your preferred stations</span>
                        </p>
                        <p className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span>Check operating hours to ensure stations are open when you need them</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      iconName="Upload"
                      iconPosition="left"
                      onClick={() => navigate('/csv-data-upload')}
                      fullWidth
                    >
                      Upload Station Data
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Settings"
                      iconPosition="left"
                      onClick={() => navigate('/settings-and-data-management')}
                      fullWidth
                    >
                      Manage Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterInterface;