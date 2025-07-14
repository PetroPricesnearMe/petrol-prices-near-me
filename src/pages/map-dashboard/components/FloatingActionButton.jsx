import React from 'react';

export default function FloatingActionButton() {
  return (
    <button
      style={{
        position: 'absolute',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        background: '#007aff',
        color: 'white',
        borderRadius: '50%',
        border: 'none',
        width: '56px',
        height: '56px',
        fontSize: '24px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        cursor: 'pointer'
      }}
    >
      +
    </button>
  );
}
