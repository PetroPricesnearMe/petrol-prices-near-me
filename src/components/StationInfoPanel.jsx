import React from 'react';

export default function StationInfoPanel({ station, onClose }) {
  if (!station) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded shadow-lg z-50">
      <h2 className="text-lg font-bold">{station["Station Name"]}</h2>
      <p>{station.Address}, {station.City}</p>
      <p>💲 {station["Price Per Liter (from Fuel Prices)"]}</p>
      <button
        onClick={onClose}
        className="mt-2 text-sm text-blue-600 underline"
      >
        Close
      </button>
    </div>
  );
}
