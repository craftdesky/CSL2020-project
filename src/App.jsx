import React from "react";
import AddAirport from "./components/AddAirport";

const App = () => {
  const handleAdd = (code) => {
    console.log("AddAirport fired with:", code);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Component Test: AddAirport</h1>
      <AddAirport onAdd={handleAdd} />
    </div>
  );
};

export default App;