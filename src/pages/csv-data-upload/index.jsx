import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FileUploadZone from './components/FileUploadZone';
import FormatRequirements from './components/FormatRequirements';
import ValidationResults from './components/ValidationResults';
import StationPreviewTable from './components/StationPreviewTable';

const CSVDataUpload = () => {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, validating, success, error
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);
  const [parsedStations, setParsedStations] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Mock validation function
  const validateCSVData = (data) => {
    const errors = [];
    const warnings = [];
    let validRows = 0;

    // Mock validation logic
    data.forEach((row, index) => {
      const rowNum = index + 2; // +2 because index starts at 0 and we skip header
      
      // Check required fields
      if (!row.station_name || row.station_name.trim() === '') {
        errors.push({
          row: rowNum,
          column: 'station_name',
          message: 'Station name is required',
          suggestion: 'Provide a valid station name'
        });
      }
      
      if (!row.latitude || !row.longitude) {
        errors.push({
          row: rowNum,
          column: 'coordinates',
          message: 'Latitude and longitude are required',
          suggestion: 'Provide valid decimal coordinates'
        });
      } else {
        const lat = parseFloat(row.latitude);
        const lng = parseFloat(row.longitude);
        
        if (isNaN(lat) || isNaN(lng)) {
          errors.push({
            row: rowNum,
            column: 'coordinates',
            message: 'Invalid coordinate format',
            suggestion: 'Use decimal format (e.g., -37.8136)'
          });
        } else if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          errors.push({
            row: rowNum,
            column: 'coordinates',
            message: 'Coordinates out of valid range',
            suggestion: 'Latitude: -90 to 90, Longitude: -180 to 180'
          });
        }
      }
      
      // Check optional price fields
      ['unleaded_91', 'premium_95', 'diesel'].forEach(priceField => {
        if (row[priceField] && row[priceField] !== '') {
          const price = parseFloat(row[priceField]);
          if (isNaN(price) || price <= 0) {
            warnings.push({
              row: rowNum,
              column: priceField,
              message: `Invalid price format for ${priceField}`,
              suggestion: 'Use decimal format (e.g., 1.65)'
            });
          } else if (price > 5.00) {
            warnings.push({
              row: rowNum,
              column: priceField,
              message: `Unusually high price for ${priceField}`,
              suggestion: 'Please verify the price is correct'
            });
          }
        }
      });
      
      if (errors.filter(e => e.row === rowNum).length === 0) {
        validRows++;
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      totalRows: data.length,
      validRows
    };
  };

  // Mock CSV parsing function
  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) throw new Error('CSV must contain at least a header and one data row');
    
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      row.id = `station_${i}`;
      data.push(row);
    }
    
    return data;
  };

  const handleFileSelect = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.name.endsWith('.csv') && file.type !== 'text/csv') {
      setErrorMessage('Please select a valid CSV file');
      setUploadState('error');
      return;
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size must be less than 10MB');
      setUploadState('error');
      return;
    }
    
    setSelectedFile(file);
    setUploadState('uploading');
    setUploadProgress(0);
    setErrorMessage('');
    
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
      
      // Read file content
      const fileContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      });
      
      setUploadProgress(95);
      setUploadState('validating');
      
      // Parse CSV
      const parsedData = parseCSV(fileContent);
      
      // Validate data
      const validation = validateCSVData(parsedData);
      
      setUploadProgress(100);
      setValidationResults(validation);
      setParsedStations(parsedData);
      setSelectedStations(parsedData);
      setUploadState('success');
      
    } catch (error) {
      setErrorMessage(error.message || 'Failed to process file');
      setUploadState('error');
    }
  };

  const handleRetry = () => {
    setUploadState('idle');
    setSelectedFile(null);
    setValidationResults(null);
    setParsedStations([]);
    setSelectedStations([]);
    setErrorMessage('');
    setUploadProgress(0);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all uploaded data?')) {
      handleRetry();
    }
  };

  const handleApplyToMap = (stations) => {
    // Store selected stations in localStorage for the map to use
    localStorage.setItem('uploadedStations', JSON.stringify(stations));
    
    // Navigate to map dashboard
    navigate('/map-dashboard', { 
      state: { 
        uploadedStations: stations,
        message: `Successfully loaded ${stations.length} stations to the map`
      }
    });
  };

  const handleSelectionChange = (stations) => {
    setSelectedStations(stations);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={() => navigate('/map-dashboard')}
                className="lg:hidden"
              >
                Back
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                  CSV Data Upload
                </h1>
                <p className="text-text-secondary mt-1">
                  Import petrol station data to display on the map
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-4 text-sm">
              <div className={`
                flex items-center space-x-2 px-3 py-1 rounded-full
                ${uploadState === 'idle' || uploadState === 'uploading' ?'bg-primary text-primary-foreground' :'bg-success text-success-foreground'
                }
              `}>
                <Icon name="Upload" size={14} />
                <span>Upload</span>
              </div>
              
              <div className={`
                w-8 h-0.5 
                ${uploadState === 'validating' || uploadState === 'success' ?'bg-success' :'bg-border'
                }
              `} />
              
              <div className={`
                flex items-center space-x-2 px-3 py-1 rounded-full
                ${uploadState === 'validating' ?'bg-primary text-primary-foreground'
                  : uploadState === 'success' ?'bg-success text-success-foreground' :'bg-secondary-200 text-text-muted'
                }
              `}>
                <Icon name="CheckCircle" size={14} />
                <span>Validate</span>
              </div>
              
              <div className={`
                w-8 h-0.5 
                ${uploadState === 'success' ? 'bg-success' : 'bg-border'}
              `} />
              
              <div className={`
                flex items-center space-x-2 px-3 py-1 rounded-full
                ${uploadState === 'success' ?'bg-primary text-primary-foreground' :'bg-secondary-200 text-text-muted'
                }
              `}>
                <Icon name="Map" size={14} />
                <span>Apply</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Upload Zone */}
            {(uploadState === 'idle' || uploadState === 'uploading' || uploadState === 'validating') && (
              <FileUploadZone
                onFileSelect={handleFileSelect}
                isUploading={uploadState === 'uploading' || uploadState === 'validating'}
                uploadProgress={uploadProgress}
              />
            )}

            {/* Format Requirements */}
            {uploadState === 'idle' && <FormatRequirements />}

            {/* Error State */}
            {uploadState === 'error' && (
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-error-50 border border-error-200 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-error rounded-full">
                      <Icon name="AlertCircle" size={32} className="text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-error-700 mb-2">
                    Upload Failed
                  </h3>
                  <p className="text-error-600 mb-4">{errorMessage}</p>
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={handleRetry}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Validation Results */}
            {uploadState === 'success' && validationResults && (
              <ValidationResults
                validationResults={validationResults}
                onRetry={handleRetry}
              />
            )}

            {/* Station Preview Table */}
            {uploadState === 'success' && validationResults?.isValid && parsedStations.length > 0 && (
              <StationPreviewTable
                stations={parsedStations}
                onSelectionChange={handleSelectionChange}
                onApplyToMap={handleApplyToMap}
              />
            )}

            {/* Action Buttons */}
            {uploadState === 'success' && (
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Button
                  variant="outline"
                  iconName="Trash2"
                  iconPosition="left"
                  onClick={handleClearData}
                >
                  Clear Data
                </Button>
                
                <Button
                  variant="secondary"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={handleRetry}
                >
                  Upload Another File
                </Button>
                
                {validationResults?.isValid && selectedStations.length > 0 && (
                  <Button
                    variant="primary"
                    iconName="Map"
                    iconPosition="left"
                    onClick={() => handleApplyToMap(selectedStations)}
                  >
                    Apply {selectedStations.length} Stations to Map
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CSVDataUpload;