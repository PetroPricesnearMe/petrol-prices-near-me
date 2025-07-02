import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapContainer = ({ 
  stations = [], 
  selectedStation, 
  onStationSelect, 
  onLocationFound,
  filters = {},
  isLoading = false 
}) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]); // Melbourne center
  const [zoomLevel, setZoomLevel] = useState(11);
  const [showLegend, setShowLegend] = useState(false);

  // Mock Melbourne petrol stations data
  const mockStations = [
    {
      id: 1,
      name: "Shell Coles Express Melbourne Central",
      brand: "Shell",
      address: "211 La Trobe St",
      suburb: "Melbourne",
      postcode: "3000",
      latitude: -37.8102,
      longitude: 144.9628,
      fuelTypes: ["Unleaded 91", "Premium 95", "Diesel", "E10"],
      prices: {
        "Unleaded 91": 1.65,
        "Premium 95": 1.75,
        "Diesel": 1.58,
        "E10": 1.62
      },
      lastUpdated: "2 hours ago",
      amenities: ["24/7 Open", "Car Wash", "Convenience Store", "ATM"],
      phone: "(03) 9663 2847"
    },
    {
      id: 2,
      name: "BP Collins Street",
      brand: "BP",
      address: "150 Collins St",
      suburb: "Melbourne",
      postcode: "3000",
      latitude: -37.8142,
      longitude: 144.9632,
      fuelTypes: ["Unleaded 91", "Premium 95", "Premium 98", "Diesel"],
      prices: {
        "Unleaded 91": 1.68,
        "Premium 95": 1.78,
        "Premium 98": 1.85,
        "Diesel": 1.61
      },
      lastUpdated: "1 hour ago",
      amenities: ["Convenience Store", "ATM", "Restrooms"],
      phone: "(03) 9654 7821"
    },
    {
      id: 3,
      name: "Caltex Woolworths South Yarra",
      brand: "Caltex",
      address: "142 Toorak Rd",
      suburb: "South Yarra",
      postcode: "3141",
      latitude: -37.8398,
      longitude: 144.9884,
      fuelTypes: ["Unleaded 91", "Premium 95", "Diesel", "E10"],
      prices: {
        "Unleaded 91": 1.63,
        "Premium 95": 1.73,
        "Diesel": 1.56,
        "E10": 1.60
      },
      lastUpdated: "3 hours ago",
      amenities: ["24/7 Open", "Car Wash", "Convenience Store", "ATM", "Restrooms"],
      phone: "(03) 9826 4532"
    },
    {
      id: 4,
      name: "7-Eleven Richmond",
      brand: "7-Eleven",
      address: "368 Swan St",
      suburb: "Richmond",
      postcode: "3121",
      latitude: -37.8284,
      longitude: 144.9981,
      fuelTypes: ["Unleaded 91", "Premium 95", "Diesel", "E10"],
      prices: {
        "Unleaded 91": 1.67,
        "Premium 95": 1.77,
        "Diesel": 1.59,
        "E10": 1.64
      },
      lastUpdated: "4 hours ago",
      amenities: ["24/7 Open", "Convenience Store", "ATM"],
      phone: "(03) 9428 6751"
    },
    {
      id: 5,
      name: "Mobil Fitzroy",
      brand: "Mobil",
      address: "234 Brunswick St",
      suburb: "Fitzroy",
      postcode: "3065",
      latitude: -37.7987,
      longitude: 144.9784,
      fuelTypes: ["Unleaded 91", "Premium 95", "Premium 98", "Diesel"],
      prices: {
        "Unleaded 91": 1.66,
        "Premium 95": 1.76,
        "Premium 98": 1.83,
        "Diesel": 1.57
      },
      lastUpdated: "1 hour ago",
      amenities: ["Car Wash", "Convenience Store", "Restrooms"],
      phone: "(03) 9417 3892"
    },
    {
      id: 6,
      name: "United Petroleum Carlton",
      brand: "United",
      address: "789 Swanston St",
      suburb: "Carlton",
      postcode: "3053",
      latitude: -37.7956,
      longitude: 144.9656,
      fuelTypes: ["Unleaded 91", "Premium 95", "Diesel", "E10"],
      prices: {
        "Unleaded 91": 1.61,
        "Premium 95": 1.71,
        "Diesel": 1.54,
        "E10": 1.58
      },
      lastUpdated: "2 hours ago",
      amenities: ["24/7 Open", "Convenience Store", "ATM", "Restrooms"],
      phone: "(03) 9347 5621"
    }
  ];

  const displayStations = stations.length > 0 ? stations : mockStations;

  const getBrandColor = (brand) => {
    const colors = {
      'Shell': '#FFD700',
      'BP': '#00A651',
      'Caltex': '#E31837',
      '7-Eleven': '#FF6600',
      'Mobil': '#0066CC',
      'United': '#8B0000'
    };
    return colors[brand] || '#2563EB';
  };

  const getPriceColor = (price) => {
    if (price < 1.60) return '#10B981'; // Green - cheap
    if (price < 1.70) return '#F59E0B'; // Yellow - moderate
    return '#EF4444'; // Red - expensive
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = [position.coords.latitude, position.coords.longitude];
          setUserLocation(location);
          setMapCenter(location);
          setZoomLevel(14);
          onLocationFound?.(location);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const handleStationClick = (station) => {
    onStationSelect?.(station);
    setMapCenter([station.latitude, station.longitude]);
    setZoomLevel(15);
  };

  const filteredStations = displayStations.filter(station => {
    if (filters.fuelType && filters.fuelType !== 'all') {
      const fuelTypeMap = {
        'unleaded': 'Unleaded 91',
        'premium': 'Premium 95',
        'premium98': 'Premium 98',
        'diesel': 'Diesel',
        'e10': 'E10'
      };
      const requiredFuelType = fuelTypeMap[filters.fuelType];
      if (!station.fuelTypes.includes(requiredFuelType)) {
        return false;
      }
    }
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      return station.name.toLowerCase().includes(query) ||
             station.suburb.toLowerCase().includes(query) ||
             station.postcode.includes(query);
    }
    
    return true;
  });

  return (
    <div className="relative w-full h-full bg-surface overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full relative">
        {/* Google Maps Embed */}
        <iframe
          ref={mapRef}
          width="100%"
          height="100%"
          loading="lazy"
          title="Melbourne Fuel Stations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter[0]},${mapCenter[1]}&z=${zoomLevel}&output=embed`}
          className="border-0"
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-surface bg-opacity-75 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-text-secondary">Loading stations...</p>
            </div>
          </div>
        )}

        {/* Station Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {filteredStations.map((station) => {
            // Calculate approximate pixel position (simplified)
            const x = ((station.longitude - mapCenter[1]) * 100000 / zoomLevel) + 50;
            const y = ((mapCenter[0] - station.latitude) * 100000 / zoomLevel) + 50;
            
            return (
              <div
                key={station.id}
                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${Math.max(0, Math.min(100, x))}%`,
                  top: `${Math.max(0, Math.min(100, y))}%`
                }}
                onClick={() => handleStationClick(station)}
              >
                <div className="relative group">
                  {/* Marker */}
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-elevation-2 flex items-center justify-center transform transition-transform duration-200 hover:scale-110"
                    style={{ backgroundColor: getBrandColor(station.brand) }}
                  >
                    <Icon name="Fuel" size={16} color="white" />
                  </div>
                  
                  {/* Price Badge */}
                  <div className="absolute -top-2 -right-2 bg-surface border border-border rounded-full px-1 py-0.5 shadow-elevation-1">
                    <span className="text-xs font-data font-semibold text-text-primary">
                      ${station.prices["Unleaded 91"]?.toFixed(2) || "N/A"}
                    </span>
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-text-primary text-text-inverse px-3 py-2 rounded-lg shadow-elevation-3 whitespace-nowrap">
                      <p className="font-medium text-sm">{station.name}</p>
                      <p className="text-xs opacity-90">{station.suburb}</p>
                      <div className="w-2 h-2 bg-text-primary transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-30 flex flex-col space-y-2">
          {/* Zoom Controls */}
          <div className="bg-surface border border-border rounded-lg shadow-elevation-2 overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              onClick={handleZoomIn}
              className="rounded-none border-b border-border"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="Minus"
              onClick={handleZoomOut}
              className="rounded-none"
            />
          </div>

          {/* Location Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Navigation"
            onClick={getCurrentLocation}
            className="bg-surface border border-border shadow-elevation-2"
          />

          {/* Legend Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Info"
            onClick={() => setShowLegend(!showLegend)}
            className="bg-surface border border-border shadow-elevation-2"
          />
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="absolute top-4 left-4 z-30 bg-surface border border-border rounded-lg shadow-elevation-3 p-4 max-w-xs">
            <h3 className="font-heading font-semibold text-text-primary mb-3">Map Legend</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Fuel Brands</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Shell', 'BP', 'Caltex', '7-Eleven', 'Mobil', 'United'].map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-white"
                        style={{ backgroundColor: getBrandColor(brand) }}
                      />
                      <span className="text-xs text-text-secondary">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-text-primary mb-2">Price Range</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-success" />
                    <span className="text-xs text-text-secondary">&lt; $1.60/L</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-warning" />
                    <span className="text-xs text-text-secondary">$1.60 - $1.70/L</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-error" />
                    <span className="text-xs text-text-secondary">&gt; $1.70/L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Location Marker */}
        {userLocation && (
          <div className="absolute inset-0 pointer-events-none z-25">
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-elevation-2 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Station Count Badge */}
      <div className="absolute bottom-4 left-4 z-30 bg-surface border border-border rounded-lg shadow-elevation-2 px-3 py-2">
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">
            {filteredStations.length} stations found
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapContainer;