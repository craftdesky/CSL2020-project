// src/components/PathFinder.jsx
import React, { useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";

const PathFinder = ({ graph, onResult }) => {
  const airports = graph ? graph.getAirports() : [];
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [metric, setMetric] = useState("distance");
  const [message, setMessage] = useState("");

  const handleFind = () => {
    if (!src || !dest) {
      setMessage("Select source and destination.");
      return;
    }
    if (src === dest) {
      setMessage("Source and destination cannot be the same.");
      return;
    }
    const res = dijkstra(graph, src, dest, metric);
    if (!res.path) {
      setMessage("No path found.");
      onResult({ path: null, total: null, highlightedEdges: [] });
      return;
    }
    const highlightedEdges = [];
    for (let i = 0; i < res.path.length - 1; i++) {
      highlightedEdges.push([res.path[i], res.path[i + 1]]);
    }
    const unit = metric === "distance" ? "km" : "\u20B9"; // rupee symbol for cost
    const totalText = metric === "distance"
      ? `Total distance: ${res.total} ${unit}`
      : `Total cost: ${unit}${res.total}`;
    setMessage(`${totalText}`);
    onResult({ path: res.path, total: res.total, highlightedEdges, metric });
  };

  const handleClear = () => {
    setMessage("");
    setSrc("");
    setDest("");
    onResult({ path: null, total: null, highlightedEdges: [], metric: null });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Path Finder</h3>

      <div className="flex gap-2 mb-2">
        <select value={src} onChange={(e) => setSrc(e.target.value)} className="flex-1 bg-slate-800 text-slate-100 border border-slate-600 rounded px-2 py-1">
          <option value="">Source</option>
          {airports.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>

        <select value={dest} onChange={(e) => setDest(e.target.value)} className="flex-1 bg-slate-800 text-slate-100 border border-slate-600 rounded px-2 py-1">
          <option value="">Destination</option>
          {airports.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="metric" value="distance" checked={metric==="distance"} onChange={() => setMetric("distance")} />
          <span className="ml-1">Shortest (distance)</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="metric" value="cost" checked={metric==="cost"} onChange={() => setMetric("cost")} />
          <span className="ml-1">Cheapest (cost)</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button onClick={handleFind} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Find Path</button>
        <button onClick={handleClear} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Clear</button>
      </div>

      {message && <p className="mt-2 text-sm text-slate-200">{message}</p>}
    </div>
  );
};

export default PathFinder;