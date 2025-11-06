import React from "react";

const GraphList = ({ graph }) => {
  if (!graph || !(graph.adjList instanceof Map)) {
    return <div className="text-gray-500">No airports added yet.</div>;
  }

  const entries = Array.from(graph.adjList.entries());

  if (entries.length === 0) {
    return <div className="text-gray-500">No airports added yet.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-2 text-lg">Adjacency List</h2>
      <ul className="list-disc ml-5 text-sm">
        {entries.map(([airport, routes]) => (
          <li key={airport} className="mb-1">
            <strong>{airport}</strong> →{" "}
            {routes.length > 0
              ? routes
                  .map((r) => {
                    const dist = r.distance !== undefined ? r.distance : r.dist ?? "N/A";
                    const cost = r.cost !== undefined ? r.cost : "N/A";
                    return `${r.code} (distance: ${dist}, cost: ${cost})`;
                  })
                  .join(", ")
              : "No connections"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GraphList;