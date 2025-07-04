// src/components/FloatingActionButton.jsx
import React from 'react';

export default function FloatingActionButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="w-14 h-14 rounded-full bg-blue-600 text-white text-xl font-bold shadow-lg hover:bg-blue-700"
        onClick={() => alert("Action clicked")}
      >
        +
      </button>
    </div>
  );
}
