export class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addAirport(code) {
    if (!this.adjList.has(code)) this.adjList.set(code, []);
  }

  addRoute(src, dest, distance, cost) {
    if (!this.adjList.has(src) || !this.adjList.has(dest)) return;

    this.adjList.get(src).push({ code: dest, distance, cost });
    this.adjList.get(dest).push({ code: src, distance, cost });
  }

  getNeighbors(node) {
    return this.adjList.get(node) || [];
  }

  getAirports() {
    return Array.from(this.adjList.keys());
  }
  printGraph() {
    console.group("Airport Network");
    for (let [airport, edges] of this.adjList) {
      if (edges.length === 0) {
        console.log(`${airport} → No connections`);
        continue;
      }
      const formatted = edges
        .map(
          (e) =>
            `${e.code} (distance: ${e.distance}, cost: ${e.cost})`
        )
        .join(", ");
      console.log(`${airport} → ${formatted}`);
    }
    console.groupEnd();
  }

  toObject() {
    const result = {};
    for (let [airport, edges] of this.adjList) {
      result[airport] = edges.map((e) => ({
        code: e.code,
        distance: e.distance,
        cost: e.cost,
      }));
    }
    return result;
  }
}