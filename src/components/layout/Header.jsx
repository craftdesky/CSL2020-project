import React from "react";
import MessageBar from "../MessageBar";

export default function Header({ message }) {
  return (
    <header className="px-8 py-4 border-b border-gray-700 flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-wide">Airport Route Planner</h1>

      <div className="w-1/2">
        <MessageBar message={message.text} type={message.type} />
      </div>
    </header>
  );
}