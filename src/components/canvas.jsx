import React, { useEffect, useRef } from "react";

const Canvas = ({ graph }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const airports = Array.from(graph.adjList.keys());
    const n = airports.length;

    if (n === 0) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 2.5;

    // Place airports in a circular layout
    const positions = {};
    airports.forEach((a, i) => {
      const angle = (2 * Math.PI * i) / n;
      positions[a] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    // Draw edges
    ctx.strokeStyle = "#555";
    ctx.lineWidth = 1.5;
    for (let [airport, edges] of graph.adjList.entries()) {
      edges.forEach((edge) => {
        const src = positions[airport];
        const dest = positions[edge.code];
        if (!src || !dest) return;
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(dest.x, dest.y);
        ctx.stroke();
      });
    }

    // Draw nodes
    for (let [airport, { x, y }] of Object.entries(positions)) {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = "#1976d2";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(airport, x, y);
    }
  }, [graph]);

  return (
    <div className="w-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        className="border border-gray-400 rounded shadow-sm"
      />
    </div>
  );
};

export default Canvas;