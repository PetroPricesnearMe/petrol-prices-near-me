import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const SearchPanel = ({ isOpen, onClose, onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('all');
  const [maxDistance, setMaxDistance] = useState('10');
  const [sortBy, setSortBy] = useState('price');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fuelTypes = [
    { value: 'all', label: 'All Fuel Types' },
    { value: 'unleaded', label: 'Unleaded 91' },
    { value: 'premium', label: 'Premium 95' },
    { value: 'premium98', label: 'Premium 98' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'e10', label: 'E10' },
  ];

  const sortOptions = [
    { value: 'price', label: 'Lowest Price' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'brand', label: 'Brand Name' },
    { value: 'updated', label: 'Recently Updated' },
  ];

  const distanceOptions = [
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '20', label: '20 km' },
    { value: '50', label: '50 km' },
  ];

  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      fuelType: selectedFuelType,
      maxDistance: parseInt(maxDistance),
      sortBy,
    };
    onSearch?.(filters);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedFuelType('all');
    setMaxDistance('10');
    setSortBy('price');
    setShowAdvanced(false);
    onFilterChange?.({
      query: '',
      fuelType: 'all',
      maxDistance: 10,
      sortBy: 'price',
    });
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'query':
        setSearchQuery(value);
        break;
      case 'fuelType':
        setSelectedFuelType(value);
        break;
      case 'distance':
        setMaxDistance(value);
        break;
      case 'sortBy':
        setSortBy(value);
        break;
    }
    
    // Trigger filter change for real-time updates
    onFilterChange?.({
      query: field === 'query' ? value : searchQuery,
      fuelType: field === 'fuelType' ? value : selectedFuelType,
      maxDistance: field === 'distance' ? parseInt(value) : parseInt(maxDistance),
      sortBy: field === 'sortBy' ? value : sortBy,
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop lg:hidden"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className={`
        fixed lg:absolute top-0 right-0 h-full w-full lg:w-80 xl:w-96 
        bg-surface shadow-elevation-4 z-modal lg:z-dropdown
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:shadow-elevation-3
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={20} className="text-primary" />
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Search & Filter
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="lg:hidden"
            />
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
            {/* Location Search */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Search Location or Station
              </label>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Enter suburb, postcode, or station name"
                  value={searchQuery}
                  onChange={(e) => handleInputChange('query', e.target.value)}
                  className="pl-10"
                />
                <Icon 
                  name="MapPin" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                />
              </div>
            </div>

            {/* Fuel Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Fuel Type
              </label>
              <select
                value={selectedFuelType}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                {fuelTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Distance Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Maximum Distance
              </label>
              <select
                value={maxDistance}
                onChange={(e) => handleInputChange('distance', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                {distanceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Sort Results By
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleInputChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="pt-4 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full justify-between"
              >
                Advanced Filters
              </Button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  {/* Price Range */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      Price Range (per litre)
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        step="0.01"
                        min="0"
                        className="flex-1"
                      />
                      <span className="flex items-center text-text-muted">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        step="0.01"
                        min="0"
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      Preferred Brands
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Shell', 'BP', 'Caltex', '7-Eleven', 'Mobil', 'United'].map((brand) => (
                        <label key={brand} className="flex items-center space-x-2">
                          <Input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm text-text-secondary">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-primary">
                      Amenities
                    </label>
                    <div className="space-y-2">
                      {['24/7 Open', 'Car Wash', 'Convenience Store', 'ATM', 'Restrooms'].map((amenity) => (
                        <label key={amenity} className="flex items-center space-x-2">
                          <Input type="checkbox" className="w-4 h-4" />
                          <span className="text-sm text-text-secondary">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 lg:p-6 border-t border-border bg-surface-secondary">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Search"
                iconPosition="left"
                onClick={handleSearch}
                className="flex-1"
              >
                Search
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-3 text-center">
              <span className="text-xs text-text-muted">
                Found 24 stations within {maxDistance}km
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;