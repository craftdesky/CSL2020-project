import React, { useState, useEffect } from "react";
import { Graph } from "./utils/Graph";
import AddAirport from "./components/AddAirport";
import AddRoute from "./components/AddRoute";
import GraphList from "./components/GraphList";

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

  useEffect(() => {
    console.group("Graph Updated");
    graph.printGraph();
    console.groupEnd();
  }, [graph]);

  const airports = graph.getAirports();

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Airport Route Planner</h1>
      <AddAirport onAdd={handleAddAirport} />
      <AddRoute airports={airports} onAdd={handleAddRoute} />
      <GraphList graph={graph} />
    </div>
  );
};

export default App;