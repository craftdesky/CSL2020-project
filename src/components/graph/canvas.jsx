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

    ctx.clearRect(0, 0, size.w, size.h);
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(0, 0, size.w, size.h);

    if (!graph || !(graph.adjList instanceof Map) || graph.adjList.size === 0) return;

    const degrees = {};
    let maxDegree = 0;
    for (let [airport, edges] of graph.adjList.entries()) {
      degrees[airport] = edges.length;
      if (edges.length > maxDegree) maxDegree = edges.length;
    }

    const sortedAirports = Array.from(graph.adjList.keys()).sort((a, b) => degrees[b] - degrees[a]);
    const n = sortedAirports.length;

    const indices = interleaveIndices(n);
    const airports = Array(n);
    indices.forEach((idx, k) => {
      airports[idx] = sortedAirports[k];
    });

    const cx = size.w / 2, cy = size.h / 2;
    const circleRadius = Math.min(size.w, size.h) / 2.6;
    const positions = {};
    airports.forEach((a, i) => {
      const angle = (2 * Math.PI * i) / n;
      positions[a] = {
        x: cx + circleRadius * Math.cos(angle),
        y: cy + circleRadius * Math.sin(angle)
      };
    });

    const minR = 14;
    const maxR = 34;

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

    for (let [airport, pos] of Object.entries(positions)) {
      const degree = degrees[airport] || 0;
      const cappedDegree = Math.min(degree, 10);
      const radius = minR + ((cappedDegree / (maxDegree || 1)) * (maxR - minR));
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
  }, [graph, size, highlightedEdges]);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="rounded" />
    </div>
  );
};

export default Canvas;
