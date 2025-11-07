import React, { useState, useEffect } from "react";
import { Graph } from "./utils/Graph";
import AddAirport from "./components/AddAirport";
import GraphList from "./components/GraphList";

const App = () => {
  const [graph, setGraph] = useState(new Graph());

  const updateGraph = (g) => {
    setGraph(Object.assign(Object.create(Object.getPrototypeOf(g)), g));
  };

  const handleAdd = (code) => {
    const newGraph = Object.assign(Object.create(Object.getPrototypeOf(graph)), graph);
    newGraph.addAirport(code);
    updateGraph(newGraph);
  };

  useEffect(() => {
    console.group("Graph Updated");
    graph.printGraph();
    console.groupEnd();
  }, [graph]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Component Test: AddAirport</h1>
      <AddAirport onAdd={handleAdd} />
      <GraphList graph={graph} />
    </div>
  );
};

export default App;