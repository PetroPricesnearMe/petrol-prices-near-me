import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import Input from '../../../components/ui/Input';

const PreferencesPanel = ({ preferences, onPreferenceChange }) => {
  const fuelTypes = [
    { value: 'unleaded', label: 'Unleaded 91' },
    { value: 'premium', label: 'Premium 95' },
    { value: 'premium98', label: 'Premium 98' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'e10', label: 'E10' },
  ];

  const measurementUnits = [
    { value: 'metric', label: 'Metric (km, litres)' },
    { value: 'imperial', label: 'Imperial (miles, gallons)' },
  ];

  const refreshIntervals = [
    { value: '15', label: 'Every 15 minutes' },
    { value: '30', label: 'Every 30 minutes' },
    { value: '60', label: 'Every hour' },
    { value: '180', label: 'Every 3 hours' },
    { value: 'manual', label: 'Manual only' },
  ];

  return (
    <div className="space-y-6">
      {/* Default Fuel Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Default Fuel Type
        </label>
        <select
          value={preferences.defaultFuelType}
          onChange={(e) => onPreferenceChange('defaultFuelType', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
        >
          {fuelTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-secondary">
          This fuel type will be selected by default when searching
        </p>
      </div>

      {/* Measurement Units */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Measurement Units
        </label>
        <select
          value={preferences.measurementUnits}
          onChange={(e) => onPreferenceChange('measurementUnits', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
        >
          {measurementUnits.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Alert Threshold */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Price Alert Threshold
        </label>
        <div className="flex items-center space-x-3">
          <Input
            type="number"
            step="0.01"
            min="0"
            max="5"
            value={preferences.priceAlertThreshold}
            onChange={(e) => onPreferenceChange('priceAlertThreshold', parseFloat(e.target.value))}
            className="flex-1"
            placeholder="1.50"
          />
          <span className="text-sm text-text-secondary">AUD per litre</span>
        </div>
        <p className="mt-1 text-xs text-text-secondary">
          Get notified when fuel prices drop below this amount
        </p>
      </div>

      {/* Data Refresh Interval */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Price Update Frequency
        </label>
        <select
          value={preferences.refreshInterval}
          onChange={(e) => onPreferenceChange('refreshInterval', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
        >
          {refreshIntervals.map((interval) => (
            <option key={interval.value} value={interval.value}>
              {interval.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-secondary">
          How often to check for updated fuel prices
        </p>
      </div>

      {/* Location Sharing */}
      <ToggleSwitch
        id="locationSharing"
        label="Location Sharing"
        description="Allow the app to access your location for nearby station recommendations"
        checked={preferences.locationSharing}
        onChange={(checked) => onPreferenceChange('locationSharing', checked)}
      />

      {/* Auto-Save Searches */}
      <ToggleSwitch
        id="autoSaveSearches"
        label="Auto-Save Searches"
        description="Automatically save your search filters and preferences"
        checked={preferences.autoSaveSearches}
        onChange={(checked) => onPreferenceChange('autoSaveSearches', checked)}
      />

      {/* Show Price Trends */}
      <ToggleSwitch
        id="showPriceTrends"
        label="Show Price Trends"
        description="Display price history and trend indicators on station details"
        checked={preferences.showPriceTrends}
        onChange={(checked) => onPreferenceChange('showPriceTrends', checked)}
      />
    </div>
  );
};

export default PreferencesPanel;