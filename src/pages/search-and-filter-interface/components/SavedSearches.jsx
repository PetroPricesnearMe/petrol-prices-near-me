import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ onLoadSearch, onSaveCurrentSearch, currentFilters }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: "Cheap Unleaded Near Home",
      filters: {
        location: { name: "Richmond", type: "suburb" },
        fuelTypes: ["unleaded91", "e10"],
        priceRange: { min: 120, max: 160 },
        distance: 10
      },
      createdAt: new Date(Date.now() - 86400000 * 2),
      lastUsed: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: "Premium Fuel CBD",
      filters: {
        location: { name: "Melbourne CBD", type: "suburb" },
        fuelTypes: ["premium95", "premium98"],
        distance: 5,
        operatingHours: "24/7"
      },
      createdAt: new Date(Date.now() - 86400000 * 7),
      lastUsed: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: 3,
      name: "Shell Stations with Car Wash",
      filters: {
        brands: ["shell"],
        amenities: ["carwash", "convenience"],
        distance: 20
      },
      createdAt: new Date(Date.now() - 86400000 * 14),
      lastUsed: new Date(Date.now() - 86400000 * 5)
    }
  ]);

  const handleSaveSearch = () => {
    if (!searchName.trim()) return;

    const newSearch = {
      id: Date.now(),
      name: searchName.trim(),
      filters: { ...currentFilters },
      createdAt: new Date(),
      lastUsed: new Date()
    };

    setSavedSearches(prev => [newSearch, ...prev]);
    setSearchName('');
    setShowSaveDialog(false);
  };

  const handleLoadSearch = (search) => {
    // Update last used timestamp
    setSavedSearches(prev => 
      prev.map(s => 
        s.id === search.id 
          ? { ...s, lastUsed: new Date() }
          : s
      )
    );
    
    onLoadSearch?.(search.filters);
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const getFilterSummary = (filters) => {
    const parts = [];
    
    if (filters.location) {
      parts.push(filters.location.name);
    }
    
    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      parts.push(`${filters.fuelTypes.length} fuel type${filters.fuelTypes.length > 1 ? 's' : ''}`);
    }
    
    if (filters.distance) {
      parts.push(`${filters.distance}km radius`);
    }
    
    if (filters.brands && filters.brands.length > 0) {
      parts.push(`${filters.brands.length} brand${filters.brands.length > 1 ? 's' : ''}`);
    }

    return parts.join(' • ');
  };

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Bookmark" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Saved Searches
          </h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowSaveDialog(true)}
        >
          Save Current
        </Button>
      </div>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="p-4 bg-surface-secondary border border-default-border rounded-lg space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-text-primary">
              Save Current Search
            </h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => {
                setShowSaveDialog(false);
                setSearchName('');
              }}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter search name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSaveSearch()}
              className="text-sm"
            />
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveSearch}
                disabled={!searchName.trim()}
                className="flex-1"
              >
                Save Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setSearchName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches List */}
      {savedSearches.length > 0 ? (
        <div className="space-y-2">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="p-4 bg-surface border border-default-border rounded-lg hover:border-default-border-dark transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-text-primary truncate">
                      {search.name}
                    </h4>
                    <span className="text-xs text-text-muted bg-surface-secondary px-2 py-0.5 rounded-full">
                      {formatRelativeTime(search.lastUsed)}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">
                    {getFilterSummary(search.filters)}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>Created {formatRelativeTime(search.createdAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>Used {formatRelativeTime(search.lastUsed)}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Play"
                    onClick={() => handleLoadSearch(search)}
                    className="p-1.5"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => handleDeleteSearch(search.id)}
                    className="p-1.5 text-error hover:text-error-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Bookmark" size={48} className="text-text-muted mx-auto mb-3" />
          <h4 className="text-sm font-medium text-text-primary mb-1">
            No Saved Searches
          </h4>
          <p className="text-xs text-text-secondary mb-4">
            Save your frequently used search criteria for quick access.
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowSaveDialog(true)}
          >
            Save Your First Search
          </Button>
        </div>
      )}

      {/* Quick Access Suggestions */}
      {savedSearches.length > 0 && (
        <div className="pt-4 border-t border-default-border">
          <p className="text-xs font-medium text-text-primary mb-2">
            Quick Access
          </p>
          <div className="flex flex-wrap gap-2">
            {savedSearches.slice(0, 3).map((search) => (
              <button
                key={search.id}
                onClick={() => handleLoadSearch(search)}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-50 text-primary-700 rounded-md text-xs font-medium hover:bg-primary-100 transition-colors duration-200"
              >
                <Icon name="Zap" size={12} />
                <span>{search.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;