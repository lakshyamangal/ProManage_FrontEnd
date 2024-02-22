import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DurationProvider } from "./Context/DurationContext.jsx";
import { DataProvider } from "./Context/dataContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DurationProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </DurationProvider>
);
