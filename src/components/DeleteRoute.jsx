import React, { useState } from "react";

const DeleteRoute = ({ airports, onDelete }) => {
  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = () => {
    if (!src || !dest) {
      setMessage("Please select both source and destination airports.");
      return;
    }
    if (src === dest) {
      setMessage("Source and destination cannot be the same.");
      return;
    }

    onDelete(src, dest);
    setMessage(`Deleted route: ${src} → ${dest}`);
    setSrc("");
    setDest("");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-2">
      <h2 className="font-semibold mb-2 text-lg">Delete Route</h2>
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

        <button
          onClick={handleDelete}
          className="border px-3 py-1 rounded hover:bg-gray-100 text-red-500"
        >
          Delete Route
        </button>

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
    </div>
  );
};

export default DeleteRoute;