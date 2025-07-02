import React from 'react';

const ToggleSwitch = ({ 
  id, 
  label, 
  description, 
  checked, 
  onChange, 
  disabled = false,
  className = '' 
}) => {
  return (
    <div className={`flex items-start justify-between ${className}`}>
      <div className="flex-1 mr-4">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text-primary cursor-pointer"
        >
          {label}
        </label>
        {description && (
          <p className="mt-1 text-xs text-text-secondary">
            {description}
          </p>
        )}
      </div>
      
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <button
          type="button"
          onClick={() => !disabled && onChange(!checked)}
          disabled={disabled}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
            ${checked 
              ? 'bg-primary' :'bg-secondary-300'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' :'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            }
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white shadow-elevation-1 transition-transform duration-200 ease-in-out
              ${checked ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>
    </div>
  );
};

export default ToggleSwitch;