// src/components/Canvas.jsx
import React, { useEffect, useRef, useState } from "react";

const Canvas = ({ graph, highlightedEdges = [] }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [size, setSize] = useState({ w: 600, h: 400 });

  // Resize observer to adapt to container
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ w: Math.max(300, rect.width - 20), h: Math.max(300, rect.height - 20) });
    });
    if (containerRef.current) ro.observe(containerRef.current);
    const onResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ w: Math.max(300, rect.width - 20), h: Math.max(300, rect.height - 20) });
    };
    window.addEventListener("resize", onResize);
    return () => { ro.disconnect(); window.removeEventListener("resize", onResize); };
  }, []);

  // Track highlighted edges
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Clear & background
    ctx.clearRect(0, 0, size.w, size.h);
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, size.w, size.h);

    if (!graph || !(graph.adjList instanceof Map) || graph.adjList.size === 0) return;

    const airports = Array.from(graph.adjList.keys());
    const n = airports.length;
    const cx = size.w / 2, cy = size.h / 2;
    const circleRadius = Math.min(size.w, size.h) / 2.6;

    // Compute node positions
    const positions = {};
    airports.forEach((a, i) => {
      const angle = (2 * Math.PI * i) / n;
      positions[a] = {
        x: cx + circleRadius * Math.cos(angle),
        y: cy + circleRadius * Math.sin(angle)
      };
    });

    // --- Compute degree info for scaling ---
    const degrees = {};
    let maxDegree = 0;
    for (let [airport, edges] of graph.adjList.entries()) {
      degrees[airport] = edges.length;
      if (edges.length > maxDegree) maxDegree = edges.length;
    }

    // Define radius scale range
    const minR = 14; // smallest node radius
    const maxR = 34; // largest node radius

    // --- Draw edges ---
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

    // --- Draw nodes ---
    for (let [airport, pos] of Object.entries(positions)) {
      const degree = degrees[airport] || 0;
      const cappedDegree = Math.min(degree, 10); // threshold
      const radius = minR + ((cappedDegree / (maxDegree || 1)) * (maxR - minR));

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#1f2937";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0ea5a0";
      ctx.stroke();

      // Airport code label
      ctx.fillStyle = "#fff";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(airport, pos.x, pos.y);
    }
  }, [graph, size, highlightedEdges]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded" />
    </div>
  );
};

export default Canvas;