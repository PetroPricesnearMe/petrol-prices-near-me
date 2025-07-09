import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StationHeader = ({ station, onClose }) => {
  const getBrandLogo = (brand) => {
    const brandLogos = {
      'Shell': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      'BP': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      'Caltex': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      '7-Eleven': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      'Mobil': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      'United': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop'
    };
    return brandLogos[brand] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop';
  };

  return (
    <div className="flex items-center justify-between p-4 lg:p-6 border-b border-default-border bg-surface">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-surface-secondary flex-shrink-0">
          <Image
            src={getBrandLogo(station.brand)}
            alt={`${station.brand} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg lg:text-xl font-heading font-semibold text-text-primary truncate">
            {station.name}
          </h2>
          <p className="text-sm text-text-secondary truncate">
            {station.brand} • {station.distance} km away
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon name="MapPin" size={14} className="text-text-muted" />
            <p className="text-xs text-text-muted truncate">
              {station.address}, {station.suburb} {station.postcode}
            </p>
          </div>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-surface-secondary rounded-lg transition-colors duration-200 flex-shrink-0"
        aria-label="Close modal"
      >
        <Icon name="X" size={20} className="text-text-muted" />
      </button>
    </div>
  );
};

export default StationHeader;