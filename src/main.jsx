import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DurationProvider } from "./Context/DurationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DurationProvider>
    <App />
  </DurationProvider>
);
