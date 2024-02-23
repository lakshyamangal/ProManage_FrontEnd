import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DurationProvider } from "./Context/DurationContext.jsx";
import { DataProvider } from "./Context/dataContext.jsx";
import { DeleteCardProvider } from "./Context/DeleteCardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DurationProvider>
    <DataProvider>
      <DeleteCardProvider>
        <App />
      </DeleteCardProvider>
    </DataProvider>
  </DurationProvider>
);
