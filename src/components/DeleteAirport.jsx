// src/components/DeleteAirport.jsx
import React, { useState } from "react";

const DeleteAirport = ({ airports, onDelete }) => {
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    if (!selected) {
      setMessage("Please select an airport to delete.");
      return;
    }

    onDelete(selected);
    setMessage(`Deleted airport: ${selected}`);
    setSelected("");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-2">
      <h2 className="font-semibold mb-2 text-lg">Delete Airport</h2>
      <div className="flex gap-2">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        >
          <option value="">Select Airport</option>
          {airports.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button
          onClick={handleDelete}
          className="border px-3 py-1 rounded hover:bg-gray-100 text-red-500"
        >
          Delete
        </button>
      </div>
      {message && (
        <p
          className={`text-sm mt-1 ${
            message.startsWith("Deleted")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteAirport;