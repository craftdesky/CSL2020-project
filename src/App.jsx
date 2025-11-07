import React, { useState, useEffect } from "react";
import { Graph } from "./utils/Graph";
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import DeleteAirport from "./components/DeleteAirport";
import DeleteRoute from "./components/DeleteRoute";
import GraphList from "./components/GraphList";
import Canvas from "./components/Canvas";

const App = () => {
  const [graph, setGraph] = useState(new Graph());

  const updateGraph = (g) => {
    setGraph(Object.assign(Object.create(Object.getPrototypeOf(g)), g));
  };

  const handleAddAirport = (code) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.addAirport(code);
    updateGraph(newGraph);
  };

  const handleAddRoute = (src, dest, distance, cost) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.addRoute(src, dest, distance, cost);
    updateGraph(newGraph);
  };

  const handleDeleteAirport = (code) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.removeAirport(code);
    updateGraph(newGraph);
  };

  const handleDeleteRoute = (src, dest) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.removeRoute(src, dest);
    updateGraph(newGraph);
  };

  useEffect(() => {
    console.group("Graph Updated");
    graph.printGraph();
    console.groupEnd();
  }, [graph]);

  const airports = graph.getAirports();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6">Airport Route Planner</h1>

      <div className="flex w-full gap-8">
        {/* LEFT PANEL */}
        <div className="w-1/3 flex flex-col gap-6">
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
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg shadow flex justify-center items-center">
          <Canvas graph={graph} />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-8 bg-gray-800 p-4 rounded-lg shadow">
        <GraphList graph={graph} />
      </div>
    </div>
  );
};

export default App;