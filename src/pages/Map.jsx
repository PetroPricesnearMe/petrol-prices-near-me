import React, { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFuelStations } from '@/utils/airtable';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import FloatingSearchBar from '@/components/FloatingSearchBar';
import StationInfoPanel from '@/components/StationInfoPanel';
import { FiPlus } from 'react-icons/fi';

// Fix leaflet icon bug
const DefaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Floating Action Button Component
const FloatingActionButton = ({ onClick = () => console.log('FAB clicked') }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-[1000]"
      aria-label="Action button"
    >
      <FiPlus className="w-6 h-6" />
    </button>
  );
};

// Custom hook to filter stations by search term
const useFilteredStations = (stations, searchTerm) => {
  return stations.filter(station => {
    if (!station) return false;
    return (
      searchTerm === '' || 
      station['Station Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.Address?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
};

// Component to handle map view changes
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export default function MapPage() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  const filteredStations = useFilteredStations(stations, searchTerm);

  useEffect(() => {
    const loadStations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchFuelStations();
        setStations(data);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadStations();
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    
    if (term && filteredStations.length > 0) {
      const firstResult = filteredStations[0];
      if (firstResult?.Latitude && firstResult?.Longitude) {
        setMapCenter([firstResult.Latitude, firstResult.Longitude]);
        setMapZoom(14);
      }
    } else {
      setMapCenter([-37.8136, 144.9631]);
      setMapZoom(12);
    }
  }, [filteredStations]);

  const handleStationSelect = useCallback((station) => {
    if (!station?.Latitude || !station?.Longitude) return;
    
    setSelectedStation(station);
    setMapCenter([station.Latitude, station.Longitude]);
    setMapZoom(16);
  }, []);

  const handleAddStation = () => {
    // Add your FAB click handler here
    console.log('Add new station clicked');
    // Example: open a modal or navigate to add station page
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full">
      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapViewUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredStations.map((station) => (
          station?.Latitude && station?.Longitude && (
            <Marker
              key={station.id}
              position={[station.Latitude, station.Longitude]}
              eventHandlers={{
                click: () => handleStationSelect(station),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-gray-800">{station['Station Name']}</h3>
                  <p className="text-sm text-gray-600">{station.Address}</p>
                  {station.FuelTypes?.length > 0 && (
                    <p className="text-sm text-primary-600 font-semibold mt-1">
                      {station.FuelTypes.join(' • ')}
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>

      <FloatingSearchBar onSearch={handleSearch} />
      <FloatingActionButton onClick={handleAddStation} />
      
      {selectedStation && (
        <StationInfoPanel 
          station={selectedStation} 
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
}