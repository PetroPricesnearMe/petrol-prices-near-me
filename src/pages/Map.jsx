import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchFuelStations } from '../utils/airtable';
import FloatingSearchBar from '../components/FloatingSearchBar';
import FloatingActionButton from '../components/FloatingActionButton';
import StationInfoPanel from '../components/StationInfoPanel';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

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
    fetchFuelStations().then((data) => {
      console.log("Fetched stations:", data); // debug
      setStations(data);
    });
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {stations.length === 0 ? (
        <p className="text-center mt-20 text-lg">Loading map data...</p>
      ) : (
        <MapContainer center={[-37.8136, 144.9631]} zoom={12} style={{ height: '100%', width: '100%' }}>
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
                  <strong>{station["Station Name"] ?? "Unknown Station"}</strong><br />
                  {station.Address ?? "No Address"}, {station.City ?? "Unknown City"}<br />
                  {station["Price Per Liter (from Fuel Prices)"] ? (
                    <span>💲 {station["Price Per Liter (from Fuel Prices)"]} per L</span>
                  ) : (
                    <span>No price listed</span>
                  )}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
      <FloatingSearchBar />
      <FloatingActionButton />
      {selectedStation && (
        <StationInfoPanel station={selectedStation} onClose={() => setSelectedStation(null)} />
      )}
    </div>
  );
}
