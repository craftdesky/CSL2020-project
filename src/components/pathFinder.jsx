import React, { useState } from "react";
import { dijkstra } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";

// Simple Euclidean heuristic example (adjust with your node coordinates)
const euclideanHeuristic = (a, b) => {
  // Example: assuming airports are strings like "X,Y", parse and calc distance
  const [ax, ay] = a.split(",").map(Number);
  const [bx, by] = b.split(",").map(Number);
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
};

const PathFinder = ({ graph, onResult }) => {
  const airports = graph ? graph.getAirports() : [];
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [metric, setMetric] = useState("distance");
  const [algorithm, setAlgorithm] = useState("dijkstra"); // add state for algorithm
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(null);

  const handleFind = () => {
    if (!src || !dest) {
      setMessage("Select source and destination.");
      return;
    }
    if (src === dest) {
      setMessage("Source and destination cannot be the same.");
      return;
    }

    const start = performance.now(); // start timer

    let res;
    if (algorithm === "dijkstra") {
      res = dijkstra(graph, src, dest, metric);
    } else if (algorithm === "astar") {
      res = astar(graph, src, dest, metric, euclideanHeuristic);
    }

    const end = performance.now(); // end timer
    setDuration(end - start);

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

    setMessage(totalText);
    onResult({ path: res.path, total: res.total, highlightedEdges, metric });
  };

  const handleClear = () => {
    setMessage("");
    setSrc("");
    setDest("");
    setDuration(null);
    onResult({ path: null, total: null, highlightedEdges: [], metric: null });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Path Finder</h3>

      <div className="flex gap-2 mb-2">
        <select value={src} onChange={(e) => setSrc(e.target.value)} 
          className="flex-1 bg-slate-800 text-slate-100 border border-slate-600 rounded px-2 py-1">
          <option value="">Source</option>
          {airports.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>

        <select value={dest} onChange={(e) => setDest(e.target.value)} 
          className="flex-1 bg-slate-800 text-slate-100 border border-slate-600 rounded px-2 py-1">
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

      <div className="flex items-center gap-4 mb-3">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="algorithm" value="dijkstra" checked={algorithm === "dijkstra"} onChange={() => setAlgorithm("dijkstra")} />
          <span className="ml-1">Dijkstra</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="algorithm" value="astar" checked={algorithm === "astar"} onChange={() => setAlgorithm("astar")} />
          <span className="ml-1">A*</span>
        </label>
      </div>

      <div className="flex gap-2">
        <button onClick={handleFind} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">Find Path</button>
        <button onClick={handleClear} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded">Clear</button>
      </div>

      {message && <p className="mt-2 text-sm text-slate-200">{message}</p>}
      {duration !== null && (
        <p className="mt-1 text-xs text-slate-400">
          Time taken: {duration.toFixed(2)} ms
        </p>
      )}
    </div>
  );
};

export default PathFinder;
