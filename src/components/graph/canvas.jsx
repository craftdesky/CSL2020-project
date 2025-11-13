import React, { useEffect, useRef, useState } from "react";

function interleaveIndices(n) {
  if (n === 0) return [];
  const res = [];
  let queue = [[0, n - 1]];
  while (queue.length) {
    let [l, r] = queue.shift();
    if (l > r) continue;
    const mid = Math.floor((l + r) / 2);
    res.push(mid);
    if (l !== r) {
      queue.push([l, mid - 1]);
      queue.push([mid + 1, r]);
    }
  }
  return res;
}

const Canvas = ({ graph, highlightedEdges = [] }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ w: 600, h: 400 });

  // 🔍 Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ w: Math.max(300, rect.width - 20), h: Math.max(300, rect.height - 20) });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const highlightSet = useRef(new Set());
  useEffect(() => {
    const s = new Set();
    for (const pair of highlightedEdges || []) {
      const [a, b] = pair;
      s.add(`${a}->${b}`);
      s.add(`${b}->${a}`);
    }
    highlightSet.current = s;
  }, [highlightedEdges]);

  // 🎨 Draw graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !graph) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    const ctx = canvas.getContext("2d");

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, size.w, size.h);

    // 🔍 Apply zoom and pan transform
    ctx.save();
    ctx.translate(size.w / 2 + offset.x, size.h / 2 + offset.y);
    ctx.scale(zoom, zoom);
    ctx.translate(-size.w / 2, -size.h / 2);

    if (!(graph.adjList instanceof Map) || graph.adjList.size === 0) return;

    const degrees = {};
    let maxDegree = 0;
    for (let [airport, edges] of graph.adjList.entries()) {
      degrees[airport] = edges.length;
      if (edges.length > maxDegree) maxDegree = edges.length;
    }

    const sortedAirports = Array.from(graph.adjList.keys()).sort(
      (a, b) => degrees[b] - degrees[a]
    );
    const n = sortedAirports.length;
    const indices = interleaveIndices(n);
    const airports = Array(n);
    indices.forEach((idx, k) => (airports[idx] = sortedAirports[k]));

    const cx = size.w / 2,
      cy = size.h / 2;
    const circleRadius = Math.min(size.w, size.h) / 2.6;
    const positions = {};
    airports.forEach((a, i) => {
      const angle = (2 * Math.PI * i) / n;
      positions[a] = {
        x: cx + circleRadius * Math.cos(angle),
        y: cy + circleRadius * Math.sin(angle),
      };
    });

    const minR = 14;
    const maxR = 34;

    // Edges
    for (let [airport, edges] of graph.adjList.entries()) {
      const srcPos = positions[airport];
      for (const edge of edges) {
        const destPos = positions[edge.code];
        if (!srcPos || !destPos) continue;
        const key = `${airport}->${edge.code}`;
        const isHighlighted = highlightSet.current.has(key);
        ctx.beginPath();
        ctx.moveTo(srcPos.x, srcPos.y);
        ctx.lineTo(destPos.x, destPos.y);
        ctx.strokeStyle = isHighlighted ? "#16a34a" : "#475569";
        ctx.lineWidth = isHighlighted ? 3.5 : 1.2;
        ctx.stroke();
      }
    }

    // Nodes
    for (let [airport, pos] of Object.entries(positions)) {
      const degree = degrees[airport] || 0;
      const cappedDegree = Math.min(degree, 10);
      const radius = minR + (cappedDegree / (maxDegree || 1)) * (maxR - minR);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1f2937";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0ea5a0";
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(airport, pos.x, pos.y);
    }

    ctx.restore();
  }, [graph, size, highlightedEdges, zoom, offset]);

  // 🖱️ Mouse wheel zoom
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

  // 🖱️ Pan (drag)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleDown = (e) => {
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    };
    const handleMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      lastPos.current = { x: e.clientX, y: e.clientY };
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    };
    const handleUp = () => (isDragging.current = false);

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
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="mb-2 space-x-2">
        <button onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}>🔍 Zoom In</button>
        <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.3))}>🔎 Zoom Out</button>
        <button onClick={() => { setZoom(1); setOffset({ x: 0, y: 0 }); }}>Reset</button>
      </div>
      <canvas ref={canvasRef} className="rounded border border-slate-600 cursor-grab" />
    </div>
  );
};

export default Canvas;
