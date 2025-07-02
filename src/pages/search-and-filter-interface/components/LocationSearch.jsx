import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LocationSearch = ({ onLocationSelect, currentLocation, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const inputRef = useRef(null);

  // Mock Melbourne suburbs and landmarks for autocomplete
  const melbournePlaces = [
    { name: "Melbourne CBD", type: "suburb", postcode: "3000" },
    { name: "South Yarra", type: "suburb", postcode: "3141" },
    { name: "Richmond", type: "suburb", postcode: "3121" },
    { name: "Fitzroy", type: "suburb", postcode: "3065" },
    { name: "Carlton", type: "suburb", postcode: "3053" },
    { name: "St Kilda", type: "suburb", postcode: "3182" },
    { name: "Prahran", type: "suburb", postcode: "3181" },
    { name: "Collingwood", type: "suburb", postcode: "3066" },
    { name: "Docklands", type: "suburb", postcode: "3008" },
    { name: "Southbank", type: "suburb", postcode: "3006" },
    { name: "Flinders Street Station", type: "landmark", address: "Flinders St, Melbourne VIC 3000" },
    { name: "Southern Cross Station", type: "landmark", address: "Spencer St, Melbourne VIC 3000" },
    { name: "Queen Victoria Market", type: "landmark", address: "Queen St, Melbourne VIC 3000" },
    { name: "Royal Melbourne Hospital", type: "landmark", address: "Grattan St, Parkville VIC 3050" },
    { name: "Melbourne Airport", type: "landmark", address: "Departure Dr, Melbourne Airport VIC 3045" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 1) {
      const filtered = melbournePlaces.filter(place =>
        place.name.toLowerCase().includes(value.toLowerCase()) ||
        (place.postcode && place.postcode.includes(value))
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (place) => {
    setSearchQuery(place.name);
    setShowSuggestions(false);
    onLocationSelect?.(place);
  };

  const handleCurrentLocation = async () => {
    setIsDetectingLocation(true);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            name: "Current Location",
            type: "current",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setSearchQuery("Current Location");
          onLocationSelect?.(location);
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsDetectingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    } catch (error) {
      console.error('Geolocation error:', error);
      setIsDetectingLocation(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchLocation = {
        name: searchQuery,
        type: "search",
        query: searchQuery.trim()
      };
      onLocationSelect?.(searchLocation);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Search Location
        </label>
        <div className="relative" ref={inputRef}>
          <div className="relative">
            <Input
              type="search"
              placeholder="Enter suburb, postcode, or landmark"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-12"
              disabled={isLoading}
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => {
                  setSearchQuery('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              />
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-dropdown w-full mt-1 bg-surface border border-border rounded-lg shadow-elevation-3 max-h-64 overflow-y-auto">
              {suggestions.map((place, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(place)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-secondary transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={place.type === 'landmark' ? 'MapPin' : 'Home'} 
                      size={16} 
                      className="text-text-muted flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {place.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {place.type === 'suburb' ? `${place.type} • ${place.postcode}` : 
                         place.type === 'landmark' ? place.address : 
                         place.type}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location Actions */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Navigation"
          iconPosition="left"
          onClick={handleCurrentLocation}
          disabled={isDetectingLocation || isLoading}
          loading={isDetectingLocation}
          className="flex-1"
        >
          {isDetectingLocation ? 'Detecting...' : 'Use Current Location'}
        </Button>
        <Button
          variant="primary"
          size="sm"
          iconName="Search"
          onClick={handleSearch}
          disabled={!searchQuery.trim() || isLoading}
        >
          Search
        </Button>
      </div>

      {/* Current Location Display */}
      {currentLocation && (
        <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary-700">
                {currentLocation.name}
              </p>
              {currentLocation.type === 'current' && (
                <p className="text-xs text-primary-600">
                  Accuracy: ±{Math.round(currentLocation.accuracy)}m
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;