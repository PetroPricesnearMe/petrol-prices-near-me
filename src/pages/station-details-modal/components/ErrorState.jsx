import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ErrorState = ({ onRetry, onClose, errorType = 'general' }) => {
  const getErrorContent = () => {
    switch (errorType) {
      case 'network':
        return {
          icon: 'Wifi',
          title: 'Connection Error',
          message: 'Unable to load station details. Please check your internet connection and try again.',
          actionText: 'Retry'
        };
      case 'notFound':
        return {
          icon: 'MapPin',
          title: 'Station Not Found',
          message: 'The requested station could not be found. It may have been removed or is temporarily unavailable.',
          actionText: 'Go Back'
        };
      case 'priceData':
        return {
          icon: 'DollarSign',
          title: 'Price Data Unavailable',
          message: 'Current fuel prices are not available for this station. You can still view basic information and get directions.',
          actionText: 'Continue Anyway'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Something Went Wrong',
          message: 'We encountered an error while loading the station details. Please try again or contact support if the problem persists.',
          actionText: 'Try Again'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={errorContent.icon} size={32} className="text-error" />
      </div>
      
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
        {errorContent.title}
      </h2>
      
      <p className="text-text-secondary mb-6 max-w-md leading-relaxed">
        {errorContent.message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Button
          variant="primary"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={onRetry}
          fullWidth
        >
          {errorContent.actionText}
        </Button>
        
        <Button
          variant="outline"
          onClick={onClose}
          fullWidth
        >
          Close
        </Button>
      </div>
      
      {/* Additional Help */}
      <div className="mt-8 p-4 bg-surface-secondary rounded-lg max-w-md">
        <h3 className="text-sm font-medium text-text-primary mb-2">
          Need Help?
        </h3>
        <div className="space-y-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={14} />
            <span>Report missing or incorrect station data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Mail" size={14} />
            <span>Contact support: help@melbournefuelfinder.com.au</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={14} />
            <span>Call: 1800 FUEL HELP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;