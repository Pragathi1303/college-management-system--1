import React from "react";

function Spinner({ size = 40, text = "Loading…" }) {
  const spinnerStyle = {
    width: size,
    height: size,
    border: "3px solid rgba(108,99,255,0.2)",
    borderTopColor: "#6c63ff",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    margin: "0 auto",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        padding: "40px 20px",
      }}
    >
      <div style={spinnerStyle} />
      {text && (
        <span
          style={{
            color: "var(--muted)",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {text}
        </span>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Spinner;