import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Graph } from "./utils/Graph";
import { sampleAirports, sampleRoutes } from "./data/sampleData";

import PathFinder from "./components/PathFinder";
import Canvas from "./components/Canvas";
import GraphList from "./components/GraphList";
import MessageBar from "./components/MessageBar";
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import DeleteAirport from "./components/DeleteAirport";
import DeleteRoute from "./components/DeleteRoute";

const initialGraph = Graph.fromData(sampleAirports, sampleRoutes);

const Home = () => {
  const [graph, setGraph] = useState(initialGraph);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [highlightedEdges, setHighlightedEdges] = useState([]);

  const cloneGraph = (g) =>
    Object.assign(Object.create(Object.getPrototypeOf(g)), g);

  const airports = graph.getAirports();

  const handlePathResult = ({ path, total, highlightedEdges: edges, metric }) => {
    if (!path) {
      setMessage({ text: "No path found", type: "error" });
      setHighlightedEdges([]);
      return;
    }

    const routeStr = path.join(" → ");

    let text;
    if (metric === "distance") {
      text = `✅ Shortest path (by distance): ${routeStr} | Total: ${total} km`;
    } else {
      text = `💰 Cheapest path (by cost): ${routeStr} | Total: ₹${total}`;
    }

    setMessage({ text, type: "success" });
    setHighlightedEdges(edges || []);
  };

  const updateGraph = (g) => setGraph(cloneGraph(g));

  const handleAddAirport = (code) => {
    const newGraph = cloneGraph(graph);
    newGraph.addAirport(code);
    updateGraph(newGraph);
    setMessage({ text: `Airport added: ${code}`, type: "success" });
  };

  const handleAddRoute = (src, dest, distance, cost) => {
    const newGraph = cloneGraph(graph);
    newGraph.addRoute(src, dest, distance, cost);
    updateGraph(newGraph);
    setMessage({ text: `Route added: ${src} → ${dest}`, type: "success" });
  };

  const handleDeleteAirport = (code) => {
    const newGraph = cloneGraph(graph);
    newGraph.removeAirport(code);
    updateGraph(newGraph);
    setMessage({ text: `Airport deleted: ${code}`, type: "error" });
    setHighlightedEdges([]);
  };

  const handleDeleteRoute = (src, dest) => {
    const newGraph = cloneGraph(graph);
    newGraph.removeRoute(src, dest);
    updateGraph(newGraph);
    setMessage({ text: `Route deleted: ${src} → ${dest}`, type: "error" });
    setHighlightedEdges([]);
  };

  return (
    <div className="w-screen h-screen bg-gray-950 text-white flex flex-col">
      <header className="px-8 py-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Airport Route Planner</h1>
        <div className="w-1/2">
          <MessageBar message={message.text} type={message.type} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/3 bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto">
          
          {/* NEW BUTTON TO OPEN ANALYSIS PAGE */}
          <Link to="/analysis" state={{ graph: graph.toJSON() }}>
            <button className="w-full py-2 bg-gray-700 rounded-lg text-white font-semibold mb-4 hover:bg-gray-600 transition">
                📊 Open Graph Analysis
            </button>
            </Link>

          <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
            <PathFinder graph={graph} onResult={handlePathResult} />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
            <AddAirport onAdd={handleAddAirport} />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
            <AddRoute airports={airports} onAdd={handleAddRoute} />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
            <DeleteAirport airports={airports} onDelete={handleDeleteAirport} />
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
            <DeleteRoute airports={airports} onDelete={handleDeleteRoute} />
          </div>

          {/* REMOVED ANALYSIS DASHBOARD FROM SIDEBAR */}
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

export default Home;