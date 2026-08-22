import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <App />
    </div>
  </React.StrictMode>
);
