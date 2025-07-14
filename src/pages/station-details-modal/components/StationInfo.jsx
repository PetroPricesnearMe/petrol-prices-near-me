import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const StationInfo = ({ station }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const amenities = station.amenities || [
    '24/7 Open', 'Car Wash', 'Convenience Store', 'ATM', 'Restrooms', 'Air & Water'
  ];

  const operatingHours = station.operatingHours || {
    'Monday': '6:00 AM - 10:00 PM',
    'Tuesday': '6:00 AM - 10:00 PM',
    'Wednesday': '6:00 AM - 10:00 PM',
    'Thursday': '6:00 AM - 10:00 PM',
    'Friday': '6:00 AM - 11:00 PM',
    'Saturday': '7:00 AM - 11:00 PM',
    'Sunday': '7:00 AM - 9:00 PM'
  };

  const contactInfo = {
    phone: station.phone || '(03) 9123 4567',
    website: station.website || 'www.example.com',
    email: station.email || 'info@station.com.au'
  };

  return (
    <div className="space-y-4">
      {/* Basic Information */}
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={18} className="text-text-muted mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-text-primary">{station.address}</p>
            <p className="text-xs text-text-secondary">{station.suburb}, VIC {station.postcode}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Icon name="Navigation" size={18} className="text-text-muted flex-shrink-0" />
          <span className="text-sm text-text-primary">{station.distance} km away</span>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-md font-heading font-medium text-text-primary mb-3">
          Available Services
        </h4>
        <div className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-100 text-xs font-medium text-text-secondary"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-2">
        {/* Operating Hours */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('hours')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-secondary transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={18} className="text-text-muted" />
              <span className="font-medium text-text-primary">Operating Hours</span>
            </div>
            <Icon 
              name={expandedSection === 'hours' ? 'ChevronUp' : 'ChevronDown'} 
              size={18} 
              className="text-text-muted" 
            />
          </button>
          {expandedSection === 'hours' && (
            <div className="px-4 pb-4 border-t border-border">
              <div className="space-y-2 mt-3">
                {Object.entries(operatingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-sm text-text-secondary">{day}</span>
                    <span className="text-sm font-medium text-text-primary">{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="border border-border rounded-lg">
          <button
            onClick={() => toggleSection('contact')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-secondary transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={18} className="text-text-muted" />
              <span className="font-medium text-text-primary">Contact Information</span>
            </div>
            <Icon 
              name={expandedSection === 'contact' ? 'ChevronUp' : 'ChevronDown'} 
              size={18} 
              className="text-text-muted" 
            />
          </button>
          {expandedSection === 'contact' && (
            <div className="px-4 pb-4 border-t border-border">
              <div className="space-y-3 mt-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-text-muted" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Globe" size={16} className="text-text-muted" />
                  <a 
                    href={`https://${contactInfo.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                  >
                    {contactInfo.website}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-text-muted" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-primary hover:text-primary-700 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationInfo;