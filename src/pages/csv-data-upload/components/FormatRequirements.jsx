import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormatRequirements = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const requiredColumns = [
    { name: 'station_name', description: 'Name of the petrol station', example: 'Shell Coles Express' },
    { name: 'address', description: 'Street address', example: '123 Collins Street' },
    { name: 'suburb', description: 'Suburb name', example: 'Melbourne' },
    { name: 'postcode', description: 'Postal code', example: '3000' },
    { name: 'latitude', description: 'Latitude coordinate', example: '-37.8136' },
    { name: 'longitude', description: 'Longitude coordinate', example: '144.9631' },
    { name: 'brand', description: 'Station brand/company', example: 'Shell' },
    { name: 'unleaded_91', description: 'Price per litre (optional)', example: '1.65' },
    { name: 'premium_95', description: 'Price per litre (optional)', example: '1.75' },
    { name: 'diesel', description: 'Price per litre (optional)', example: '1.58' },
  ];

  const sampleData = `station_name,address,suburb,postcode,latitude,longitude,brand,unleaded_91,premium_95,diesel
Shell Coles Express,123 Collins Street,Melbourne,3000,-37.8136,144.9631,Shell,1.65,1.75,1.58
BP Connect,456 Bourke Street,Melbourne,3000,-37.8142,144.9632,BP,1.67,1.77,1.60
7-Eleven,789 Swanston Street,Carlton,3053,-37.8014,144.9658,7-Eleven,1.63,1.73,1.56`;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between hover:bg-surface-secondary"
        >
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">
              CSV Format Requirements
            </span>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-muted" 
          />
        </Button>

        {isExpanded && (
          <div className="border-t border-border animate-fade-in">
            <div className="p-6 space-y-6">
              {/* Required Columns */}
              <div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Required Columns
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-default-border">
                        <th className="text-left py-2 px-3 font-medium text-text-primary">Column Name</th>
                        <th className="text-left py-2 px-3 font-medium text-text-primary">Description</th>
                        <th className="text-left py-2 px-3 font-medium text-text-primary">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requiredColumns.map((column, index) => (
                        <tr key={index} className="border-b border-default-border-light">
                          <td className="py-2 px-3">
                            <code className="bg-secondary-100 px-2 py-1 rounded text-xs font-data">
                              {column.name}
                            </code>
                          </td>
                          <td className="py-2 px-3 text-text-secondary">
                            {column.description}
                          </td>
                          <td className="py-2 px-3 text-text-muted font-data text-xs">
                            {column.example}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sample Data */}
              <div>
                <h4 className="text-lg font-heading font-semibold text-text-primary mb-3">
                  Sample CSV Data
                </h4>
                <div className="bg-secondary-50 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs font-data text-text-primary whitespace-pre-wrap">
                    {sampleData}
                  </pre>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h5 className="font-medium text-warning-700">Important Notes</h5>
                    <ul className="text-sm text-warning-700 space-y-1">
                      <li>• First row must contain column headers exactly as shown</li>
                      <li>• Latitude and longitude must be valid decimal coordinates</li>
                      <li>• Fuel prices are optional but recommended for better functionality</li>
                      <li>• File size limit: 10MB maximum</li>
                      <li>• Encoding: UTF-8 recommended</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Download Template */}
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => {
                    const blob = new Blob([sampleData], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'petrol_stations_template.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  Download Template
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormatRequirements;