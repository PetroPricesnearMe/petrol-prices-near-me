import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ station, onClose }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showPriceAlert, setShowPriceAlert] = useState(false);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(url, '_blank');
  };

  const handleCallStation = () => {
    if (station.phone) {
      window.location.href = `tel:${station.phone}`;
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to localStorage or API
  };

  const handleReportPrice = () => {
    // This would open a price reporting modal
    console.log('Report price for station:', station.id);
  };

  const handleShare = (platform) => {
    const shareText = `Check out ${station.name} - ${station.address}`;
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
    }
    setShowShareMenu(false);
  };

  const handleSetPriceAlert = () => {
    setShowPriceAlert(!showPriceAlert);
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="primary"
          iconName="Navigation"
          iconPosition="left"
          onClick={handleGetDirections}
          fullWidth
        >
          Get Directions
        </Button>
        <Button
          variant="secondary"
          iconName="Phone"
          iconPosition="left"
          onClick={handleCallStation}
          fullWidth
          disabled={!station.phone}
        >
          Call Station
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Button
          variant={isFavorite ? "success" : "outline"}
          iconName={isFavorite ? "Heart" : "Heart"}
          iconPosition="left"
          onClick={handleToggleFavorite}
          size="sm"
          fullWidth
        >
          {isFavorite ? 'Saved' : 'Save'}
        </Button>
        
        <Button
          variant="outline"
          iconName="AlertCircle"
          iconPosition="left"
          onClick={handleSetPriceAlert}
          size="sm"
          fullWidth
        >
          Alert
        </Button>
        
        <Button
          variant="outline"
          iconName="Flag"
          iconPosition="left"
          onClick={handleReportPrice}
          size="sm"
          fullWidth
        >
          Report
        </Button>
        
        <div className="relative">
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            onClick={() => setShowShareMenu(!showShareMenu)}
            size="sm"
            fullWidth
          >
            Share
          </Button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute bottom-full mb-2 left-0 right-0 bg-surface border border-border rounded-lg shadow-elevation-3 z-dropdown animate-fade-in">
              <div className="p-2 space-y-1">
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Copy" size={16} />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="MessageCircle" size={16} />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Facebook" size={16} />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-surface-secondary rounded-md transition-colors duration-200"
                >
                  <Icon name="Twitter" size={16} />
                  <span>Twitter</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Alert Section */}
      {showPriceAlert && (
        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg animate-fade-in">
          <div className="flex items-start space-x-3">
            <Icon name="Bell" size={18} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary-800 mb-2">
                Set Price Alert
              </h4>
              <p className="text-xs text-primary-700 mb-3">
                Get notified when fuel prices drop below your target price.
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="1.50"
                  className="w-20 px-2 py-1 text-sm border border-primary-300 rounded focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <span className="text-xs text-primary-700">AUD per litre</span>
                <Button variant="primary" size="xs">
                  Set Alert
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Close Button for Mobile */}
      <div className="sm:hidden pt-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={onClose}
          fullWidth
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;