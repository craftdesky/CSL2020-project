import React, { useState } from "react";

const AddAirport = ({ onAdd }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    const trimmed = code.trim().toUpperCase();

    if (!trimmed) {
      setMessage("Please enter a valid airport code.");
      return;
    }

    if (trimmed.length !== 3) {
      setMessage("Airport codes should have exactly 3 letters (e.g., DEL).");
      return;
    }

    onAdd(trimmed);
    setMessage(`Airport added: ${trimmed}`);
    setCode("");

    setTimeout(() => setMessage(""), 3000);
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

      {message && (
        <p
          className={`text-sm mt-1 ${
            message.startsWith("Airport added")
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

export default AddAirport;