import React from "react";

const MessageBar = ({ message, type }) => {
  if (!message) return null;

  const color =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-blue-600";

  return (
    <div
      className={`${color} text-white text-sm px-4 py-2 rounded mb-4 shadow transition-all duration-300`}
    >
      {message}
    </div>
  );
};

export default MessageBar;