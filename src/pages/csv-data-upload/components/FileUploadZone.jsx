import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ onFileSelect, isUploading, uploadProgress }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      onFileSelect(csvFile);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 lg:p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary bg-primary-50 scale-105' :'border-default-border hover:border-primary-300 bg-surface'
          }
          ${isUploading ? 'pointer-events-none opacity-75' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isUploading ? handleBrowseClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={48} className="text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-text-primary">
                Processing your file...
              </p>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-text-secondary">
                {uploadProgress}% complete
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className={`
                p-4 rounded-full transition-colors duration-300
                ${isDragOver ? 'bg-primary text-white' : 'bg-primary-100 text-primary'}
              `}>
                <Icon name="Upload" size={32} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-heading font-semibold text-text-primary">
                Upload CSV File
              </h3>
              <p className="text-text-secondary">
                Drag and drop your petrol station data file here, or click to browse
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                iconName="FolderOpen"
                iconPosition="left"
                onClick={handleBrowseClick}
              >
                Choose File
              </Button>
              
              <p className="text-sm text-text-muted">
                Supported format: CSV files up to 10MB
              </p>
            </div>
          </div>
        )}

        {isDragOver && (
          <div className="absolute inset-0 bg-primary bg-opacity-10 rounded-xl flex items-center justify-center">
            <div className="text-primary font-medium">
              Drop your CSV file here
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;