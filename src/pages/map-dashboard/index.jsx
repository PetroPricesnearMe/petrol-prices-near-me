import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFuelStations } from '../../utils/airtable';
import Header from '../../components/ui/Header';
import SearchPanel from '../../components/ui/SearchPanel';
import { StationDetailsModal } from '../../components/ui/Modal';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom icons for different fuel brands
const createBrandIcon = (brand) => {
  const colors = {
    'Shell': '#FF0000',
    'BP': '#00A651',
    '7-Eleven': '#FF6600',
    'Caltex': '#0066CC',
    'Mobil': '#FF0000',
    'United': '#0066FF',
    'Metro': '#666666',
    'Liberty': '#9900CC'
  };
  
  const color = colors[brand] || '#666666';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">
        ${brand ? brand.charAt(0) : 'F'}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

export default function MapDashboard() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]);
  const [mapZoom, setMapZoom] = useState(11);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);
        const data = await fetchFuelStations();
        console.log("Fetched stations:", data);
        
        // Filter out stations without valid coordinates
        const validStations = data.filter(station => 
          station.Latitude && 
          station.Longitude && 
          !isNaN(parseFloat(station.Latitude)) && 
          !isNaN(parseFloat(station.Longitude))
        );
        
        console.log(`Displaying ${validStations.length} stations with valid coordinates out of ${data.length} total`);
        setStations(validStations);
        
        // If we have stations, center the map on the average location
        if (validStations.length > 0) {
          const avgLat = validStations.reduce((sum, station) => sum + parseFloat(station.Latitude), 0) / validStations.length;
          const avgLng = validStations.reduce((sum, station) => sum + parseFloat(station.Longitude), 0) / validStations.length;
          setMapCenter([avgLat, avgLng]);
        }
        
      } catch (err) {
        console.error("Error fetching stations:", err);
        setError(err.message);
        // Fallback to mock data if Airtable fails
        setStations([
          {
            id: '1',
            'Station Name': 'Shell Coles Express',
            'Address': '123 Collins Street',
            'City': 'Melbourne',
            'Latitude': -37.8136,
            'Longitude': 144.9631,
            'Price Per Liter (from Fuel Prices)': '$1.65',
            brand: 'Shell'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  const handleStationClick = (station) => {
    setSelectedStation({
      ...station,
      name: station['Station Name'],
      address: station['Address'],
      suburb: station['City'],
      postcode: station['Postcode'] || '3000',
      distance: station.distance || '2.3',
      latitude: parseFloat(station.Latitude),
      longitude: parseFloat(station.Longitude),
      phone: station.phone || '(03) 9123 4567',
      fuelPrices: [
        {
          type: 'Unleaded 91',
          price: parseFloat(station['Price Per Liter (from Fuel Prices)']?.replace('$', '') || '1.65'),
          lastUpdated: '2 hours ago',
          trend: 'down'
        },
        {
          type: 'Premium 95',
          price: parseFloat(station['Price Per Liter (from Fuel Prices)']?.replace('$', '') || '1.65') + 0.10,
          lastUpdated: '2 hours ago',
          trend: 'up'
        },
        {
          type: 'Diesel',
          price: parseFloat(station['Price Per Liter (from Fuel Prices)']?.replace('$', '') || '1.65') - 0.07,
          lastUpdated: '1 hour ago',
          trend: 'down'
        }
      ]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-text-secondary">Loading map data...</p>
            <p className="text-sm text-text-muted mt-2">Fetching fuel stations from Airtable...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && stations.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-error mb-4">Error loading map data: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 relative">
        {/* Station Count Display */}
        <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-elevation-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-text-primary">
              {stations.length} stations loaded
            </span>
          </div>
        </div>

        <div className="h-screen w-full">
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {stations.map((station, index) => {
              const lat = parseFloat(station.Latitude);
              const lng = parseFloat(station.Longitude);
              
              // Skip stations with invalid coordinates
              if (isNaN(lat) || isNaN(lng)) {
                console.warn(`Skipping station ${station['Station Name']} - invalid coordinates:`, station.Latitude, station.Longitude);
                return null;
              }

              return (
                <Marker
                  key={station.id || index}
                  position={[lat, lng]}
                  icon={createBrandIcon(station.brand)}
                  eventHandlers={{
                    click: () => handleStationClick(station),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center justify-between mb-2">
                        <strong className="text-sm font-semibold text-text-primary">
                          {station["Station Name"] || "Unknown Station"}
                        </strong>
                        {station.brand && (
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                            {station.brand}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-xs text-text-secondary">
                        <div className="flex items-center space-x-1">
                          <span>📍</span>
                          <span>{station.Address || "No Address"}, {station.City || "Unknown City"}</span>
                        </div>
                        
                        {station.distance && (
                          <div className="flex items-center space-x-1">
                            <span>📏</span>
                            <span>{station.distance} km away</span>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <span>💲</span>
                          {station["Price Per Liter (from Fuel Prices)"] ? (
                            <span className="font-semibold text-primary">
                              {station["Price Per Liter (from Fuel Prices)"]} per L
                            </span>
                          ) : (
                            <span className="text-text-muted">Price not available</span>
                          )}
                        </div>
                        
                        {station.lastUpdated && (
                          <div className="flex items-center space-x-1">
                            <span>🕒</span>
                            <span>Updated {station.lastUpdated}</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleStationClick(station)}
                        className="mt-2 w-full bg-primary text-white text-xs py-1 px-2 rounded hover:bg-primary-700 transition-colors duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Search Panel */}
        <SearchPanel
          isOpen={showSearchPanel}
          onClose={() => setShowSearchPanel(false)}
          onSearch={(filters) => {
            console.log('Search filters:', filters);
            setShowSearchPanel(false);
          }}
          onFilterChange={(filters) => {
            console.log('Filter change:', filters);
          }}
        />

        {/* Station Details Modal */}
        {selectedStation && (
          <StationDetailsModal
            isOpen={!!selectedStation}
            onClose={() => setSelectedStation(null)}
            station={selectedStation}
          />
        )}

        {/* Floating Search Button */}
        <button
          onClick={() => setShowSearchPanel(true)}
          className="fixed top-24 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Map Controls */}
        <div className="fixed bottom-4 left-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-elevation-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
              className="w-8 h-8 bg-white rounded border border-border hover:bg-surface-secondary transition-colors duration-200 flex items-center justify-center"
            >
              <span className="text-lg font-bold text-text-primary">+</span>
            </button>
            <button
              onClick={() => setMapZoom(prev => Math.max(prev - 1, 1))}
              className="w-8 h-8 bg-white rounded border border-border hover:bg-surface-secondary transition-colors duration-200 flex items-center justify-center"
            >
              <span className="text-lg font-bold text-text-primary">−</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-elevation-2 max-w-xs">
          <h4 className="text-sm font-semibold text-text-primary mb-2">Station Brands</h4>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {['Shell', 'BP', '7-Eleven', 'Caltex', 'Mobil', 'United'].map(brand => (
              <div key={brand} className="flex items-center space-x-1">
                <div 
                  className="w-3 h-3 rounded-full border border-white"
                  style={{ 
                    backgroundColor: {
                      'Shell': '#FF0000',
                      'BP': '#00A651',
                      '7-Eleven': '#FF6600',
                      'Caltex': '#0066CC',
                      'Mobil': '#FF0000',
                      'United': '#0066FF'
                    }[brand] || '#666666'
                  }}
                />
                <span className="text-text-secondary">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}