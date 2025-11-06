import React, { useState, useEffect } from "react";
import { Graph } from "./utils/graphHandler";

// Component imports (to be implemented next)
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import GraphList from "./components/GraphList";
import PathFinder from "./components/PathFinder";
import Canvas from "./components/Canvas";

const App = () => {
  // ✅ Graph instance (the data structure core of your project)
  const [graph, setGraph] = useState(new Graph());

  // ✅ Local state to trigger re-renders when graph updates
  const [version, setVersion] = useState(0);

  // ✅ Force re-render when graph changes
  const updateGraphView = () => setVersion((v) => v + 1);

  // ✅ Example: Log graph to console whenever it updates
  useEffect(() => {
    console.log("Graph Updated:", graph.adjList);
  }, [version]);

  // Handlers for child components
  const handleAddAirport = (code) => {
    graph.addAirport(code);
    updateGraphView();
  };

  const handleDeleteAirport = (code) => {
    graph.removeAirport(code);
    updateGraphView();
  };

  const handleAddRoute = (src, dest, distance) => {
    graph.addRoute(src, dest, distance);
    updateGraphView();
  };

  const handleDeleteRoute = (src, dest) => {
    graph.removeRoute(src, dest);
    updateGraphView();
  };

  return (
    <div className="flex flex-row w-full h-screen">
      {/* 🧭 Left Control Panel */}
      <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          ✈️ Airport Route Planner
        </h1>

        {/* Add Airport Section */}
        <AddAirport onAdd={handleAddAirport} onDelete={handleDeleteAirport} />

        {/* Add Route Section */}
        <AddRoute
          airports={graph.getAirports()}
          onAdd={handleAddRoute}
          onDelete={handleDeleteRoute}
        />

        {/* Path Finder Section */}
        <PathFinder graph={graph} />

        {/* Graph Adjacency List Display */}
        <GraphList graph={graph} />
      </div>

      {/* 🧠 Right Visualization Panel */}
      <div className="flex-1 p-4">
        <Canvas graph={graph} key={version} />
      </div>
    </div>
  );
};

export default App;