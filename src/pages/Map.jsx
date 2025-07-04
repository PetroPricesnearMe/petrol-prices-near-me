import React, { useEffect, useState } from 'react';
import { fetchFuelStations } from '../utils/airtable';

export default function Map() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchFuelStations().then(data => setStations(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Fuel Stations</h1>

      {stations.length === 0 ? (
        <p>Loading station data...</p>
      ) : (
        <ul className="space-y-4">
          {stations.map(station => (
            <li key={station.id} className="border-b pb-4">
              <h2 className="text-xl font-semibold">{station["Station Name"]}</h2>
              <p>
                {station["Address"]}, {station["City"]} {station["Postal Code"]}, {station["Region"]}, {station["Country"]}
              </p>
              <p>📍 Latitude: {station["Latitude"]}, Longitude: {station["Longitude"]}</p>
              <p>⛽ Category: {station["Category"]}</p>
              <p>🛢 Fuel Prices: {station["Fuel Prices"]}</p>
              <p>💲 Price per Liter: ${station["Price Per Liter (from Fuel Prices)"]}</p>
              <p>ℹ️ {station["Location Details"]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

