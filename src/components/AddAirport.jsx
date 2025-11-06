import React, { useState } from "react";

const AddAirport = ({ onAdd }) => {
  const [code, setCode] = useState("");

  const handleAdd = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    onAdd(trimmed);
    setCode("");
  };

  return (
    <div className="p-2">
      <h2 className="font-semibold mb-2 text-lg">Add Airport</h2>
      <div className="flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Airport Code (e.g., DEL)"
          className="border px-2 py-1 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddAirport;