// src/utils/Graph.js

export class Graph {
  constructor() {
    this.adjList = new Map();
  }

  // Add a new airport (node)
  addAirport(code) {
    if (!this.adjList.has(code)) {
      this.adjList.set(code, []);
    }
  }

  // Add a route (edge) between two airports
  addRoute(src, dest, distance, cost) {
    if (!this.adjList.has(src) || !this.adjList.has(dest)) {
      console.warn("Both airports must exist before adding a route.");
      return;
    }

    // Prevent duplicate edges
    if (this.adjList.get(src).some((e) => e.code === dest)) {
      console.warn("Route already exists between", src, "and", dest);
      return;
    }

    const edge1 = { code: dest, distance, cost };
    const edge2 = { code: src, distance, cost };

    this.adjList.get(src).push(edge1);
    this.adjList.get(dest).push(edge2);
  }

  // Remove an airport and all its routes
  removeAirport(code) {
    if (!this.adjList.has(code)) return;

    // Remove references from other airports
    for (let [airport, edges] of this.adjList.entries()) {
      this.adjList.set(
        airport,
        edges.filter((e) => e.code !== code)
      );
    }

    // Delete the airport itself
    this.adjList.delete(code);
  }

  // Remove only the route between two airports
  removeRoute(src, dest) {
    if (!this.adjList.has(src) || !this.adjList.has(dest)) return;

    this.adjList.set(
      src,
      this.adjList.get(src).filter((e) => e.code !== dest)
    );
    this.adjList.set(
      dest,
      this.adjList.get(dest).filter((e) => e.code !== src)
    );
  }

  // Return array of all airport codes
  getAirports() {
    return Array.from(this.adjList.keys());
  }

  // Return neighbors of a given airport
  getNeighbors(node) {
    return this.adjList.get(node) || [];
  }

  // Debug print graph in console
  printGraph() {
    console.group("Airport Network");
    for (let [airport, edges] of this.adjList) {
      if (edges.length === 0) {
        console.log(`${airport} → No connections`);
        continue;
      }
      const formatted = edges
        .map((e) => `${e.code} (distance: ${e.distance}, cost: ${e.cost})`)
        .join(", ");
      console.log(`${airport} → ${formatted}`);
    }
    console.groupEnd();
  }
}