import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import SettingsSection from './components/SettingsSection';
import DataManagementPanel from './components/DataManagementPanel';
import PreferencesPanel from './components/PreferencesPanel';
import DisplaySettingsPanel from './components/DisplaySettingsPanel';
import NotificationPanel from './components/NotificationPanel';
import AccountPanel from './components/AccountPanel';

const SettingsAndDataManagement = () => {
  const [expandedSections, setExpandedSections] = useState({
    dataManagement: true,
    preferences: false,
    display: false,
    notifications: false,
    account: false
  });

  const [preferences, setPreferences] = useState({
    defaultFuelType: 'unleaded',
    measurementUnits: 'metric',
    priceAlertThreshold: 1.50,
    refreshInterval: '30',
    locationSharing: true,
    autoSaveSearches: true,
    showPriceTrends: true
  });

  const [displaySettings, setDisplaySettings] = useState({
    mapTheme: 'standard',
    priceFormat: 'decimal',
    markerClustering: 'auto',
    showPriceLabels: true,
    showDistanceLabels: true,
    highlightCheapest: true,
    showOpenOnly: false,
    compactView: false
  });

  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    priceDrops: true,
    newStations: false,
    priceUpdates: true,
    maintenanceAlerts: true,
    updateFrequency: 'hourly',
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '07:00'
  });

  const [accountSettings, setAccountSettings] = useState({
    autoBackup: true,
    locationTracking: true,
    usageAnalytics: false,
    crashReporting: true
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleDisplaySettingChange = (key, value) => {
    setDisplaySettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleAccountSettingChange = (key, value) => {
    setAccountSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    // Mock save functionality
    console.log('Saving settings...', {
      preferences,
      displaySettings,
      notifications,
      accountSettings
    });
    setHasUnsavedChanges(false);
    // Show success message
  };

  const handleResetToDefaults = () => {
    setPreferences({
      defaultFuelType: 'unleaded',
      measurementUnits: 'metric',
      priceAlertThreshold: 1.50,
      refreshInterval: '30',
      locationSharing: true,
      autoSaveSearches: true,
      showPriceTrends: true
    });
    setDisplaySettings({
      mapTheme: 'standard',
      priceFormat: 'decimal',
      markerClustering: 'auto',
      showPriceLabels: true,
      showDistanceLabels: true,
      highlightCheapest: true,
      showOpenOnly: false,
      compactView: false
    });
    setNotifications({
      pushEnabled: true,
      priceDrops: true,
      newStations: false,
      priceUpdates: true,
      maintenanceAlerts: true,
      updateFrequency: 'hourly',
      quietHours: true,
      quietStart: '22:00',
      quietEnd: '07:00'
    });
    setAccountSettings({
      autoBackup: true,
      locationTracking: true,
      usageAnalytics: false,
      crashReporting: true
    });
    setHasUnsavedChanges(true);
  };

  const handleExportMyData = () => {
    // Mock export functionality
    const exportData = {
      preferences,
      displaySettings,
      notifications,
      accountSettings,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `melbourne-fuel-finder-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
              <Link to="/map-dashboard" className="hover:text-primary transition-colors duration-200">
                Dashboard
              </Link>
              <Icon name="ChevronRight" size={16} />
              <span>Settings & Data Management</span>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                  Settings & Data Management
                </h1>
                <p className="text-text-secondary max-w-2xl">
                  Configure your preferences, manage uploaded data, and control privacy settings 
                  for a personalized fuel tracking experience.
                </p>
              </div>
              
              {/* Quick Actions - Desktop */}
              <div className="hidden lg:flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={handleResetToDefaults}
                >
                  Reset to Defaults
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportMyData}
                >
                  Export My Data
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Save"
                  iconPosition="left"
                  onClick={handleSaveChanges}
                  disabled={!hasUnsavedChanges}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Settings Navigation - Desktop Sidebar */}
            <div className="hidden xl:block">
              <div className="sticky top-24 space-y-2">
                <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-4">
                  Settings Categories
                </h3>
                {[
                  { key: 'dataManagement', label: 'Data Management', icon: 'Database' },
                  { key: 'preferences', label: 'Preferences', icon: 'Settings' },
                  { key: 'display', label: 'Display', icon: 'Monitor' },
                  { key: 'notifications', label: 'Notifications', icon: 'Bell' },
                  { key: 'account', label: 'Account', icon: 'User' }
                ].map((section) => (
                  <button
                    key={section.key}
                    onClick={() => toggleSection(section.key)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${expandedSections[section.key]
                        ? 'bg-primary text-primary-foreground shadow-elevation-1'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                      }
                    `}
                  >
                    <Icon name={section.icon} size={18} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Panels */}
            <div className="xl:col-span-3 space-y-6">
              {/* Data Management */}
              <SettingsSection
                title="Data Management"
                icon="Database"
                isExpanded={expandedSections.dataManagement}
                onToggle={() => toggleSection('dataManagement')}
              >
                <DataManagementPanel />
              </SettingsSection>

              {/* User Preferences */}
              <SettingsSection
                title="User Preferences"
                icon="Settings"
                isExpanded={expandedSections.preferences}
                onToggle={() => toggleSection('preferences')}
              >
                <PreferencesPanel
                  preferences={preferences}
                  onPreferenceChange={handlePreferenceChange}
                />
              </SettingsSection>

              {/* Display Settings */}
              <SettingsSection
                title="Display Settings"
                icon="Monitor"
                isExpanded={expandedSections.display}
                onToggle={() => toggleSection('display')}
              >
                <DisplaySettingsPanel
                  displaySettings={displaySettings}
                  onDisplaySettingChange={handleDisplaySettingChange}
                />
              </SettingsSection>

              {/* Notifications */}
              <SettingsSection
                title="Notifications"
                icon="Bell"
                isExpanded={expandedSections.notifications}
                onToggle={() => toggleSection('notifications')}
              >
                <NotificationPanel
                  notifications={notifications}
                  onNotificationChange={handleNotificationChange}
                />
              </SettingsSection>

              {/* Account Settings */}
              <SettingsSection
                title="Account Settings"
                icon="User"
                isExpanded={expandedSections.account}
                onToggle={() => toggleSection('account')}
              >
                <AccountPanel
                  accountSettings={accountSettings}
                  onAccountSettingChange={handleAccountSettingChange}
                />
              </SettingsSection>
            </div>
          </div>

          {/* Mobile Action Bar */}
          <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4 z-fixed">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                onClick={handleResetToDefaults}
                className="flex-1"
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={handleExportMyData}
                className="flex-1"
              >
                Export
              </Button>
              <Button
                variant="primary"
                size="sm"
                iconName="Save"
                onClick={handleSaveChanges}
                disabled={!hasUnsavedChanges}
                className="flex-1"
              >
                Save
              </Button>
            </div>
          </div>

          {/* Unsaved Changes Indicator */}
          {hasUnsavedChanges && (
            <div className="fixed bottom-20 xl:bottom-8 right-4 bg-warning text-warning-foreground px-4 py-2 rounded-lg shadow-elevation-3 animate-fade-in">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} />
                <span className="text-sm font-medium">You have unsaved changes</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SettingsAndDataManagement;