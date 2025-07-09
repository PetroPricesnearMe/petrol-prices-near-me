import React from 'react';
import Icon from '../../../components/AppIcon';

const FuelPricesGrid = ({ fuelPrices }) => {
  const getFreshnessColor = (lastUpdated) => {
    const hours = parseInt(lastUpdated.split(' ')[0]);
    if (hours <= 2) return 'text-success';
    if (hours <= 6) return 'text-warning';
    return 'text-error';
  };

  const getFreshnessIcon = (lastUpdated) => {
    const hours = parseInt(lastUpdated.split(' ')[0]);
    if (hours <= 2) return 'CheckCircle';
    if (hours <= 6) return 'Clock';
    return 'AlertCircle';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Current Fuel Prices
        </h3>
        <button className="flex items-center space-x-1 text-sm text-primary hover:text-primary-700 transition-colors duration-200">
          <Icon name="RefreshCw" size={16} />
          <span>Refresh</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fuelPrices.map((fuel, index) => (
          <div 
            key={index}
            className="p-4 bg-surface-secondary rounded-lg border border-default-border hover:shadow-elevation-2 transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-medium text-text-primary">{fuel.type}</h4>
                <div className="flex items-center space-x-1 mt-1">
                  <Icon 
                    name={getFreshnessIcon(fuel.lastUpdated)} 
                    size={12} 
                    className={getFreshnessColor(fuel.lastUpdated)} 
                  />
                  <span className={`text-xs ${getFreshnessColor(fuel.lastUpdated)}`}>
                    Updated {fuel.lastUpdated}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl lg:text-2xl font-data font-bold text-primary">
                  ${fuel.price.toFixed(2)}
                </p>
                <p className="text-xs text-text-muted">per litre</p>
              </div>
            </div>
            
            {fuel.trend && (
              <div className="flex items-center space-x-1 mt-2">
                <Icon 
                  name={fuel.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                  className={fuel.trend === 'up' ? 'text-error' : 'text-success'} 
                />
                <span className={`text-xs ${fuel.trend === 'up' ? 'text-error' : 'text-success'}`}>
                  {fuel.trend === 'up' ? '+' : '-'}$0.0{Math.floor(Math.random() * 9) + 1} from yesterday
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Price Comparison Alert */}
      <div className="p-3 bg-accent-50 rounded-lg border border-accent-200">
        <div className="flex items-start space-x-2">
          <Icon name="TrendingDown" size={16} className="text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium text-accent-700">
              Best Price in Area
            </p>
            <p className="text-xs text-accent-600 mt-1">
              Save up to $0.15/L compared to nearby stations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelPricesGrid;