import React from "react";

function SkeletonLoader({ type = "card", count = 1 }) {
  const shimmerStyle = {
    background: "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.04) 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s ease-in-out infinite",
    borderRadius: 12,
  };

  const skeletons = [];

  if (type === "card") {
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div
          key={i}
          style={{
            padding: 24,
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div
            style={{
              ...shimmerStyle,
              width: 50,
              height: 50,
              borderRadius: 16,
              marginBottom: 14,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              width: "70%",
              height: 16,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              width: "90%",
              height: 12,
              marginBottom: 6,
            }}
          />
          <div
            style={{
              ...shimmerStyle,
              width: "60%",
              height: 12,
            }}
          />
        </div>
      );
    }
  } else if (type === "table") {
    skeletons.push(
      <div key="table" style={{ overflow: "hidden", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ padding: "12px 16px", background: "rgba(108,99,255,0.12)", display: "flex", gap: 16 }}>
          {[40, 30, 20, 20, 25, 20, 20, 15].map((w, i) => (
            <div key={i} style={{ ...shimmerStyle, width: `${w}px`, height: 14 }} />
          ))}
        </div>
        {Array.from({ length: count }).map((_, row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: 16,
              padding: "13px 16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[40, 30, 20, 20, 25, 20, 20, 15].map((w, i) => (
              <div key={i} style={{ ...shimmerStyle, width: `${w}px`, height: 13 }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "grid", gap: 14 }}>{skeletons}</div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
}

export default SkeletonLoader;