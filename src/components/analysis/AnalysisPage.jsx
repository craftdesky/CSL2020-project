import React from "react";
import { useLocation, Link } from "react-router-dom";
import GraphAnalysisDashboard from "./GraphAnalysisDashboard";
import { Graph } from "../../utils/Graph";
import GraphList from "../GraphList";

const AnalysisPage = () => {
  const location = useLocation();
  const raw = location.state?.graph;

  if (!raw) {
    return (
      <div className="text-white p-10 text-center">
        <h1 className="text-2xl mb-4">No graph data received</h1>
        <Link to="/" className="text-blue-400 underline">
          Go back to Home
        </Link>
      </div>
    );
  }

  // REBUILD GRAPH
  const graph = Graph.fromJSON(raw);

  return (
    <div className="bg-gray-950 min-h-screen text-white p-8 overflow-y-auto">
      <Link to="/" className="text-blue-400 underline text-lg">
        ⬅ Back to Home
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Graph Analysis
      </h1>

      <GraphAnalysisDashboard graph={graph} />
      <div className="bg-gray-800 p-4 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-3">Adjacency List</h2>
        <GraphList graph={graph} />
        </div>
    </div>
  );
};

export default AnalysisPage;