import React from 'react';

const StationInfoPanel = ({ station, onClose }) => {
  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000] max-w-md w-full">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold">{station?.['Station Name'] || 'Station Info'}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close panel"
        >
          ž
        </button>
      </div>
      
      {station && (
        <div className="mt-2">
          <p className="text-gray-700">{station.Address}</p>
          <div className="mt-3">
            <h3 className="font-semibold">Fuel Prices:</h3>
            {station.FuelTypes?.map((fuel, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{fuel}</span>
                <span>${station[fuel] || 'N/A'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StationInfoPanel;
