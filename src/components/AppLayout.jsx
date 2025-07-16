// src/components/AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* Add footer here if needed */}
    </div>
  );
};

export default AppLayout;
