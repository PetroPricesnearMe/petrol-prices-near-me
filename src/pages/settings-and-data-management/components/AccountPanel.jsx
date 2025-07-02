import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ToggleSwitch from './ToggleSwitch';
import Modal from '../../../components/ui/Modal';

const AccountPanel = ({ accountSettings, onAccountSettingChange }) => {
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const usageStats = {
    totalSearches: 1247,
    stationsViewed: 89,
    dataUploaded: "2.4 MB",
    lastActive: "Today, 2:30 PM",
    accountCreated: "15/12/2023",
    favoriteStations: 12
  };

  const handleBackupData = async () => {
    setIsBackingUp(true);
    // Mock backup process
    setTimeout(() => {
      console.log('Backing up user data...');
      setIsBackingUp(false);
      setShowBackupModal(false);
      // Show success message
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Account Information
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="User" size={20} className="text-text-muted" />
              <div>
                <p className="font-medium text-text-primary">User ID</p>
                <p className="text-sm text-text-secondary">Anonymous User</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-text-muted" />
              <div>
                <p className="font-medium text-text-primary">Account Created</p>
                <p className="text-sm text-text-secondary">{usageStats.accountCreated}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Activity" size={20} className="text-text-muted" />
              <div>
                <p className="font-medium text-text-primary">Last Active</p>
                <p className="text-sm text-text-secondary">{usageStats.lastActive}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Backup Options */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Data Backup
        </h4>
        <div className="space-y-3">
          <ToggleSwitch
            id="autoBackup"
            label="Automatic Backup"
            description="Automatically backup your settings and preferences weekly"
            checked={accountSettings.autoBackup}
            onChange={(checked) => onAccountSettingChange('autoBackup', checked)}
          />
          
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => setShowBackupModal(true)}
            className="w-full justify-start"
          >
            Create Manual Backup
          </Button>
        </div>
      </div>

      {/* Privacy Controls */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Privacy Controls
        </h4>
        <div className="space-y-4">
          <ToggleSwitch
            id="locationTracking"
            label="Location Tracking"
            description="Allow the app to track your location for personalized recommendations"
            checked={accountSettings.locationTracking}
            onChange={(checked) => onAccountSettingChange('locationTracking', checked)}
          />
          
          <ToggleSwitch
            id="usageAnalytics"
            label="Usage Analytics"
            description="Help improve the app by sharing anonymous usage data"
            checked={accountSettings.usageAnalytics}
            onChange={(checked) => onAccountSettingChange('usageAnalytics', checked)}
          />
          
          <ToggleSwitch
            id="crashReporting"
            label="Crash Reporting"
            description="Automatically send crash reports to help fix issues"
            checked={accountSettings.crashReporting}
            onChange={(checked) => onAccountSettingChange('crashReporting', checked)}
          />
        </div>
      </div>

      {/* Usage Statistics */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-heading font-medium text-text-primary">
            Usage Statistics
          </h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="BarChart3"
            onClick={() => setShowUsageModal(true)}
          >
            View Details
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-surface-secondary rounded-lg text-center">
            <p className="text-2xl font-data font-bold text-primary">{usageStats.totalSearches}</p>
            <p className="text-xs text-text-secondary">Total Searches</p>
          </div>
          <div className="p-3 bg-surface-secondary rounded-lg text-center">
            <p className="text-2xl font-data font-bold text-primary">{usageStats.stationsViewed}</p>
            <p className="text-xs text-text-secondary">Stations Viewed</p>
          </div>
          <div className="p-3 bg-surface-secondary rounded-lg text-center">
            <p className="text-2xl font-data font-bold text-primary">{usageStats.dataUploaded}</p>
            <p className="text-xs text-text-secondary">Data Uploaded</p>
          </div>
          <div className="p-3 bg-surface-secondary rounded-lg text-center">
            <p className="text-2xl font-data font-bold text-primary">{usageStats.favoriteStations}</p>
            <p className="text-xs text-text-secondary">Favorite Stations</p>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Account Actions
        </h4>
        <div className="space-y-3">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            className="w-full justify-start"
            onClick={() => {
              // Reset account preferences
              console.log('Resetting account preferences...');
            }}
          >
            Reset All Preferences
          </Button>
          
          <Button
            variant="outline"
            iconName="Trash2"
            iconPosition="left"
            className="w-full justify-start text-error hover:text-error hover:border-error"
            onClick={() => {
              // Clear all account data
              console.log('Clearing all account data...');
            }}
          >
            Clear All Account Data
          </Button>
        </div>
      </div>

      {/* Backup Modal */}
      <Modal
        isOpen={showBackupModal}
        onClose={() => setShowBackupModal(false)}
        title="Create Data Backup"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowBackupModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleBackupData}
              loading={isBackingUp}
              disabled={isBackingUp}
            >
              {isBackingUp ? 'Creating Backup...' : 'Create Backup'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Create a backup of your settings, preferences, and uploaded data. This backup can be used 
            to restore your account if needed.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Settings & Preferences</span>
              <Icon name="Check" size={16} className="text-success" />
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Uploaded Station Data</span>
              <Icon name="Check" size={16} className="text-success" />
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Search History</span>
              <Icon name="Check" size={16} className="text-success" />
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Favorite Stations</span>
              <Icon name="Check" size={16} className="text-success" />
            </div>
          </div>
          
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
            <p className="text-sm text-accent-700">
              The backup file will be downloaded to your device and can be imported later to restore your data.
            </p>
          </div>
        </div>
      </Modal>

      {/* Usage Statistics Modal */}
      <Modal
        isOpen={showUsageModal}
        onClose={() => setShowUsageModal(false)}
        title="Detailed Usage Statistics"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-text-primary">Search Activity</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Total Searches</span>
                  <span className="font-medium">{usageStats.totalSearches}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">This Week</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Average per Day</span>
                  <span className="font-medium">6.7</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-text-primary">Station Interactions</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Stations Viewed</span>
                  <span className="font-medium">{usageStats.stationsViewed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Favorites Added</span>
                  <span className="font-medium">{usageStats.favoriteStations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-text-secondary">Directions Requested</span>
                  <span className="font-medium">23</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-text-primary mb-3">Most Searched Fuel Types</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <span className="text-sm">Unleaded 91</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <span className="text-sm">Diesel</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-surface-secondary rounded">
                <span className="text-sm">Premium 95</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <span className="text-sm font-medium">32%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AccountPanel;