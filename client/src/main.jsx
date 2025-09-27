import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "react-hot-toast"; // ✅ import
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <Toaster position="top-right" /> {/* toast container */}
  </AuthProvider>
);
