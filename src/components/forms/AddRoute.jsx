import React, { useState } from "react";

const AddRoute = ({ airports, onAdd }) => {
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [distance, setDistance] = useState("");
  const [cost, setCost] = useState("");
  const [message, setMessage] = useState(""); // message state

  const handleAddRoute = () => {
    if (!src || !dest) {
      setMessage("Please select both source and destination airports.");
      return;
    }
    if (src === dest) {
      setMessage("Source and destination airports cannot be the same.");
      return;
    }

    const distNum = parseFloat(distance);
    const costNum = parseFloat(cost);

    if (isNaN(distNum) || isNaN(costNum)) {
      setMessage("Please enter valid numeric values for distance and cost.");
      return;
    }

    onAdd(src, dest, distNum, costNum);
    setMessage(`Route added: ${src} → ${dest}`);
    setDistance("");
    setCost("");
  };

  return (
    <div className="p-2 mt-4">
      <h2 className="font-semibold mb-2 text-lg">Add Route</h2>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
          >
            <option value="">Select Source</option>
            {airports.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          <select
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
          >
            <option value="">Select Destination</option>
            {airports.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance (e.g., 1200)"
            className="border px-2 py-1 rounded flex-1"
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Cost (e.g., 5000)"
            className="border px-2 py-1 rounded flex-1"
          />
        </div>

        <button
          onClick={handleAddRoute}
          className="border px-3 py-1 rounded hover:bg-gray-100"
        >
          Add Route
        </button>

        {message && (
          <p
            className={`text-sm mt-1 ${
              message.startsWith("Route added")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddRoute;