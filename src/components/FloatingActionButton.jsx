// src/components/FloatingActionButton.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi'; // Using Feather icon for the FAB

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label="Action button"
    >
      <FiPlus className="w-6 h-6" />
    </button>
  );
};

export default FloatingActionButton;
