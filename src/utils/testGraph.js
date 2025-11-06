import { Graph } from "./Graph.js";

const g = new Graph();

g.addAirport("DEL");
g.addAirport("BOM");
g.addAirport("BLR");

g.addRoute("DEL", "BOM", 1150, 5200);
g.addRoute("DEL", "BLR", 1750, 7200);
g.addRoute("BOM", "BLR", 840, 4500);

g.printGraph();

for (let [airport, edges] of g.adjList.entries()) {
  for (let edge of edges) {
    console.log(
      `${airport} → ${edge.code} | distance=${edge.distance}, cost=${edge.cost}`
    );
  }
}