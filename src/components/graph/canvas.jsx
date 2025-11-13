import React, { useEffect, useRef, useState } from "react";
import flightData from "../../data/flight_data.json"; // 

// --- Helper: convert lat/lng to x/y within canvas bounds ---
function project(lat, lng, bounds, size) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * size.w;
  const y = size.h - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * size.h;
  return { x, y };
}

// --- Build graph from flight data ---
function buildGraph(data) {
  const adjList = new Map();
  for (const f of data.flights) {
    if (!adjList.has(f.origin)) adjList.set(f.origin, []);
    if (!adjList.has(f.destination)) adjList.set(f.destination, []);
    adjList.get(f.origin).push({ code: f.destination });
    adjList.get(f.destination).push({ code: f.origin });
  }
  return { adjList };
}

const Canvas = ({ highlightedEdges = [] }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const graph = useRef(buildGraph(flightData)).current;
  const airports = flightData.airports;

  // --- Compute lat/lng bounds ---
  const bounds = {
    minLat: Math.min(...airports.map((a) => a.lat)),
    maxLat: Math.max(...airports.map((a) => a.lat)),
    minLng: Math.min(...airports.map((a) => a.lng)),
    maxLng: Math.max(...airports.map((a) => a.lng)),
  };

  // --- Highlighted edges (bidirectional) ---
  const highlightSet = useRef(new Set());
  useEffect(() => {
    const s = new Set();
    for (const [a, b] of highlightedEdges) {
      s.add(`${a}->${b}`);
      s.add(`${b}->${a}`);
    }
    highlightSet.current = s;
  }, [highlightedEdges]);

  // --- Resize observer ---
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({
        w: Math.max(400, rect.width - 20),
        h: Math.max(400, rect.height - 20),
      });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // --- Main draw effect ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Background
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, size.w, size.h);

    // Apply zoom and pan
    ctx.save();
    ctx.translate(size.w / 2 + offset.x, size.h / 2 + offset.y);
    ctx.scale(zoom, zoom);
    ctx.translate(-size.w / 2, -size.h / 2);

    // Precompute positions
    const positions = {};
    for (const a of airports) {
      positions[a.code] = project(a.lat, a.lng, bounds, size);
    }

    // --- Draw edges (flights) ---
    for (let [src, edges] of graph.adjList.entries()) {
      const srcPos = positions[src];
      for (const edge of edges) {
        const destPos = positions[edge.code];
        if (!srcPos || !destPos) continue;
        const key = `${src}->${edge.code}`;
        const isHighlighted = highlightSet.current.has(key);
        ctx.beginPath();
        ctx.moveTo(srcPos.x, srcPos.y);
        ctx.lineTo(destPos.x, destPos.y);
        ctx.strokeStyle = isHighlighted ? "#16a34a" : "rgba(255,255,255,0.25)";
        ctx.lineWidth = isHighlighted ? 3 : 1;
        ctx.stroke();
      }
    }

    // --- Draw nodes (airports) ---
    for (const a of airports) {
      const pos = positions[a.code];
      if (!pos) continue;

      const deg = graph.adjList.get(a.code)?.length || 0;
      const radius =
        a.type === "large_airport"
          ? 6 + deg * 0.2
          : a.type === "medium_airport"
          ? 5 + deg * 0.15
          : 4 + deg * 0.1;

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle =
        a.type === "large_airport"
          ? "#fbbf24"
          : a.type === "medium_airport"
          ? "#0ea5a0"
          : "#64748b";
      ctx.fill();
    }

    ctx.restore();
  }, [size, zoom, offset, highlightedEdges, graph, airports, bounds]);

  // --- Mouse zoom ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom((z) => Math.min(Math.max(z + delta, 0.3), 3));
    };
    canvas.addEventListener("wheel", handleWheel);
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);

  // --- Mouse drag pan ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleDown = (e) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grabbing";
    };
    const handleMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    };
    const handleUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    canvas.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col items-center justify-center">
      <div className="mb-2 space-x-2">
        <button onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}>🔍 Zoom In</button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.3))}>🔎 Zoom Out</button>
        <button onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>Reset</button>
      </div>
      <canvas
        ref={canvasRef}
        className="rounded border border-slate-600 cursor-grab"
      />
    </div>
  );
};

export default Canvas;