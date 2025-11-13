import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Graph } from "../utils/Graph";
import GraphAnalysisDashboard from "../components/analysis/GraphAnalysisDashboard";

export default function Analysis() {
  const location = useLocation();
  const graphData = location.state?.graph;

  if (!graphData) {
    return (
      <div className="text-center text-gray-300 p-10">
        <h2 className="text-2xl mb-4">No graph data received</h2>
        <Link to="/" className="underline text-blue-400">
          Go back to Home
        </Link>
      </div>
    );
  }

  const graph = Graph.fromJSON(graphData);

  return (
    <div className="p-8 bg-gray-950 min-h-screen text-white space-y-8">

      <Link to="/" className="text-blue-400 underline text-lg">
        ← Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        <GraphAnalysisDashboard graph={graph} />
      </motion.div>
    </div>
  );
}