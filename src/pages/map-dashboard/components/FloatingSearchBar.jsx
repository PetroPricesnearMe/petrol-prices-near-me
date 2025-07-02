import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FloatingSearchBar = ({ onSearch, onFilterToggle, isFilterOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'location', text: 'Melbourne CBD', icon: 'MapPin' },
    { type: 'location', text: 'South Yarra', icon: 'MapPin' },
    { type: 'location', text: 'Richmond', icon: 'MapPin' },
    { type: 'location', text: 'Fitzroy', icon: 'MapPin' },
    { type: 'location', text: 'Carlton', icon: 'MapPin' },
    { type: 'station', text: 'Shell Coles Express', icon: 'Fuel' },
    { type: 'station', text: 'BP Collins Street', icon: 'Fuel' },
    { type: 'station', text: 'Caltex Woolworths', icon: 'Fuel' },
    { type: 'station', text: '7-Eleven Richmond', icon: 'Fuel' },
    { type: 'postcode', text: '3000 - Melbourne', icon: 'Hash' },
    { type: 'postcode', text: '3141 - South Yarra', icon: 'Hash' },
    { type: 'postcode', text: '3121 - Richmond', icon: 'Hash' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        if (!searchQuery) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    onSearch?.(suggestion.text);
  };

  const handleSearchFocus = () => {
    setIsExpanded(true);
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.('');
  };

  return (
    <div className="absolute top-4 left-4 right-4 lg:left-6 lg:right-auto lg:w-96 z-40" ref={searchRef}>
      <div className="relative">
        {/* Main Search Bar */}
        <div className={`
          bg-surface border border-border rounded-xl shadow-elevation-3 
          transition-all duration-300 ease-out
          ${isExpanded ? 'shadow-elevation-4' : ''}
        `}>
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search locations, stations, or postcodes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="border-0 bg-transparent pl-12 pr-4 py-3 lg:py-4 text-base focus:ring-0 rounded-xl"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" 
              />
              {searchQuery && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
                />
              )}
            </div>
            
            {/* Filter Toggle Button */}
            <div className="flex items-center space-x-2 pr-3">
              <Button
                type="button"
                variant={isFilterOpen ? "primary" : "ghost"}
                size="sm"
                iconName="Filter"
                onClick={onFilterToggle}
                className="relative"
              >
                {isFilterOpen && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
                )}
              </Button>
              
              <div className="w-px h-6 bg-border"></div>
              
              <Button
                type="submit"
                variant="primary"
                size="sm"
                iconName="Search"
                disabled={!searchQuery.trim()}
              />
            </div>
          </form>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-4 overflow-hidden animate-fade-in">
            <div className="py-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-surface-secondary transition-colors duration-200 text-left"
                >
                  <Icon 
                    name={suggestion.icon} 
                    size={16} 
                    className={`
                      ${suggestion.type === 'location' ? 'text-primary' : ''}
                      ${suggestion.type === 'station' ? 'text-accent' : ''}
                      ${suggestion.type === 'postcode' ? 'text-secondary' : ''}
                    `}
                  />
                  <div className="flex-1">
                    <span className="text-sm text-text-primary">{suggestion.text}</span>
                    <span className="ml-2 text-xs text-text-muted capitalize">
                      {suggestion.type}
                    </span>
                  </div>
                  <Icon name="ArrowUpRight" size={14} className="text-text-muted" />
                </button>
              ))}
            </div>
            
            {/* Quick Actions */}
            <div className="border-t border-border bg-surface-secondary px-4 py-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Quick Actions</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="2xs"
                    iconName="Navigation"
                    onClick={() => {
                      // Get current location
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          (position) => {
                            onSearch?.(`${position.coords.latitude},${position.coords.longitude}`);
                            setShowSuggestions(false);
                          }
                        );
                      }
                    }}
                  >
                    Near Me
                  </Button>
                  <Button
                    variant="ghost"
                    size="2xs"
                    iconName="TrendingDown"
                    onClick={() => {
                      onSearch?.('cheapest');
                      setShowSuggestions(false);
                    }}
                  >
                    Cheapest
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {showSuggestions && suggestions.length === 0 && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-elevation-4 p-4 animate-fade-in">
            <div className="text-center">
              <Icon name="Search" size={24} className="text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-secondary">No results found for "{searchQuery}"</p>
              <p className="text-xs text-text-muted mt-1">Try searching for a suburb, postcode, or station name</p>
            </div>
          </div>
        )}
      </div>

      {/* Search Shortcuts - Desktop Only */}
      <div className="hidden lg:flex items-center space-x-2 mt-3">
        {['Melbourne CBD', 'South Yarra', 'Richmond', 'Fitzroy'].map((location) => (
          <Button
            key={location}
            variant="ghost"
            size="2xs"
            onClick={() => {
              setSearchQuery(location);
              onSearch?.(location);
            }}
            className="text-xs bg-surface-secondary hover:bg-surface border border-border"
          >
            {location}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloatingSearchBar;