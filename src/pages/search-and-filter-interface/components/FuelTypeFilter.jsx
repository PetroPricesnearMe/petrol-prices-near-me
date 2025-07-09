import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const FuelTypeFilter = ({ selectedFuelTypes, onFuelTypeChange, isCollapsed, onToggleCollapse }) => {
  const fuelTypes = [
    { 
      id: 'unleaded91', 
      name: 'Unleaded 91', 
      icon: 'Fuel',
      color: 'text-blue-600',
      description: 'Regular unleaded petrol'
    },
    { 
      id: 'premium95', 
      name: 'Premium 95', 
      icon: 'Fuel',
      color: 'text-green-600',
      description: 'Premium unleaded 95 octane'
    },
    { 
      id: 'premium98', 
      name: 'Premium 98', 
      icon: 'Fuel',
      color: 'text-purple-600',
      description: 'Premium unleaded 98 octane'
    },
    { 
      id: 'diesel', 
      name: 'Diesel', 
      icon: 'Fuel',
      color: 'text-orange-600',
      description: 'Diesel fuel'
    },
    { 
      id: 'e10', 
      name: 'E10', 
      icon: 'Leaf',
      color: 'text-emerald-600',
      description: '10% ethanol blend'
    },
    { 
      id: 'e85', 
      name: 'E85', 
      icon: 'Leaf',
      color: 'text-teal-600',
      description: '85% ethanol blend'
    }
  ];

  const handleFuelTypeToggle = (fuelTypeId) => {
    const updatedTypes = selectedFuelTypes.includes(fuelTypeId)
      ? selectedFuelTypes.filter(id => id !== fuelTypeId)
      : [...selectedFuelTypes, fuelTypeId];
    
    onFuelTypeChange?.(updatedTypes);
  };

  const handleSelectAll = () => {
    const allIds = fuelTypes.map(fuel => fuel.id);
    onFuelTypeChange?.(allIds);
  };

  const handleClearAll = () => {
    onFuelTypeChange?.([]);
  };

  const selectedCount = selectedFuelTypes.length;
  const totalCount = fuelTypes.length;

  return (
    <div className="border border-default-border rounded-lg bg-surface">
      {/* Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Fuel" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-text-primary">
              Fuel Type
            </h3>
            <p className="text-xs text-text-secondary">
              {selectedCount === 0 ? 'None selected' : 
               selectedCount === totalCount ? 'All selected' :
               `${selectedCount} of ${totalCount} selected`}
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
          {/* Quick Actions */}
          <div className="flex justify-between items-center">
            <button
              onClick={handleSelectAll}
              className="text-xs text-primary hover:text-primary-700 font-medium transition-colors duration-200"
              disabled={selectedCount === totalCount}
            >
              Select All
            </button>
            <button
              onClick={handleClearAll}
              className="text-xs text-text-secondary hover:text-text-primary font-medium transition-colors duration-200"
              disabled={selectedCount === 0}
            >
              Clear All
            </button>
          </div>

          {/* Fuel Type Options */}
          <div className="space-y-3">
            {fuelTypes.map((fuel) => {
              const isSelected = selectedFuelTypes.includes(fuel.id);
              
              return (
                <label
                  key={fuel.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary-50 hover:bg-primary-100' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                  }`}
                >
                  <Input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleFuelTypeToggle(fuel.id)}
                    className="w-4 h-4"
                  />
                  <div className="flex items-center space-x-2 flex-1">
                    <Icon 
                      name={fuel.icon} 
                      size={16} 
                      className={fuel.color} 
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isSelected ? 'text-primary-700' : 'text-text-primary'
                      }`}>
                        {fuel.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {fuel.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <Icon 
                      name="Check" 
                      size={16} 
                      className="text-primary" 
                    />
                  )}
                </label>
              );
            })}
          </div>

          {/* Popular Combinations */}
          <div className="pt-3 border-t border-default-border">
            <p className="text-xs font-medium text-text-primary mb-2">
              Popular Combinations
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onFuelTypeChange?.(['unleaded91', 'e10'])}
                className="px-2 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200"
              >
                Regular + E10
              </button>
              <button
                onClick={() => onFuelTypeChange?.(['premium95', 'premium98'])}
                className="px-2 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200"
              >
                Premium Only
              </button>
              <button
                onClick={() => onFuelTypeChange?.(['diesel'])}
                className="px-2 py-1 text-xs bg-secondary-100 text-secondary-700 rounded-md hover:bg-secondary-200 transition-colors duration-200"
              >
                Diesel Only
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelTypeFilter;