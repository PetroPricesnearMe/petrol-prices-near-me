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

export default function MapDashboard() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setLoading(true);
        const data = await fetchFuelStations();
        console.log("Fetched stations:", data);
        setStations(data);
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
            'Price Per Liter (from Fuel Prices)': '$1.65'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-lg text-text-secondary">Loading map data...</p>
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
        <div className="h-screen w-full">
          <MapContainer 
            center={[-37.8136, 144.9631]} 
            zoom={12} 
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {stations
              .filter(station => station.Latitude && station.Longitude)
              .map(station => (
                <Marker
                  key={station.id}
                  position={[station.Latitude, station.Longitude]}
                  eventHandlers={{
                    click: () => setSelectedStation(station),
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <strong>{station["Station Name"] || "Unknown Station"}</strong><br />
                      {station.Address || "No Address"}, {station.City || "Unknown City"}<br />
                      {station["Price Per Liter (from Fuel Prices)"] ? (
                        <span className="text-primary font-semibold">
                          💲 {station["Price Per Liter (from Fuel Prices)"]} per L
                        </span>
                      ) : (
                        <span className="text-text-muted">No price listed</span>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
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
      </main>
    </div>
  );
}