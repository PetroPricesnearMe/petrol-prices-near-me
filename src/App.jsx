import React from "react";
import { Helmet } from "react-helmet";
import { inject } from "@vercel/analytics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Import your pages/components
import Home from "./pages/Home";
import MapPage from "./pages/Map";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Prices from "./pages/Prices";
import NotFound from "./pages/NotFound";
import CsvDataUpload from "./pages/csv-data-upload";
import StationDetailsModal from "./pages/station-details-modal";
import SettingsAndDataManagement from "./pages/settings-and-data-management";
import SearchAndFilterInterface from "./pages/search-and-filter-interface";
import AppLayout from "./components/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Inject Vercel Analytics
inject();

const App = () => {
  return (
    <>
      <Router>
        <ErrorBoundary>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/map-dashboard" element={<MapPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/csv-data-upload" element={<CsvDataUpload />} />
              <Route path="/station-details-modal/:stationId?" element={<StationDetailsModal />} />
              <Route path="/settings-and-data-management" element={<SettingsAndDataManagement />} />
              <Route path="/search-and-filter-interface" element={<SearchAndFilterInterface />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </>
  );
};

export default App;
