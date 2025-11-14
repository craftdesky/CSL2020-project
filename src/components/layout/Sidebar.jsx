import React from "react";
import { Link } from "react-router-dom";

// forms
import PathFinder from "../forms/pathFinder";
import AddAirport from "../forms/AddAirport";
import AddRoute from "../forms/AddRoute";
import DeleteAirport from "../forms/DeleteAirport";
import DeleteRoute from "../forms/DeleteRoute";

export default function Sidebar({
  graph,
  airports,
  onAddAirport,
  onAddRoute,
  onDeleteAirport,
  onDeleteRoute,
  onPathResult
}) {
  return (
    <aside className="w-1/3 bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto">

      {/* Analysis button */}
      <Link to="/analysis" state={{ graph: graph.toJSON() }}>
        <button className="w-full py-2 bg-gray-700 rounded-lg text-white font-semibold mb-4 hover:bg-gray-600 transition">
          📊 Open Graph Analysis
        </button>
      </Link>

      {/* Forms */}
      <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
        <PathFinder graph={graph} onResult={onPathResult} />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
        <AddAirport onAdd={onAddAirport} />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
        <AddRoute airports={airports} onAdd={onAddRoute} />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
        <DeleteAirport airports={airports} onDelete={onDeleteAirport} />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-2">
        <DeleteRoute airports={airports} onDelete={onDeleteRoute} />
      </div>

    </aside>
  );
}