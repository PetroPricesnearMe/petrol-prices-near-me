import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ 
  filters, 
  onRemoveFilter, 
  onClearAll, 
  resultCount,
  isLoading 
}) => {
  const getFilterChips = () => {
    const chips = [];

    // Location filter
    if (filters.location && filters.location.name) {
      chips.push({
        id: 'location',
        type: 'location',
        label: filters.location.name,
        icon: 'MapPin'
      });
    }

    // Fuel type filters
    if (filters.fuelTypes && filters.fuelTypes.length > 0) {
      const fuelTypeNames = {
        'unleaded91': 'Unleaded 91',
        'premium95': 'Premium 95',
        'premium98': 'Premium 98',
        'diesel': 'Diesel',
        'e10': 'E10',
        'e85': 'E85'
      };

      filters.fuelTypes.forEach(fuelType => {
        chips.push({
          id: `fuel-${fuelType}`,
          type: 'fuelType',
          value: fuelType,
          label: fuelTypeNames[fuelType] || fuelType,
          icon: 'Fuel'
        });
      });
    }

    // Price range filter
    if (filters.priceRange && (filters.priceRange.min > 120 || filters.priceRange.max < 220)) {
      const minPrice = (filters.priceRange.min / 100).toFixed(2);
      const maxPrice = (filters.priceRange.max / 100).toFixed(2);
      chips.push({
        id: 'priceRange',
        type: 'priceRange',
        label: `$${minPrice} - $${maxPrice}`,
        icon: 'DollarSign'
      });
    }

    // Distance filter
    if (filters.distance && filters.distance < 100) {
      chips.push({
        id: 'distance',
        type: 'distance',
        label: `Within ${filters.distance}km`,
        icon: 'Navigation'
      });
    }

    // Brand filters
    if (filters.brands && filters.brands.length > 0) {
      const brandNames = {
        'shell': 'Shell',
        'bp': 'BP',
        'caltex': 'Caltex',
        '7eleven': '7-Eleven',
        'mobil': 'Mobil',
        'united': 'United',
        'liberty': 'Liberty',
        'metro': 'Metro'
      };

      filters.brands.forEach(brand => {
        chips.push({
          id: `brand-${brand}`,
          type: 'brand',
          value: brand,
          label: brandNames[brand] || brand,
          icon: 'Star'
        });
      });
    }

    // Operating hours filter
    if (filters.operatingHours && filters.operatingHours !== 'any') {
      const hoursLabels = {
        '24/7': '24/7 Only',
        'current': 'Open Now',
        'early': 'Early Morning',
        'late': 'Late Night'
      };

      chips.push({
        id: 'operatingHours',
        type: 'operatingHours',
        label: hoursLabels[filters.operatingHours] || filters.operatingHours,
        icon: 'Clock'
      });
    }

    // Amenities filters
    if (filters.amenities && filters.amenities.length > 0) {
      const amenityNames = {
        'carwash': 'Car Wash',
        'convenience': 'Convenience Store',
        'atm': 'ATM',
        'restrooms': 'Restrooms',
        'airpump': 'Air Pump',
        'vacuum': 'Vacuum',
        'food': 'Food Service',
        'parking': 'Parking'
      };

      filters.amenities.forEach(amenity => {
        chips.push({
          id: `amenity-${amenity}`,
          type: 'amenity',
          value: amenity,
          label: amenityNames[amenity] || amenity,
          icon: 'Plus'
        });
      });
    }

    // Payment methods filters
    if (filters.paymentMethods && filters.paymentMethods.length > 0) {
      const paymentNames = {
        'cash': 'Cash',
        'eftpos': 'EFTPOS',
        'visa': 'Visa',
        'mastercard': 'Mastercard',
        'amex': 'American Express',
        'paypal': 'PayPal',
        'applepay': 'Apple Pay',
        'googlepay': 'Google Pay'
      };

      filters.paymentMethods.forEach(method => {
        chips.push({
          id: `payment-${method}`,
          type: 'paymentMethod',
          value: method,
          label: paymentNames[method] || method,
          icon: 'CreditCard'
        });
      });
    }

    return chips;
  };

  const filterChips = getFilterChips();
  const hasActiveFilters = filterChips.length > 0;

  const handleRemoveChip = (chip) => {
    onRemoveFilter?.(chip.type, chip.value);
  };

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="bg-surface border border-default-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-primary" />
          <h3 className="text-sm font-medium text-text-primary">
            Active Filters
          </h3>
          <span className="text-xs text-text-secondary">
            ({filterChips.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={onClearAll}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filterChips.map((chip) => (
          <div
            key={chip.id}
            className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary-50 border border-primary-200 rounded-full text-sm"
          >
            <Icon name={chip.icon} size={14} className="text-primary-600" />
            <span className="text-primary-700 font-medium">
              {chip.label}
            </span>
            <button
              onClick={() => handleRemoveChip(chip)}
              className="ml-1 text-primary-600 hover:text-primary-800 transition-colors duration-200"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="pt-3 border-t border-default-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-text-muted" />
            <span className="text-sm text-text-secondary">
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <Icon name="Loader2" size={14} className="animate-spin" />
                  <span>Searching...</span>
                </span>
              ) : (
                `${resultCount} station${resultCount !== 1 ? 's' : ''} found`
              )}
            </span>
          </div>
          
          {/* Quick Stats */}
          {!isLoading && resultCount > 0 && (
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span className="flex items-center space-x-1">
                <Icon name="TrendingDown" size={12} className="text-success" />
                <span>Best: $1.45</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Navigation" size={12} className="text-primary" />
                <span>Nearest: 1.2km</span>
              </span>
            </div>
          )}
        </div>

        {/* No Results Message */}
        {!isLoading && resultCount === 0 && (
          <div className="mt-3 p-3 bg-warning-50 border border-warning-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning-700">
                  No stations match your criteria
                </p>
                <p className="text-xs text-warning-600 mt-1">
                  Try removing some filters or expanding your search area to see more results.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;