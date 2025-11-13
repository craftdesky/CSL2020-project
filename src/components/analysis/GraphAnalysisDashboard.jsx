// src/components/analysis/GraphAnalysisDashboard.jsx
import React from "react";
import { getAllAnalysisMetrics } from "./metrics";

export default function GraphAnalysisDashboard({ graph }) {
  if (!graph) {
    return (
      <div className="text-center text-gray-300 p-6">
        No graph data received.
      </div>
    );
  }

  const metrics = getAllAnalysisMetrics(graph);

  return (
    <div className="space-y-10 p-4">

      {/* MAIN TITLE */}
      <h1 className="text-3xl font-bold mb-4">Graph Analysis</h1>

      {/* BASIC METRICS */}
      <Section title="Basic Graph Metrics">
        <MetricLine label="Total Airports" value={metrics.totalAirports} />
        <MetricLine label="Total Routes" value={metrics.totalRoutes} />
        <MetricLine label="Average Degree" value={metrics.avgDegree.toFixed(2)} />
        <MetricLine
          label="Max Degree Airports"
          value={`${metrics.maxDegree} — ${metrics.mostConnected.join(", ")}`}
        />
        <MetricLine
          label="Min Degree Airports"
          value={`${metrics.minDegree} — ${metrics.leastConnected.join(", ")}`}
        />
      </Section>

      {/* CONNECTIVITY */}
      <Section title="Connectivity">
        <MetricLine
          label="Is Graph Connected?"
          value={metrics.isConnected ? "YES" : "NO"}
        />
        <MetricLine
          label="Connected Components"
          value={metrics.components.length}
        />

        {/* List components */}
        <div className="mt-3">
          {metrics.components.map((comp, idx) => (
            <div key={idx} className="mb-1">
              <span className="font-semibold">Component {idx + 1}: </span>
              {comp.join(", ")}
            </div>
          ))}
        </div>
      </Section>

      {/* STRUCTURAL METRICS (without radius/diameter) */}
      <Section title="Structural Metrics">
        <MetricLine
          label="Center Airports (minimum eccentricity)"
          value={metrics.centers.join(", ")}
        />
        <MetricLine
          label="Peripheral Airports (maximum eccentricity)"
          value={metrics.peripherals.join(", ")}
        />
      </Section>

      {/* ECCENTRICITIES */}
      <Section title="Eccentricity (in hops)">
        <div className="space-y-1">
          {Object.entries(metrics.eccentricities).map(([node, ecc]) => (
            <div key={node} className="flex justify-between">
              <span className="text-gray-300">{node}</span>
              <span className="font-semibold">{ecc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* RAW DEGREE LIST */}
      <Section title="Degree of Each Airport">
        <div className="space-y-1">
          {Object.entries(metrics.degrees).map(([node, deg]) => (
            <div key={node} className="flex justify-between">
              <span className="text-gray-300">{node}</span>
              <span className="font-semibold">{deg}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------------------- UI COMPONENTS ---------------------- */

function Section({ title, children }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function MetricLine({ label, value }) {
  return (
    <div className="flex justify-between py-1 border-b border-gray-700">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}