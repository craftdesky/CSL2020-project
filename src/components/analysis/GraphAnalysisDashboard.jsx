import React from "react";
import {motion} from "framer-motion" ;
import Card from "../layout/Card";
import { getAllAnalysisMetrics } from "./metrics";

export default function GraphAnalysisDashboard({ graph }) {
  const metrics = getAllAnalysisMetrics(graph);

  return (
    <div className="space-y-10">

      <h1 className="text-3xl font-bold">Graph Analysis</h1>

      {/* BASIC METRICS */}
      <Card title="Basic Graph Metrics">
        <MetricLine label="Total Airports" value={metrics.totalAirports} />
        <MetricLine label="Total Routes" value={metrics.totalRoutes} />
        <MetricLine label="Average Degree" value={metrics.avgDegree.toFixed(2)} />

        <MetricLine
          label="Max Degree Airport(s)"
          value={`${metrics.maxDegree} — ${metrics.mostConnected.join(", ")}`}
        />

        <MetricLine
          label="Min Degree Airport(s)"
          value={`${metrics.minDegree} — ${metrics.leastConnected.join(", ")}`}
        />
      </Card>

      {/* CONNECTIVITY */}
      <Card title="Connectivity">
        <MetricLine
          label="Is Graph Connected?"
          value={metrics.isConnected ? "YES" : "NO"}
        />
        <MetricLine
          label="Connected Components"
          value={metrics.components.length}
        />

        <div className="mt-3 space-y-2">
          {metrics.components.map((comp, idx) => (
            <div key={idx}>
              <span className="font-semibold">Component {idx + 1}:</span> {comp.join(", ")}
            </div>
          ))}
        </div>
      </Card>

      {/* STRUCTURAL */}
      <Card title="Structural Metrics (Eccentricity)">
        <MetricLine label="Center Airports" value={metrics.centers.join(", ")} />
        <MetricLine
          label="Peripheral Airports"
          value={metrics.peripherals.join(", ")}
        />
      </Card>

      {/* ECCENTRICITIES */}
      <Card title="Eccentricity (Hops From Each Airport)">
        <div className="space-y-1">
          {Object.entries(metrics.eccentricities).map(([node, ecc]) => (
            <div key={node} className="flex justify-between">
              <span className="text-gray-300">{node}</span>
              <span className="font-semibold">{ecc}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* DEGREES */}
      <Card title="Degree of Each Airport">
        <div className="space-y-1">
          {Object.entries(metrics.degrees).map(([node, deg]) => (
            <div key={node} className="flex justify-between">
              <span className="text-gray-300">{node}</span>
              <span className="font-semibold">{deg}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function MetricLine({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between py-1 border-b border-gray-700"
    >
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </motion.div>
  );
}