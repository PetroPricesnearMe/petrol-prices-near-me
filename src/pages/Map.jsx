import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchFuelStations } from '../utils/airtable';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function MapPage() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchFuelStations().then(data => setStations(data));
  }, []);

  return (
    <div className="w-full h-[90vh]">
      <h1 className="text-2xl font-bold p-4">Melbourne Fuel Station Map</h1>

      <MapContainer center={[-37.8136, 144.9631]} zoom={10} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {stations
          .filter(s => s.Latitude && s.Longitude)
          .map(station => (
            <Marker
              key={station.id}
              position={[parseFloat(station.Latitude), parseFloat(station.Longitude)]}
            >
              <Popup>
                <strong>{station["Station Name"]}</strong><br />
                {station.Address}, {station.City}<br />
                {station["Price Per Liter (from Fuel Prices)"] && (
                  <span>💲 {station["Price Per Liter (from Fuel Prices)"]} per L</span>
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
