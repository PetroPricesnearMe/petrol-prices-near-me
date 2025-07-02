import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MapDashboard from "pages/map-dashboard";
import CsvDataUpload from "pages/csv-data-upload";
import StationDetailsModal from "pages/station-details-modal";
import SettingsAndDataManagement from "pages/settings-and-data-management";
import SearchAndFilterInterface from "pages/search-and-filter-interface";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MapDashboard />} />
        <Route path="/map-dashboard" element={<MapDashboard />} />
        <Route path="/csv-data-upload" element={<CsvDataUpload />} />
        <Route path="/station-details-modal" element={<StationDetailsModal />} />
        <Route path="/settings-and-data-management" element={<SettingsAndDataManagement />} />
        <Route path="/search-and-filter-interface" element={<SearchAndFilterInterface />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;