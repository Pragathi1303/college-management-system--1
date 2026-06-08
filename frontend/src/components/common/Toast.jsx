import React from "react";
import { Toaster } from "react-hot-toast";

/**
 * Centralized toast configuration.
 * Place this once in your app root (e.g., in main.jsx or App.jsx).
 */
function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: "14px",
          padding: "14px 20px",
          fontSize: "14px",
          fontWeight: 700,
          background: "rgba(8,13,31,0.95)",
          color: "#f0f4ff",
          border: "1px solid rgba(108,99,255,0.3)",
          backdropFilter: "blur(12px)",
        },
        success: {
          iconTheme: { primary: "#43e97b", secondary: "#fff" },
          style: { borderColor: "rgba(67,233,123,0.35)" },
        },
        error: {
          iconTheme: { primary: "#ff5050", secondary: "#fff" },
          style: { borderColor: "rgba(255,80,80,0.35)" },
        },
      }}
    />
  );
}

export { toast } from "react-hot-toast";
export default ToastProvider;