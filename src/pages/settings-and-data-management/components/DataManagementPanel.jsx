import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';

const DataManagementPanel = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const uploadHistory = [
    {
      id: 1,
      filename: "melbourne_stations_2024.csv",
      uploadDate: "15/01/2024",
      recordCount: 1247,
      status: "active"
    },
    {
      id: 2,
      filename: "fuel_prices_update.csv",
      uploadDate: "12/01/2024",
      recordCount: 856,
      status: "archived"
    },
    {
      id: 3,
      filename: "station_locations.csv",
      uploadDate: "08/01/2024",
      recordCount: 1103,
      status: "archived"
    }
  ];

  const handleClearData = () => {
    // Mock clear data functionality
    console.log('Clearing all station data...');
    setShowClearModal(false);
    // Show success message
  };

  const handleExportData = async () => {
    setIsExporting(true);
    // Mock export functionality
    setTimeout(() => {
      console.log('Exporting filtered results...');
      setIsExporting(false);
      setShowExportModal(false);
      // Trigger download
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload History */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Upload History
        </h4>
        <div className="space-y-3">
          {uploadHistory.map((upload) => (
            <div 
              key={upload.id}
              className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg border border-default-border"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-lg">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{upload.filename}</p>
                  <p className="text-sm text-text-secondary">
                    {upload.recordCount} records • Uploaded {upload.uploadDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`
                  inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
                  ${upload.status === 'active' ?'bg-success-100 text-success-700' :'bg-secondary-100 text-secondary-700'
                  }
                `}>
                  {upload.status === 'active' ? 'Active' : 'Archived'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreVertical"
                  className="p-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Actions */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Data Actions
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => setShowExportModal(true)}
            className="justify-start p-4 h-auto"
          >
            <div className="text-left">
              <div className="font-medium">Export Data</div>
              <div className="text-sm text-text-secondary">Download filtered results as CSV</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            iconName="Trash2"
            iconPosition="left"
            onClick={() => setShowClearModal(true)}
            className="justify-start p-4 h-auto text-error hover:text-error hover:border-error"
          >
            <div className="text-left">
              <div className="font-medium">Clear Data</div>
              <div className="text-sm text-text-secondary">Remove all uploaded stations</div>
            </div>
          </Button>
        </div>
      </div>

      {/* Storage Usage */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-4">
          Storage Usage
        </h4>
        <div className="p-4 bg-surface-secondary rounded-lg border border-border">
        <div className="p-4 bg-surface-secondary rounded-lg border border-default-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Data Storage</span>
            <span className="text-sm font-medium text-text-primary">2.4 MB / 50 MB</span>
          </div>
          <div className="w-full bg-secondary-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: '4.8%' }}
            />
          </div>
          <p className="text-xs text-text-muted mt-2">
            47.6 MB remaining storage available
          </p>
        </div>
      </div>

      {/* Clear Data Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear All Data"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowClearModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClearData}>
              Clear Data
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={24} className="text-warning mt-1" />
            <div>
              <p className="text-text-primary font-medium mb-2">
                This action cannot be undone
              </p>
              <p className="text-sm text-text-secondary">
                All uploaded station data, price information, and custom settings will be permanently removed. 
                You will need to re-upload your CSV files to continue using the application.
              </p>
            </div>
          </div>
          
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3">
            <p className="text-sm text-warning-700">
              <strong>What will be cleared:</strong>
            </p>
            <ul className="text-sm text-warning-700 mt-1 ml-4 list-disc">
              <li>All station location data</li>
              <li>Fuel price information</li>
              <li>Upload history</li>
              <li>Saved filters and preferences</li>
            </ul>
          </div>
        </div>
      </Modal>

      {/* Export Data Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Data"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleExportData}
              loading={isExporting}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export CSV'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-text-secondary">
            Export your current station data and applied filters to a CSV file for backup or external use.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Total Stations</span>
              <span className="font-medium text-text-primary">1,247</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">Filtered Results</span>
              <span className="font-medium text-text-primary">324</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <span className="text-sm text-text-primary">File Size (Est.)</span>
              <span className="font-medium text-text-primary">~45 KB</span>
            </div>
          </div>
          
          <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
            <p className="text-sm text-accent-700">
              The exported file will include station names, addresses, coordinates, fuel types, 
              and current pricing information based on your active filters.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataManagementPanel;