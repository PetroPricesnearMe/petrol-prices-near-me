import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

// Pages
import Home from "./pages/Home";
import MapDashboard from "./pages/map-dashboard";
import StationListing from "./pages/station-listing";
import CsvDataUpload from "./pages/csv-data-upload";
import StationDetailsModal from "./pages/station-details-modal";
import SettingsAndDataManagement from "./pages/settings-and-data-management";
import SearchAndFilterInterface from "./pages/search-and-filter-interface";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/map-dashboard" element={<MapDashboard />} />
          <Route path="/station-listing" element={<StationListing />} />
          <Route path="/csv-data-upload" element={<CsvDataUpload />} />
          <Route path="/station/:stationId" element={<StationDetailsModal />} />
          <Route path="/settings-and-data-management" element={<SettingsAndDataManagement />} />
          <Route path="/search-and-filter-interface" element={<SearchAndFilterInterface />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;