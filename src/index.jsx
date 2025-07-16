// src/index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import Routes from "./Routes";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);