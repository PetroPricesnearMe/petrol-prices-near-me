import React from 'react';

export default function FloatingSearchBar() {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-11/12 lg:w-1/2 z-50">
      <input
        type="text"
        placeholder="Search stations..."
        className="w-full p-3 rounded-full border border-gray-300 shadow-md focus:outline-none"
      />
    </div>
  );
}
