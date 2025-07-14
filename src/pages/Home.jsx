import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { fetchFuelStations } from '../utils/airtable';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function FlyToUser({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position]);
  return null;
}

export default function Home() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [fuelType, setFuelType] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([-37.8136, 144.9631]);

  useEffect(() => {
    fetchFuelStations()
      .then(data => setStations(data))
      .catch(err => setError('Failed to load stations'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(coords);
          setMapCenter(coords);
        },
        err => {
          console.warn('Location permission denied or failed:', err.message);
        }
      );
    }
  }, []);

  const filteredStations = stations.filter(station => {
    const name = station["Station Name"]?.toLowerCase() || '';
    const suburb = station.City?.toLowerCase() || '';
    const q = query.toLowerCase();

    const matchesSearch = name.includes(q) || suburb.includes(q);

    const stationFuelType = (station["Fuel Type"] || '').toLowerCase();
    const matchesFuel = fuelType === 'all' || stationFuelType === fuelType;

    return matchesSearch && matchesFuel;
  });

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Melbourne Fuel Prices Near You</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          Find the cheapest fuel in Melbourne with real-time price updates and a live map of all petrol stations.
        </p>
        <a
          href="#map"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          View Map
        </a>
      </section>

      {/* Filters */}
      <section className="bg-gray-100 py-6 px-4 text-center space-y-4">
        <input
          type="text"
          placeholder="Search suburb or station name..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={fuelType}
          onChange={e => setFuelType(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Fuel Types</option>
          <option value="unleaded98">Unleaded 98</option>
          <option value="unleaded91">Unleaded 91</option>
          <option value="diesel">Diesel</option>
          <option value="gas">Gas</option>
        </select>
      </section>

      {/* Map */}
      <section id="map" className="py-10 px-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Live Fuel Station Map</h2>

        {loading && <p className="text-center text-gray-600">Loading map...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-md">
            <MapContainer center={mapCenter} zoom={11} className="w-full h-full z-0">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              {userLocation && (
                <>
                  <Marker position={userLocation}>
                    <Popup>You are here</Popup>
                  </Marker>
                  <FlyToUser position={userLocation} />
                </>
              )}

              {filteredStations
                .filter(s => s.Latitude && s.Longitude)
                .map(station => {
                  const position = [parseFloat(station.Latitude), parseFloat(station.Longitude)];
                  const price = station["Price Per Liter (from Fuel Prices)"];
                  
                  const priceIcon = price
                    ? L.divIcon({
                        className: 'custom-price-icon',
                        html: `<div style="
                          background:#1e40af;
                          color:#fff;
                          padding:4px 8px;
                          border-radius:8px;
                          font-weight:bold;
                          font-size:13px;
                          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                        ">$${parseFloat(price).toFixed(2)}</div>`,
                        iconAnchor: [20, 20]
                      })
                    : null;

                  return (
                    <Marker
                      key={station.id}
                      position={position}
                      icon={priceIcon || new L.Icon.Default()}
                    >
                      <Popup>
                        <strong>{station["Station Name"]}</strong><br />
                        {station.Address}, {station.City}<br />
                        {price ? (
                          <span>💲 {parseFloat(price).toFixed(2)} per L</span>
                        ) : (
                          <em>No price available</em>
                        )}
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          </div>
        )}
      </section>
    </div>
  );
}
