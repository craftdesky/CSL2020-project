import { Graph } from "./Graph.js";

const g = new Graph();

g.addAirport("DEL");
g.addAirport("BOM");
g.addAirport("BLR");

g.addRoute("DEL", "BOM", 1150);
g.addRoute("DEL", "BLR", 1750);

g.printGraph();

// Optional: see structure as an object
console.log(g.toObject());