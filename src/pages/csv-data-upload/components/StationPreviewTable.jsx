import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StationPreviewTable = ({ stations, onSelectionChange, onApplyToMap }) => {
  const [selectedStations, setSelectedStations] = useState(new Set(stations.map(s => s.id)));
  const [sortField, setSortField] = useState('station_name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStations(new Set(stations.map(s => s.id)));
    } else {
      setSelectedStations(new Set());
    }
    onSelectionChange?.(checked ? stations : []);
  };

  const handleSelectStation = (stationId, checked) => {
    const newSelected = new Set(selectedStations);
    if (checked) {
      newSelected.add(stationId);
    } else {
      newSelected.delete(stationId);
    }
    setSelectedStations(newSelected);
    
    const selectedStationsList = stations.filter(s => newSelected.has(s.id));
    onSelectionChange?.(selectedStationsList);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedStations = [...stations].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue.toString().localeCompare(bValue.toString());
    } else {
      return bValue.toString().localeCompare(aValue.toString());
    }
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatPrice = (price) => {
    if (!price || price === '') return '-';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const isAllSelected = selectedStations.size === stations.length;
  const isPartiallySelected = selectedStations.size > 0 && selectedStations.size < stations.length;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Station Preview
          </h3>
          <p className="text-sm text-text-secondary">
            {selectedStations.size} of {stations.length} stations selected
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={() => {
              const selectedData = stations.filter(s => selectedStations.has(s.id));
              const csvContent = [
                Object.keys(selectedData[0] || {}).join(','),
                ...selectedData.map(station => Object.values(station).join(','))
              ].join('\n');
              
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'selected_stations.csv';
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Export Selected
          </Button>
          
          <Button
            variant="primary"
            iconName="Map"
            iconPosition="left"
            onClick={() => onApplyToMap(stations.filter(s => selectedStations.has(s.id)))}
            disabled={selectedStations.size === 0}
          >
            Apply to Map ({selectedStations.size})
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface border border-default-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary border-b border-default-border">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) input.indeterminate = isPartiallySelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                </th>
                
                <th className="p-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('station_name')}
                    className="font-medium text-text-primary hover:text-primary"
                  >
                    Station Name
                    <Icon name={getSortIcon('station_name')} size={14} className="ml-1" />
                  </Button>
                </th>
                
                <th className="p-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('suburb')}
                    className="font-medium text-text-primary hover:text-primary"
                  >
                    Location
                    <Icon name={getSortIcon('suburb')} size={14} className="ml-1" />
                  </Button>
                </th>
                
                <th className="p-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('brand')}
                    className="font-medium text-text-primary hover:text-primary"
                  >
                    Brand
                    <Icon name={getSortIcon('brand')} size={14} className="ml-1" />
                  </Button>
                </th>
                
                <th className="p-3 text-left font-medium text-text-primary">
                  Fuel Prices
                </th>
                
                <th className="p-3 text-left font-medium text-text-primary">
                  Coordinates
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-default-border">
              {sortedStations.map((station, index) => (
                <tr 
                  key={station.id || index}
                  className={`
                    hover:bg-surface-secondary transition-colors duration-200
                    ${selectedStations.has(station.id) ? 'bg-primary-50' : ''}
                  `}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedStations.has(station.id)}
                      onChange={(e) => handleSelectStation(station.id, e.target.checked)}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                  </td>
                  
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-text-primary">
                        {station.station_name}
                      </div>
                      <div className="text-xs text-text-muted">
                        {station.address}
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-3">
                    <div className="text-text-primary">
                      {station.suburb}
                    </div>
                    <div className="text-xs text-text-muted">
                      {station.postcode}
                    </div>
                  </td>
                  
                  <td className="p-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary-100 text-xs font-medium text-text-secondary">
                      {station.brand}
                    </span>
                  </td>
                  
                  <td className="p-3">
                    <div className="space-y-1 text-xs">
                      {station.unleaded_91 && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">U91:</span>
                          <span className="font-data text-text-primary">
                            {formatPrice(station.unleaded_91)}
                          </span>
                        </div>
                      )}
                      {station.premium_95 && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">P95:</span>
                          <span className="font-data text-text-primary">
                            {formatPrice(station.premium_95)}
                          </span>
                        </div>
                      )}
                      {station.diesel && (
                        <div className="flex justify-between">
                          <span className="text-text-muted">Diesel:</span>
                          <span className="font-data text-text-primary">
                            {formatPrice(station.diesel)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-3">
                    <div className="text-xs font-data text-text-muted">
                      <div>{parseFloat(station.latitude).toFixed(4)}</div>
                      <div>{parseFloat(station.longitude).toFixed(4)}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="bg-surface-secondary rounded-lg p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-text-secondary">
              Total Stations: <span className="font-medium text-text-primary">{stations.length}</span>
            </span>
            <span className="text-text-secondary">
              Selected: <span className="font-medium text-primary">{selectedStations.size}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-text-muted">
            <Icon name="Info" size={14} />
            <span>Click column headers to sort data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationPreviewTable;