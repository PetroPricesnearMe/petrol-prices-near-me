import React, { useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showCloseButton = true,
  closeOnBackdrop = true,
  footer,
  className = ''
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && closeOnBackdrop) {
      onClose?.();
    }
  };

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal-backdrop">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* Modal Container */}
      <div className="relative z-modal flex items-center justify-center min-h-full p-4">
        <div 
          className={`
            relative w-full ${sizeClasses[size]} 
            bg-surface rounded-xl shadow-elevation-4 
            transform transition-all duration-300 ease-out
            animate-fade-in
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-border">
              {title && (
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={onClose}
                  className="ml-auto"
                />
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface-secondary rounded-b-xl">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Station Details Modal Component
const StationDetailsModal = ({ isOpen, onClose, station }) => {
  if (!station) return null;

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(url, '_blank');
  };

  const handleCallStation = () => {
    if (station.phone) {
      window.location.href = `tel:${station.phone}`;
    }
  };

  const fuelPrices = station.fuelPrices || [
    { type: 'Unleaded 91', price: 1.65, lastUpdated: '2 hours ago' },
    { type: 'Premium 95', price: 1.75, lastUpdated: '2 hours ago' },
    { type: 'Diesel', price: 1.58, lastUpdated: '3 hours ago' },
  ];

  const amenities = station.amenities || [
    '24/7 Open', 'Car Wash', 'Convenience Store', 'ATM', 'Restrooms'
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={station.name || 'Station Details'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            variant="secondary" 
            iconName="Phone" 
            iconPosition="left"
            onClick={handleCallStation}
            disabled={!station.phone}
          >
            Call Station
          </Button>
          <Button 
            variant="primary" 
            iconName="Navigation" 
            iconPosition="left"
            onClick={handleGetDirections}
          >
            Get Directions
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Station Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Station Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Icon name="MapPin" size={16} className="text-text-muted mt-1" />
                  <div>
                    <p className="text-sm text-text-primary">{station.address}</p>
                    <p className="text-xs text-text-secondary">{station.suburb}, {station.postcode}</p>
                  </div>
                </div>
                {station.phone && (
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-text-muted" />
                    <span className="text-sm text-text-primary">{station.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">
                    {station.hours || '24/7'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Navigation" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">
                    {station.distance || '2.3'} km away
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-md font-heading font-medium text-text-primary mb-2">
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-xs text-text-secondary"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Fuel Prices */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
              Current Fuel Prices
            </h3>
            <div className="space-y-3">
              {fuelPrices.map((fuel, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg"
                >
                  <div>
                    <p className="font-medium text-text-primary">{fuel.type}</p>
                    <p className="text-xs text-text-secondary">Updated {fuel.lastUpdated}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-data font-semibold text-primary">
                      ${fuel.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-text-muted">per litre</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Price Comparison */}
            <div className="mt-4 p-3 bg-accent-50 rounded-lg border border-accent-200">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingDown" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent-700">
                  Save up to $0.12/L compared to nearby stations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews/Updates */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
            Recent Updates
          </h3>
          <div className="space-y-2">
            <div className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
              <Icon name="Clock" size={16} className="text-text-muted mt-1" />
              <div>
                <p className="text-sm text-text-primary">Prices updated 2 hours ago</p>
                <p className="text-xs text-text-secondary">Verified by community member</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
              <Icon name="CheckCircle" size={16} className="text-success mt-1" />
              <div>
                <p className="text-sm text-text-primary">Station confirmed open</p>
                <p className="text-xs text-text-secondary">Verified 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Modal;
export { StationDetailsModal };