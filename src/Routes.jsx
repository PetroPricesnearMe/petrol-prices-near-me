// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import AppLayout from "./components/AppLayout"; // New layout component

// Pages
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import CsvDataUpload from "./pages/csv-data-upload";
import StationDetailsModal from "./pages/station-details-modal";
import SettingsAndDataManagement from "./pages/settings-and-data-management";
import SearchAndFilterInterface from "./pages/search-and-filter-interface";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Prices from "./pages/Prices";
import NotFound from "./pages/NotFound";

// Import Leaflet CSS here to ensure it loads globally
import 'leaflet/dist/leaflet.css';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Wrap all routes in AppLayout for consistent header/footer */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/map-dashboard" element={<MapPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/csv-data-upload" element={<CsvDataUpload />} />
            <Route path="/station-details-modal" element={<StationDetailsModal />} />
            <Route path="/settings-and-data-management" element={<SettingsAndDataManagement />} />
            <Route path="/search-and-filter-interface" element={<SearchAndFilterInterface />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;