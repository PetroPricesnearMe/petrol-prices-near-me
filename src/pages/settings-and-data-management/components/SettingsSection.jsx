import React from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSection = ({ title, icon, children, isExpanded, onToggle, className = '' }) => {
  return (
    <div className={`bg-surface border border-default-border rounded-lg shadow-elevation-1 ${className}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-surface-secondary transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-lg">
            <Icon name={icon} size={18} className="text-primary" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            {title}
          </h3>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-text-muted" 
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 lg:px-6 lg:pb-6 border-t border-default-border animate-fade-in">
          <div className="pt-4 space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;