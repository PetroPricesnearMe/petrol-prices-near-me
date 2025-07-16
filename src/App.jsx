import React from "react";
import { Helmet } from "react-helmet";
import { inject } from "@vercel/analytics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages/components
import HomePage from "@/pages/HomePage";
import StationsPage from "@/pages/StationsPage";
// Add more imports as needed...

// Inject Vercel Analytics
inject();

const App = () => {
  return (
    <>
      {/* Google Analytics tracking */}
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </script>
      </Helmet>

      {/* React App Routing */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stations" element={<StationsPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
