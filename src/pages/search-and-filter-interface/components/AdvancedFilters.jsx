import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const AdvancedFilters = ({ 
  selectedBrands, 
  selectedAmenities, 
  selectedPaymentMethods,
  operatingHours,
  onBrandsChange, 
  onAmenitiesChange, 
  onPaymentMethodsChange,
  onOperatingHoursChange,
  isCollapsed, 
  onToggleCollapse 
}) => {
  const fuelBrands = [
    { id: 'shell', name: 'Shell', logo: '🐚', color: 'text-red-600' },
    { id: 'bp', name: 'BP', logo: '🟢', color: 'text-green-600' },
    { id: 'caltex', name: 'Caltex', logo: '⭐', color: 'text-blue-600' },
    { id: '7eleven', name: '7-Eleven', logo: '7️⃣', color: 'text-orange-600' },
    { id: 'mobil', name: 'Mobil', logo: '🔴', color: 'text-red-500' },
    { id: 'united', name: 'United', logo: '🔵', color: 'text-blue-500' },
    { id: 'liberty', name: 'Liberty', logo: '🗽', color: 'text-purple-600' },
    { id: 'metro', name: 'Metro', logo: '🚇', color: 'text-gray-600' }
  ];

  const amenities = [
    { id: 'carwash', name: 'Car Wash', icon: 'Car', description: 'Automatic or self-service' },
    { id: 'convenience', name: 'Convenience Store', icon: 'ShoppingBag', description: 'Snacks and essentials' },
    { id: 'atm', name: 'ATM', icon: 'CreditCard', description: 'Cash withdrawal' },
    { id: 'restrooms', name: 'Restrooms', icon: 'Home', description: 'Public facilities' },
    { id: 'airpump', name: 'Air Pump', icon: 'Wind', description: 'Tire inflation' },
    { id: 'vacuum', name: 'Vacuum', icon: 'Zap', description: 'Car cleaning' },
    { id: 'food', name: 'Food Service', icon: 'Coffee', description: 'Hot food and drinks' },
    { id: 'parking', name: 'Parking', icon: 'Square', description: 'Customer parking' }
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash', icon: 'Banknote' },
    { id: 'eftpos', name: 'EFTPOS', icon: 'CreditCard' },
    { id: 'visa', name: 'Visa', icon: 'CreditCard' },
    { id: 'mastercard', name: 'Mastercard', icon: 'CreditCard' },
    { id: 'amex', name: 'American Express', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Smartphone' },
    { id: 'applepay', name: 'Apple Pay', icon: 'Smartphone' },
    { id: 'googlepay', name: 'Google Pay', icon: 'Smartphone' }
  ];

  const operatingHoursOptions = [
    { id: 'any', name: 'Any Time', description: 'No time restrictions' },
    { id: '24/7', name: '24/7 Only', description: 'Always open' },
    { id: 'current', name: 'Open Now', description: 'Currently operating' },
    { id: 'early', name: 'Early Morning', description: 'Open before 7 AM' },
    { id: 'late', name: 'Late Night', description: 'Open after 10 PM' }
  ];

  const handleBrandToggle = (brandId) => {
    const updatedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter(id => id !== brandId)
      : [...selectedBrands, brandId];
    onBrandsChange?.(updatedBrands);
  };

  const handleAmenityToggle = (amenityId) => {
    const updatedAmenities = selectedAmenities.includes(amenityId)
      ? selectedAmenities.filter(id => id !== amenityId)
      : [...selectedAmenities, amenityId];
    onAmenitiesChange?.(updatedAmenities);
  };

  const handlePaymentMethodToggle = (methodId) => {
    const updatedMethods = selectedPaymentMethods.includes(methodId)
      ? selectedPaymentMethods.filter(id => id !== methodId)
      : [...selectedPaymentMethods, methodId];
    onPaymentMethodsChange?.(updatedMethods);
  };

  const getActiveFiltersCount = () => {
    return selectedBrands.length + selectedAmenities.length + selectedPaymentMethods.length + 
           (operatingHours !== 'any' ? 1 : 0);
  };

  return (
    <div className="border border-default-border rounded-lg bg-surface">
      {/* Header */}
      <button
        onClick={onToggleCollapse}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-secondary transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <Icon name="Settings" size={20} className="text-primary" />
          <div className="text-left">
            <h3 className="text-sm font-medium text-text-primary">
              Advanced Filters
            </h3>
            <p className="text-xs text-text-secondary">
              {getActiveFiltersCount() === 0 ? 'No advanced filters applied' : 
               `${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} applied`}
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
        <div className="px-4 pb-4 space-y-6">
          {/* Brand Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">
                Preferred Brands
              </h4>
              <button
                onClick={() => onBrandsChange?.([])}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                disabled={selectedBrands.length === 0}
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {fuelBrands.map((brand) => {
                const isSelected = selectedBrands.includes(brand.id);
                
                return (
                  <label
                    key={brand.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary-50' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                    }`}
                  >
                    <Input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleBrandToggle(brand.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-lg">{brand.logo}</span>
                    <span className={`text-sm font-medium ${
                      isSelected ? 'text-primary-700' : 'text-text-primary'
                    }`}>
                      {brand.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">
              Operating Hours
            </h4>
            <div className="space-y-2">
              {operatingHoursOptions.map((option) => {
                const isSelected = operatingHours === option.id;
                
                return (
                  <label
                    key={option.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary-50' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                    }`}
                  >
                    <Input
                      type="radio"
                      name="operatingHours"
                      checked={isSelected}
                      onChange={() => onOperatingHoursChange?.(option.id)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isSelected ? 'text-primary-700' : 'text-text-primary'
                      }`}>
                        {option.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {option.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">
                Amenities
              </h4>
              <button
                onClick={() => onAmenitiesChange?.([])}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                disabled={selectedAmenities.length === 0}
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {amenities.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.id);
                
                return (
                  <label
                    key={amenity.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary-50' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                    }`}
                  >
                    <Input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleAmenityToggle(amenity.id)}
                      className="w-4 h-4"
                    />
                    <Icon name={amenity.icon} size={16} className="text-text-muted" />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isSelected ? 'text-primary-700' : 'text-text-primary'
                      }`}>
                        {amenity.name}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {amenity.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-text-primary">
                Payment Methods
              </h4>
              <button
                onClick={() => onPaymentMethodsChange?.([])}
                className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-200"
                disabled={selectedPaymentMethods.length === 0}
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map((method) => {
                const isSelected = selectedPaymentMethods.includes(method.id);
                
                return (
                  <label
                    key={method.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-primary bg-primary-50' :'border-default-border hover:border-default-border-dark hover:bg-surface-secondary'
                    }`}
                  >
                    <Input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handlePaymentMethodToggle(method.id)}
                      className="w-4 h-4"
                    />
                    <Icon name={method.icon} size={14} className="text-text-muted" />
                    <span className={`text-xs font-medium ${
                      isSelected ? 'text-primary-700' : 'text-text-primary'
                    }`}>
                      {method.name}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;