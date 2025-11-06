// src/utils/Graph.js

/**
 * Graph class for representing an airport network.
 * Each node = Airport (e.g., "DEL")
 * Each edge = Route (e.g., DEL → BOM with distance)
 */

export class Graph {
  constructor() {
    // Use a Map for efficient lookups and iteration
    this.adjList = new Map();
  }

  /** Add a new airport (vertex) to the graph */
  addAirport(code) {
    if (!this.adjList.has(code)) {
      this.adjList.set(code, []); // each airport has an array of edges
    }
  }

  /** Add a new route (edge) between two airports */
  addRoute(src, dest, distance = 1) {
    if (!this.adjList.has(src) || !this.adjList.has(dest)) {
      console.warn("Both airports must exist before adding a route.");
      return;
    }

    this.adjList.get(src).push({ code: dest, dist: distance });
    this.adjList.get(dest).push({ code: src, dist: distance }); // undirected
  }

  /** Get list of all airports */
  getAirports() {
    return Array.from(this.adjList.keys());
  }

  /** Get adjacency list as an object (for display or debugging) */
  toObject() {
    const result = {};
    for (let [airport, edges] of this.adjList.entries()) {
      result[airport] = edges.map(e => `${e.code}(${e.dist})`);
    }
    return result;
  }

  /** Print the graph neatly in the console */
  printGraph() {
    console.group("✈️ Airport Network");
    for (let [airport, routes] of this.adjList) {
      const connections = routes.map(r => `${r.code}(${r.dist})`).join(", ");
      console.log(`${airport} → ${connections}`);
    }
    console.groupEnd();
  }
}