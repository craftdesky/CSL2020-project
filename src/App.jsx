import React, { useState, useEffect } from "react";
import { Graph } from "./utils/Graph";
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import DeleteAirport from "./components/DeleteAirport";
import DeleteRoute from "./components/DeleteRoute";
import GraphList from "./components/GraphList";
import Canvas from "./components/Canvas";
import MessageBar from "./components/MessageBar";

const App = () => {
  const [graph, setGraph] = useState(new Graph());
  const [message, setMessage] = useState({ text: "", type: "" });

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
  };

  const handleDeleteRoute = (src, dest) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.removeRoute(src, dest);
    updateGraph(newGraph);
    setMessage({ text: `Route deleted: ${src} → ${dest}`, type: "error" });
  };

  useEffect(() => {
    console.group("Graph Updated");
    graph.printGraph();
    console.groupEnd();
  }, [graph]);

  const airports = graph.getAirports();

  return (    
    <div className="w-screen h-screen bg-gray-950 text-white flex flex-col">
      {/* HEADER */}
      <header className="px-8 py-4 border-b border-gray-700 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Airport Route Planner</h1>
        <div className="w-1/3">
          <MessageBar message={message.text} type={message.type} />
        </div>
      </header>
      {/* MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT CONTROL PANEL */}
        <aside className="w-1/3 bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto">
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

          {/* Adjacency List Section */}
          <div className="bg-gray-800 p-4 rounded-lg shadow flex-1 overflow-y-auto">
            <GraphList graph={graph} />
          </div>
        </aside>

        {/* RIGHT VISUALIZATION AREA */}
        <main className="flex-1 flex items-center justify-center bg-gray-950">
          <Canvas graph={graph} />
        </main>
      </div>
    </div>
  );
};

export default App;