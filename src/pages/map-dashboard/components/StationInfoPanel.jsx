import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StationInfoPanel = ({ station, isOpen, onClose, onGetDirections, onCallStation }) => {
  if (!station || !isOpen) return null;

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(url, '_blank');
    onGetDirections?.(station);
  };

  const handleCallStation = () => {
    if (station.phone) {
      window.location.href = `tel:${station.phone}`;
      onCallStation?.(station);
    }
  };

  const getLowestPrice = () => {
    const prices = Object.values(station.prices || {});
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  const getBestFuelType = () => {
    if (!station.prices) return null;
    const entries = Object.entries(station.prices);
    return entries.reduce((best, [type, price]) => 
      !best || price < best.price ? { type, price } : best
    , null);
  };

  const bestFuel = getBestFuelType();

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop lg:hidden"
        onClick={onClose}
      />
      
      {/* Info Panel */}
      <div className={`
        fixed lg:absolute bottom-0 lg:bottom-auto lg:top-4 left-0 right-0 lg:left-4 lg:right-auto lg:w-80 xl:w-96
        bg-surface border-t lg:border lg:border-border rounded-t-2xl lg:rounded-xl shadow-elevation-4 z-modal
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-y-0' : 'translate-y-full lg:translate-y-0 lg:translate-x-full'}
      `}>
        {/* Handle Bar - Mobile Only */}
        <div className="lg:hidden flex justify-center pt-2 pb-1">
          <div className="w-12 h-1 bg-border rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between p-4 lg:p-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: station.brand === 'Shell' ? '#FFD700' : 
                                        station.brand === 'BP' ? '#00A651' :
                                        station.brand === 'Caltex' ? '#E31837' :
                                        station.brand === '7-Eleven' ? '#FF6600' :
                                        station.brand === 'Mobil' ? '#0066CC' :
                                        station.brand === 'United' ? '#8B0000' : '#2563EB' }}
              />
              <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                {station.brand}
              </span>
            </div>
            <h2 className="text-lg lg:text-xl font-heading font-semibold text-text-primary leading-tight">
              {station.name}
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              {station.address}, {station.suburb} {station.postcode}
            </p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="ml-2 flex-shrink-0"
          />
        </div>

        {/* Best Price Highlight */}
        {bestFuel && (
          <div className="mx-4 lg:mx-6 mb-4 p-3 bg-success-50 border border-success-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingDown" size={16} className="text-success" />
                <span className="text-sm font-medium text-success-700">Best Price</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-data font-bold text-success-700">
                  ${bestFuel.price.toFixed(2)}
                </p>
                <p className="text-xs text-success-600">{bestFuel.type}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 lg:px-6 pb-4 space-y-4 max-h-96 lg:max-h-none overflow-y-auto">
          {/* Fuel Prices */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Current Fuel Prices
            </h3>
            <div className="space-y-2">
              {Object.entries(station.prices || {}).map(([fuelType, price]) => (
                <div 
                  key={fuelType}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Fuel" size={16} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-primary">{fuelType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-data font-semibold text-text-primary">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-xs text-text-muted ml-1">per litre</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2 flex items-center">
              <Icon name="Clock" size={12} className="mr-1" />
              Last updated {station.lastUpdated}
            </p>
          </div>

          {/* Station Details */}
          <div>
            <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
              Station Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-text-muted" />
                <span className="text-sm text-text-primary">
                  {station.address}, {station.suburb} {station.postcode}
                </span>
              </div>
              {station.phone && (
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">{station.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Icon name="Navigation" size={16} className="text-text-muted" />
                <span className="text-sm text-text-primary">
                  2.3 km away • 5 min drive
                </span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {station.amenities && station.amenities.length > 0 && (
            <div>
              <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {station.amenities.map((amenity, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-xs text-text-secondary"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-surface-secondary rounded-lg">
              <Icon name="Star" size={16} className="text-warning mx-auto mb-1" />
              <p className="text-xs text-text-muted">Rating</p>
              <p className="text-sm font-semibold text-text-primary">4.2/5</p>
            </div>
            <div className="text-center p-3 bg-surface-secondary rounded-lg">
              <Icon name="Users" size={16} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-text-muted">Reviews</p>
              <p className="text-sm font-semibold text-text-primary">127</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 lg:p-6 border-t border-border bg-surface-secondary">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
              onClick={handleCallStation}
              disabled={!station.phone}
              fullWidth
            >
              Call
            </Button>
            <Button
              variant="primary"
              size="sm"
              iconName="Navigation"
              iconPosition="left"
              onClick={handleGetDirections}
              fullWidth
            >
              Directions
            </Button>
          </div>
          
          {/* Additional Actions */}
          <div className="flex justify-center space-x-4 mt-3">
            <Button
              variant="ghost"
              size="2xs"
              iconName="Heart"
              className="text-text-muted hover:text-error"
            >
              Save
            </Button>
            <Button
              variant="ghost"
              size="2xs"
              iconName="Share"
              className="text-text-muted"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="2xs"
              iconName="Flag"
              className="text-text-muted"
            >
              Report
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StationInfoPanel;