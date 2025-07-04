import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFuelStations } from '../utils/airtable';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import FloatingSearchBar from '../components/FloatingSearchBar';
import FloatingActionButton from '../components/FloatingActionButton';
import StationInfoPanel from '../components/StationInfoPanel';

// Fix leaflet icon bug on Vite/Vercel
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    fetchFuelStations().then(setStations);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer center={[-37.8136, 144.9631]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.Latitude, station.Longitude]}
            eventHandlers={{
              click: () => setSelectedStation(station),
            }}
          >
            <Popup>{station["Station Name"]}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <FloatingSearchBar />
      <FloatingActionButton />
      {selectedStation && (
        <StationInfoPanel station={selectedStation} onClose={() => setSelectedStation(null)} />
      )}
    </div>
  );
}
