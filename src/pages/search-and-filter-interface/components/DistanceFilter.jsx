import React from 'react';
import Icon from '../../../components/AppIcon';

const DistanceFilter = ({ selectedDistance, onDistanceChange, isCollapsed, onToggleCollapse }) => {
  const distanceOptions = [
    { value: 2, label: '2 km', description: 'Very close', icon: 'MapPin' },
    { value: 5, label: '5 km', description: 'Walking distance', icon: 'MapPin' },
    { value: 10, label: '10 km', description: 'Short drive', icon: 'Car' },
    { value: 20, label: '20 km', description: 'Medium drive', icon: 'Car' },
    { value: 50, label: '50 km', description: 'Long drive', icon: 'Navigation' },
    { value: 100, label: '100+ km', description: 'Any distance', icon: 'Globe' }
  ];

  const handleDistanceSelect = (distance) => {
    onDistanceChange?.(distance);
  };

  const getDistanceDescription = () => {
    const selected = distanceOptions.find(opt => opt.value === selectedDistance);
    return selected ? `Within ${selected.label}` : 'No distance limit';
  };

  return (
    <div className="border border-default-border rounded-lg bg-surface">
      {/* Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Navigation" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-text-primary">
              Distance Range
            </h3>
            <p className="text-xs text-text-secondary">
              {getDistanceDescription()}
            </p>
          </div>
        </div>
        <Icon 
          name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
          size={16} 
          className="text-text-muted" 
        />
      </button>

      {/* Content */}
      {!isCollapsed && (
        <div className="px-4 pb-4 space-y-4">
          {/* Distance Options */}
          <div className="space-y-2">
            {distanceOptions.map((option) => {
              const isSelected = selectedDistance === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleDistanceSelect(option.value)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                    isSelected 
                      ? 'border-primary bg-primary-50 hover:bg-primary-100' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-surface-secondary text-text-muted'
                  }`}>
                    <Icon name={option.icon} size={16} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-medium ${
                      isSelected ? 'text-primary-700' : 'text-text-primary'
                    }`}>
                      {option.label}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {option.description}
                    </p>
                  </div>
                  {isSelected && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Distance Slider Alternative */}
          <div className="pt-3 border-t border-default-border">
            <label className="block text-xs font-medium text-text-primary mb-2">
              Custom Distance: {selectedDistance}km
            </label>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={selectedDistance}
              onChange={(e) => handleDistanceSelect(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-text-muted mt-1">
              <span>1km</span>
              <span>50km</span>
              <span>100km+</span>
            </div>
          </div>

          {/* Travel Time Estimates */}
          <div className="pt-3 border-t border-default-border">
            <p className="text-xs font-medium text-text-primary mb-2">
              Estimated Travel Time
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-surface-secondary rounded-lg text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon name="Car" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-secondary">Driving</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {selectedDistance <= 5 ? '5-10 min' : 
                   selectedDistance <= 20 ? '15-25 min' : 
                   selectedDistance <= 50 ? '30-45 min' : '45+ min'}
                </p>
              </div>
              <div className="p-2 bg-surface-secondary rounded-lg text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Icon name="MapPin" size={12} className="text-text-muted" />
                  <span className="text-xs text-text-secondary">Walking</span>
                </div>
                <p className="text-sm font-semibold text-text-primary">
                  {selectedDistance <= 2 ? '20-30 min' : 
                   selectedDistance <= 5 ? '45-60 min': '60+ min'}
                </p>
              </div>
            </div>
          </div>

          {/* Location Context */}
          <div className="p-3 bg-accent-50 border border-accent-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-accent-700">
                  Distance calculated from your current location
                </p>
                <p className="text-xs text-accent-600 mt-1">
                  Results may vary based on traffic conditions and route availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default DistanceFilter;