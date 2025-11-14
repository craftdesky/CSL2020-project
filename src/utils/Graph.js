export class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addAirport(code) {
    if (!this.adjList.has(code)) {
      this.adjList.set(code, []);
    }
  }

  addRoute(src, dest, distance, cost) {
    if (!this.adjList.has(src) || !this.adjList.has(dest)) {
      console.warn("Both airports must exist before adding a route.");
      return;
    }

    if (this.adjList.get(src).some((e) => e.code === dest)) {
      console.warn("Route already exists between", src, "and", dest);
      return;
    }

    const edge1 = { code: dest, distance, cost };
    const edge2 = { code: src, distance, cost };

    this.adjList.get(src).push(edge1);
    this.adjList.get(dest).push(edge2);
  }

  removeAirport(code) {
    if (!this.adjList.has(code)) return;

    for (let [airport, edges] of this.adjList.entries()) {
      this.adjList.set(
        airport,
        edges.filter((e) => e.code !== code)
      );
    }

    this.adjList.delete(code);
  }

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

  getAirports() {
    return Array.from(this.adjList.keys());
  }

  getNeighbors(node) {
    return this.adjList.get(node) || [];
  }

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

  static fromData(airports, routes) {
    const g = new Graph();
    airports.forEach((a) => g.addAirport(a));
    routes.forEach(({ src, dest, distance, cost }) => g.addRoute(src, dest, distance, cost));
    return g;
  }
  toJSON() {
      return {
        airports: Array.from(this.adjList.keys()),
        routes: Array.from(this.adjList.entries()).flatMap(([src, list]) =>
          list.map(edge => ({
            src,
            dest: edge.code,
            distance: edge.distance,
            cost: edge.cost
          }))
        )
      };
    }

    static fromJSON(data) {
      const g = new Graph();
      data.airports.forEach(a => g.addAirport(a));
      data.routes.forEach(r => g.addRoute(r.src, r.dest, r.distance, r.cost));
      return g;
    }
}