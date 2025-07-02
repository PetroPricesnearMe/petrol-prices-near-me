import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onQuickUpload }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'upload',
      label: 'Upload CSV',
      icon: 'Upload',
      color: 'primary',
      action: () => navigate('/csv-data-upload')
    },
    {
      id: 'refresh',
      label: 'Refresh Data',
      icon: 'RefreshCw',
      color: 'secondary',
      action: () => {
        onQuickUpload?.();
        setIsExpanded(false);
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      color: 'ghost',
      action: () => navigate('/settings-and-data-management')
    }
  ];

  const handleMainButtonClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleActionClick = (action) => {
    action();
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          {quickActions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Action Label */}
              <div className="bg-text-primary text-text-inverse px-3 py-2 rounded-lg shadow-elevation-2 whitespace-nowrap">
                <span className="text-sm font-medium">{action.label}</span>
              </div>
              
              {/* Action Button */}
              <Button
                variant={action.color}
                size="lg"
                iconName={action.icon}
                onClick={() => handleActionClick(action.action)}
                className="w-12 h-12 rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="primary"
        size="xl"
        iconName={isExpanded ? "X" : "Plus"}
        onClick={handleMainButtonClick}
        className={`
          w-14 h-14 rounded-full shadow-elevation-4 hover:shadow-elevation-4 
          transition-all duration-300 transform
          ${isExpanded ? 'rotate-45 scale-110' : 'hover:scale-105'}
        `}
      />

      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 -z-10 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;