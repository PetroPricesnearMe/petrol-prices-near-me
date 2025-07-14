import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationResults = ({ validationResults, onRetry }) => {
  if (!validationResults) return null;

  const { isValid, errors, warnings, totalRows, validRows } = validationResults;

  const getStatusIcon = (type) => {
    switch (type) {
      case 'error':
        return <Icon name="XCircle" size={16} className="text-error" />;
      case 'warning':
        return <Icon name="AlertTriangle" size={16} className="text-warning" />;
      default:
        return <Icon name="Info" size={16} className="text-secondary" />;
    }
  };

  const getStatusColor = (type) => {
    switch (type) {
      case 'error':
        return 'border-error-200 bg-error-50';
      case 'warning':
        return 'border-warning-200 bg-warning-50';
      default:
        return 'border-secondary-200 bg-secondary-50';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Summary Card */}
      <div className={`
        rounded-xl border-2 p-6
        ${isValid 
          ? 'border-success-200 bg-success-50' :'border-error-200 bg-error-50'
        }
      `}>
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {isValid ? (
              <div className="p-2 bg-success rounded-full">
                <Icon name="CheckCircle" size={24} className="text-white" />
              </div>
            ) : (
              <div className="p-2 bg-error rounded-full">
                <Icon name="XCircle" size={24} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className={`
              text-lg font-heading font-semibold mb-2
              ${isValid ? 'text-success-700' : 'text-error-700'}
            `}>
              {isValid ? 'Validation Successful' : 'Validation Issues Found'}
            </h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Total Rows:</span>
                <span className="ml-2 font-medium text-text-primary">{totalRows}</span>
              </div>
              <div>
                <span className="text-text-muted">Valid Rows:</span>
                <span className="ml-2 font-medium text-success-600">{validRows}</span>
              </div>
              <div>
                <span className="text-text-muted">Errors:</span>
                <span className="ml-2 font-medium text-error-600">{errors?.length || 0}</span>
              </div>
              <div>
                <span className="text-text-muted">Warnings:</span>
                <span className="ml-2 font-medium text-warning-600">{warnings?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {(errors?.length > 0 || warnings?.length > 0) && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-secondary">
            <h4 className="font-heading font-semibold text-text-primary">
              Validation Issues
            </h4>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-border">
              {/* Errors */}
              {errors?.map((error, index) => (
                <div key={`error-${index}`} className="p-4">
                  <div className={`
                    rounded-lg border p-3 ${getStatusColor('error')}
                  `}>
                    <div className="flex items-start space-x-3">
                      {getStatusIcon('error')}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-error-700">
                            Row {error.row}
                          </span>
                          <span className="text-xs text-error-600 bg-error-100 px-2 py-1 rounded">
                            {error.column}
                          </span>
                        </div>
                        <p className="text-sm text-error-700">{error.message}</p>
                        {error.suggestion && (
                          <p className="text-xs text-error-600 mt-1">
                            Suggestion: {error.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Warnings */}
              {warnings?.map((warning, index) => (
                <div key={`warning-${index}`} className="p-4">
                  <div className={`
                    rounded-lg border p-3 ${getStatusColor('warning')}
                  `}>
                    <div className="flex items-start space-x-3">
                      {getStatusIcon('warning')}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-warning-700">
                            Row {warning.row}
                          </span>
                          <span className="text-xs text-warning-600 bg-warning-100 px-2 py-1 rounded">
                            {warning.column}
                          </span>
                        </div>
                        <p className="text-sm text-warning-700">{warning.message}</p>
                        {warning.suggestion && (
                          <p className="text-xs text-warning-600 mt-1">
                            Suggestion: {warning.suggestion}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {!isValid && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onRetry}
          >
            Try Another File
          </Button>
        </div>
      )}
    </div>
  );
};

export default ValidationResults;