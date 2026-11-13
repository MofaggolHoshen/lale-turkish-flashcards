import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
      })
      .catch((error: unknown) => {
        console.error("Service worker registration failed", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <App />
    </div>
  </React.StrictMode>
);
