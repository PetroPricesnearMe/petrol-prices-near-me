import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const PriceRangeFilter = ({ priceRange, onPriceRangeChange, isCollapsed, onToggleCollapse }) => {
  const [localMinPrice, setLocalMinPrice] = useState(priceRange.min);
  const [localMaxPrice, setLocalMaxPrice] = useState(priceRange.max);
  const [isDragging, setIsDragging] = useState(false);

  // Price range constants (in AUD cents per litre)
  const MIN_PRICE = 120; // $1.20
  const MAX_PRICE = 220; // $2.20
  const STEP = 1; // 1 cent

  useEffect(() => {
    setLocalMinPrice(priceRange.min);
    setLocalMaxPrice(priceRange.max);
  }, [priceRange]);

  const handleMinPriceChange = (value) => {
    const numValue = Math.max(MIN_PRICE, Math.min(value, localMaxPrice - STEP));
    setLocalMinPrice(numValue);
    if (!isDragging) {
      onPriceRangeChange?.({ min: numValue, max: localMaxPrice });
    }
  };

  const handleMaxPriceChange = (value) => {
    const numValue = Math.min(MAX_PRICE, Math.max(value, localMinPrice + STEP));
    setLocalMaxPrice(numValue);
    if (!isDragging) {
      onPriceRangeChange?.({ min: localMinPrice, max: numValue });
    }
  };

  const handleSliderChange = (e, type) => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      handleMinPriceChange(value);
    } else {
      handleMaxPriceChange(value);
    }
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
    onPriceRangeChange?.({ min: localMinPrice, max: localMaxPrice });
  };

  const handleSliderMouseDown = () => {
    setIsDragging(true);
  };

  const handleInputChange = (e, type) => {
    const value = parseFloat(e.target.value) * 100; // Convert dollars to cents
    if (type === 'min') {
      handleMinPriceChange(Math.round(value));
    } else {
      handleMaxPriceChange(Math.round(value));
    }
  };

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const getSliderBackground = () => {
    const minPercent = ((localMinPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
    const maxPercent = ((localMaxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
    
    return `linear-gradient(to right, 
      #e2e8f0 0%, 
      #e2e8f0 ${minPercent}%, 
      #2563eb ${minPercent}%, 
      #2563eb ${maxPercent}%, 
      #e2e8f0 ${maxPercent}%, 
      #e2e8f0 100%)`;
  };

  const presetRanges = [
    { label: 'Budget', min: 120, max: 150, description: 'Under $1.50' },
    { label: 'Average', min: 150, max: 180, description: '$1.50 - $1.80' },
    { label: 'Premium', min: 180, max: 220, description: 'Above $1.80' },
  ];

  const handlePresetClick = (preset) => {
    setLocalMinPrice(preset.min);
    setLocalMaxPrice(preset.max);
    onPriceRangeChange?.({ min: preset.min, max: preset.max });
  };

  return (
    <div className="border border-default-border rounded-lg bg-surface">
      {/* Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="DollarSign" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-text-primary">
              Price Range
            </h3>
            <p className="text-xs text-text-secondary">
              ${formatPrice(localMinPrice)} - ${formatPrice(localMaxPrice)} per litre
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
          {/* Price Input Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Min Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
                  $
                </span>
                <Input
                  type="number"
                  min={formatPrice(MIN_PRICE)}
                  max={formatPrice(MAX_PRICE)}
                  step="0.01"
                  value={formatPrice(localMinPrice)}
                  onChange={(e) => handleInputChange(e, 'min')}
                  className="pl-7 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary mb-1">
                Max Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted text-sm">
                  $
                </span>
                <Input
                  type="number"
                  min={formatPrice(MIN_PRICE)}
                  max={formatPrice(MAX_PRICE)}
                  step="0.01"
                  value={formatPrice(localMaxPrice)}
                  onChange={(e) => handleInputChange(e, 'max')}
                  className="pl-7 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Dual Range Slider */}
          <div className="relative px-2">
            <div className="relative h-6 flex items-center">
              {/* Track */}
              <div 
                className="absolute w-full h-2 rounded-full"
                style={{ background: getSliderBackground() }}
              />
              
              {/* Min Slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                value={localMinPrice}
                onChange={(e) => handleSliderChange(e, 'min')}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                onTouchStart={handleSliderMouseDown}
                onTouchEnd={handleSliderMouseUp}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: localMinPrice > MAX_PRICE - 20 ? 2 : 1 }}
              />
              
              {/* Max Slider */}
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={STEP}
                value={localMaxPrice}
                onChange={(e) => handleSliderChange(e, 'max')}
                onMouseDown={handleSliderMouseDown}
                onMouseUp={handleSliderMouseUp}
                onTouchStart={handleSliderMouseDown}
                onTouchEnd={handleSliderMouseUp}
                className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                style={{ zIndex: 2 }}
              />
            </div>
            
            {/* Price Labels */}
            <div className="flex justify-between text-xs text-text-muted mt-2">
              <span>${formatPrice(MIN_PRICE)}</span>
              <span>${formatPrice(MAX_PRICE)}</span>
            </div>
          </div>

          {/* Preset Ranges */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-text-primary">
              Quick Select
            </p>
            <div className="grid grid-cols-3 gap-2">
              {presetRanges.map((preset, index) => {
                const isActive = localMinPrice === preset.min && localMaxPrice === preset.max;
                
                return (
                  <button
                    key={index}
                    onClick={() => handlePresetClick(preset)}
                    className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'bg-surface-secondary text-text-secondary hover:bg-border hover:text-text-primary'
                    }`}
                  >
                    <div className="text-center">
                      <p className="font-semibold">{preset.label}</p>
                      <p className="text-xs opacity-80">{preset.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Statistics */}
          <div className="pt-3 border-t border-default-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-2 bg-surface-secondary rounded-lg">
                <p className="text-xs text-text-secondary">Average Price</p>
                <p className="text-sm font-semibold text-text-primary">$1.67</p>
              </div>
              <div className="p-2 bg-surface-secondary rounded-lg">
                <p className="text-xs text-text-secondary">Savings Range</p>
                <p className="text-sm font-semibold text-success">Up to $0.25</p>
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

export default PriceRangeFilter;