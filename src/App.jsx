// src/App.jsx
import React, { useState, useEffect } from "react";
import { Graph } from "./utils/Graph";
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import DeleteAirport from "./components/DeleteAirport";
import DeleteRoute from "./components/DeleteRoute";
import GraphList from "./components/GraphList";
import Canvas from "./components/Canvas";
import MessageBar from "./components/MessageBar";
import PathFinder from "./components/PathFinder";

const App = () => {
  const [graph, setGraph] = useState(new Graph());
  const [message, setMessage] = useState({ text: "", type: "" });
  const [highlightedEdges, setHighlightedEdges] = useState([]);

  const updateGraph = (g) => {
    setGraph(Object.assign(Object.create(Object.getPrototypeOf(g)), g));
  };

  const handleAddAirport = (code) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.addAirport(code);
    updateGraph(newGraph);
    setMessage({ text: `Airport added: ${code}`, type: "success" });
  };

  const handleAddRoute = (src, dest, distance, cost) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.addRoute(src, dest, distance, cost);
    updateGraph(newGraph);
    setMessage({ text: `Route added: ${src} → ${dest}`, type: "success" });
  };

  const handleDeleteAirport = (code) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.removeAirport(code);
    updateGraph(newGraph);
    setMessage({ text: `Airport deleted: ${code}`, type: "error" });
    setHighlightedEdges([]);
  };

  const handleDeleteRoute = (src, dest) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.removeRoute(src, dest);
    updateGraph(newGraph);
    setMessage({ text: `Route deleted: ${src} → ${dest}`, type: "error" });
    setHighlightedEdges([]);
  };

  useEffect(() => {
    console.group("Graph Updated");
    graph.printGraph();
    console.groupEnd();
  }, [graph]);

  const airports = graph.getAirports();

  // result comes from PathFinder
  const handlePathResult = ({ path, total, highlightedEdges: edges, metric }) => {
    if (!path) {
      setMessage({ text: "No path found", type: "error" });
      setHighlightedEdges([]);
      return;
    }
    const routeStr = path.join(" → ");
    let text;
    if (metric === "distance") {
      text = `Shortest path (by distance): ${routeStr} | Total: ${total} km`;
    } else {
      text = `Cheapest path (by cost): ${routeStr} | Total: ₹${total}`;
    }
    setMessage({ text, type: "success" });
    setHighlightedEdges(edges || []);
  };

  return (
    <div className="w-screen h-screen bg-gray-950 text-white flex flex-col">
      <header className="px-8 py-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Airport Route Planner</h1>
        <div className="w-1/3">
          <MessageBar message={message.text} type={message.type} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-1/3 bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <PathFinder graph={graph} onResult={handlePathResult} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <AddAirport onAdd={handleAddAirport} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <AddRoute airports={airports} onAdd={handleAddRoute} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <DeleteAirport airports={airports} onDelete={handleDeleteAirport} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <DeleteRoute airports={airports} onDelete={handleDeleteRoute} />
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow flex-1 overflow-y-auto">
            <GraphList graph={graph} />
          </div>
        </aside>

        <main className="flex-1 flex items-center justify-center bg-gray-950 p-6">
          <div className="w-full h-full max-w-6xl max-h-[80vh]">
            <Canvas graph={graph} highlightedEdges={highlightedEdges} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;