import React from 'react';

export default function StationInfoPanel({ station, onClose }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid #ccc',
      padding: '16px',
      zIndex: 1000,
      boxShadow: '0 -2px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '8px' }}>{station["Station Name"]}</h2>
      <p>{station.Address}, {station.City}, {station.Region}, {station["Postal Code"]}</p>
      <p><strong>Fuel:</strong> {station["Fuel Prices"]}</p>
      <p><strong>Price per Liter:</strong> ${station["Price Per Liter (from Fuel Prices)"]}</p>
      <p><strong>Details:</strong> {station["Location Details"]}</p>
      <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
    </div>
  );
}
