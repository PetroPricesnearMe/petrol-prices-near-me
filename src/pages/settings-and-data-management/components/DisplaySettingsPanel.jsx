import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const DisplaySettingsPanel = ({ displaySettings, onDisplaySettingChange }) => {
  const mapThemes = [
    { value: 'standard', label: 'Standard', description: 'Clean, minimal map design' },
    { value: 'satellite', label: 'Satellite', description: 'Aerial imagery view' },
    { value: 'terrain', label: 'Terrain', description: 'Topographical features' },
    { value: 'dark', label: 'Dark Mode', description: 'Dark theme for night use' },
  ];

  const priceFormats = [
    { value: 'decimal', label: '$1.65', description: 'Standard decimal format' },
    { value: 'cents', label: '165¢', description: 'Cents per litre' },
    { value: 'rounded', label: '$1.70', description: 'Rounded to nearest 5 cents' },
  ];

  const clusteringOptions = [
    { value: 'auto', label: 'Automatic', description: 'Smart clustering based on zoom level' },
    { value: 'always', label: 'Always Cluster', description: 'Group nearby stations at all zoom levels' },
    { value: 'never', label: 'Never Cluster', description: 'Show individual markers always' },
  ];

  return (
    <div className="space-y-6">
      {/* Map Theme */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Map Theme
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mapThemes.map((theme) => (
            <label
              key={theme.value}
              className={`
                relative flex items-start p-3 border rounded-lg cursor-pointer transition-all duration-200
                ${displaySettings.mapTheme === theme.value
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:bg-surface-secondary'
                }
              `}
            >
              <input
                type="radio"
                name="mapTheme"
                value={theme.value}
                checked={displaySettings.mapTheme === theme.value}
                onChange={(e) => onDisplaySettingChange('mapTheme', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <div className={`
                    w-4 h-4 rounded-full border-2 transition-colors duration-200
                    ${displaySettings.mapTheme === theme.value
                      ? 'border-primary bg-primary' :'border-secondary-300'
                    }
                  `}>
                    {displaySettings.mapTheme === theme.value && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span className="font-medium text-text-primary">{theme.label}</span>
                </div>
                <p className="text-xs text-text-secondary mt-1 ml-6">
                  {theme.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Display Format */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Price Display Format
        </label>
        <div className="space-y-2">
          {priceFormats.map((format) => (
            <label
              key={format.value}
              className={`
                flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all duration-200
                ${displaySettings.priceFormat === format.value
                  ? 'border-primary bg-primary-50' :'border-border bg-surface hover:bg-surface-secondary'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="priceFormat"
                  value={format.value}
                  checked={displaySettings.priceFormat === format.value}
                  onChange={(e) => onDisplaySettingChange('priceFormat', e.target.value)}
                  className="w-4 h-4 text-primary border-secondary-300 focus:ring-primary"
                />
                <div>
                  <span className="font-medium text-text-primary">{format.label}</span>
                  <p className="text-xs text-text-secondary">{format.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Marker Clustering */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Marker Clustering
        </label>
        <select
          value={displaySettings.markerClustering}
          onChange={(e) => onDisplaySettingChange('markerClustering', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
        >
          {clusteringOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-secondary">
          Control how station markers are grouped on the map
        </p>
      </div>

      {/* Display Options */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">Display Options</h4>
        
        <ToggleSwitch
          id="showPriceLabels"
          label="Show Price Labels"
          description="Display fuel prices directly on map markers"
          checked={displaySettings.showPriceLabels}
          onChange={(checked) => onDisplaySettingChange('showPriceLabels', checked)}
        />

        <ToggleSwitch
          id="showDistanceLabels"
          label="Show Distance Labels"
          description="Display distance from your location on station cards"
          checked={displaySettings.showDistanceLabels}
          onChange={(checked) => onDisplaySettingChange('showDistanceLabels', checked)}
        />

        <ToggleSwitch
          id="highlightCheapest"
          label="Highlight Cheapest Stations"
          description="Use special markers for stations with lowest prices"
          checked={displaySettings.highlightCheapest}
          onChange={(checked) => onDisplaySettingChange('highlightCheapest', checked)}
        />

        <ToggleSwitch
          id="showOpenOnly"
          label="Show Open Stations Only"
          description="Hide stations that are currently closed"
          checked={displaySettings.showOpenOnly}
          onChange={(checked) => onDisplaySettingChange('showOpenOnly', checked)}
        />

        <ToggleSwitch
          id="compactView"
          label="Compact Station List"
          description="Use smaller cards in the station list view"
          checked={displaySettings.compactView}
          onChange={(checked) => onDisplaySettingChange('compactView', checked)}
        />
      </div>
    </div>
  );
};

export default DisplaySettingsPanel;