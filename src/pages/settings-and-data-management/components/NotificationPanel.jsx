import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import Icon from '../../../components/AppIcon';

const NotificationPanel = ({ notifications, onNotificationChange }) => {
  const alertTypes = [
    {
      id: 'priceDrops',
      label: 'Price Drop Alerts',
      description: 'Get notified when fuel prices drop below your threshold',
      icon: 'TrendingDown'
    },
    {
      id: 'newStations',
      label: 'New Station Alerts',
      description: 'Be informed when new fuel stations are added to your area',
      icon: 'MapPin'
    },
    {
      id: 'priceUpdates',
      label: 'Price Update Notifications',
      description: 'Receive updates when station prices are refreshed',
      icon: 'RefreshCw'
    },
    {
      id: 'maintenanceAlerts',
      label: 'Maintenance Notifications',
      description: 'Get notified about app updates and maintenance schedules',
      icon: 'Settings'
    }
  ];

  const updateFrequencies = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'hourly', label: 'Hourly digest' },
    { value: 'daily', label: 'Daily summary' },
    { value: 'weekly', label: 'Weekly report' },
  ];

  return (
    <div className="space-y-6">
      {/* Push Notifications Master Toggle */}
      <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <ToggleSwitch
          id="pushNotifications"
          label="Enable Push Notifications"
          description="Allow the app to send notifications to your device"
          checked={notifications.pushEnabled}
          onChange={(checked) => onNotificationChange('pushEnabled', checked)}
        />
        
        {!notifications.pushEnabled && (
          <div className="mt-3 flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <p className="text-sm text-primary-700">
              Enable push notifications to receive real-time alerts about fuel prices and station updates.
            </p>
          </div>
        )}
      </div>

      {/* Notification Types */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-4">Notification Types</h4>
        <div className="space-y-4">
          {alertTypes.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg mt-1">
                <Icon name={alert.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <ToggleSwitch
                  id={alert.id}
                  label={alert.label}
                  description={alert.description}
                  checked={notifications[alert.id]}
                  onChange={(checked) => onNotificationChange(alert.id, checked)}
                  disabled={!notifications.pushEnabled}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Frequency */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Notification Frequency
        </label>
        <select
          value={notifications.updateFrequency}
          onChange={(e) => onNotificationChange('updateFrequency', e.target.value)}
          disabled={!notifications.pushEnabled}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updateFrequencies.map((freq) => (
            <option key={freq.value} value={freq.value}>
              {freq.label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-text-secondary">
          How often you want to receive notification updates
        </p>
      </div>

      {/* Quiet Hours */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Quiet Hours</h4>
        <ToggleSwitch
          id="quietHours"
          label="Enable Quiet Hours"
          description="Pause notifications during specified hours"
          checked={notifications.quietHours}
          onChange={(checked) => onNotificationChange('quietHours', checked)}
          disabled={!notifications.pushEnabled}
        />
        
        {notifications.quietHours && notifications.pushEnabled && (
          <div className="mt-4 grid grid-cols-2 gap-4 animate-fade-in">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={notifications.quietStart}
                onChange={(e) => onNotificationChange('quietStart', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                End Time
              </label>
              <input
                type="time"
                value={notifications.quietEnd}
                onChange={(e) => onNotificationChange('quietEnd', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              />
            </div>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-secondary-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-text-primary mb-1">Privacy & Notifications</h5>
            <p className="text-sm text-text-secondary">
              We only send notifications for the alerts you've enabled. Your notification preferences 
              are stored locally and can be changed at any time. We never share your notification 
              data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;