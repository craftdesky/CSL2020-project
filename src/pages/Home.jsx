import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Graph } from "../utils/Graph";
import { sampleAirports, sampleRoutes } from "../data/sampleData";

// layout
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

// graph
import Canvas from "../components/graph/Canvas";

// forms (Sidebar will call these — but Home receives callbacks)
import PathFinder from "../components/forms/pathFinder";
import AddAirport from "../components/forms/AddAirport";
import AddRoute from "../components/forms/AddRoute";
import DeleteAirport from "../components/forms/DeleteAirport";
import DeleteRoute from "../components/forms/DeleteRoute";

// analysis (GraphList moved to Analysis page)
import GraphList from "../components/analysis/GraphList";

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

      {/* Header */}
      <Header message={message} />

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          graph={graph}
          airports={airports}
          onAddAirport={handleAddAirport}
          onAddRoute={handleAddRoute}
          onDeleteAirport={handleDeleteAirport}
          onDeleteRoute={handleDeleteRoute}
          onPathResult={handlePathResult}
        />

        {/* Main Canvas Area */}
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