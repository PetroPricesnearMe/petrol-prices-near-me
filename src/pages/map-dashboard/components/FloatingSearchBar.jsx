import React from 'react';

export default function FloatingSearchBar() {
  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'white',
      padding: '8px 16px',
      borderRadius: '999px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
    }}>
      <input
        type="text"
        placeholder="Search stations..."
        style={{ border: 'none', outline: 'none', fontSize: '14px' }}
      />
    </div>
  );
}
