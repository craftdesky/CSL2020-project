/* import React, { useState, useEffect } from "react";
import { Graph } from "./utils/graphHandler";

import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import GraphList from "./components/GraphList";
import PathFinder from "./components/PathFinder";
import Canvas from "./components/Canvas";

const App = () => {

  const [graph, setGraph] = useState(new Graph());

  const [version, setVersion] = useState(0);

  const updateGraphView = () => setVersion((v) => v + 1);

  useEffect(() => {
    console.log("Graph Updated:", graph.adjList);
  }, [version]);

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
      <div className="w-1/3 p-4 border-r border-gray-300 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          ✈️ Airport Route Planner
        </h1>
        <AddAirport onAdd={handleAddAirport} onDelete={handleDeleteAirport} />
        <AddRoute
          airports={graph.getAirports()}
          onAdd={handleAddRoute}
          onDelete={handleDeleteRoute}
        />

        <PathFinder graph={graph} />
        <GraphList graph={graph} />
      </div>

      <div className="flex-1 p-4">
        <Canvas graph={graph} key={version} />
      </div>
    </div>
  );
};

export default App; */
import React from "react";
const App = () => { 
    return (
      <div>
        Hello world ;
      </div>
    );
}

export default App ;