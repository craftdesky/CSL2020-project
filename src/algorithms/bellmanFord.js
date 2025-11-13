// src/algorithms/bellmanFord.js

// Bellman-Ford for shortest path from src to dest, using either 'distance' or 'cost'.
export function bellmanFord(graph, src, dest, metric = "distance") {
  const airports = graph.getAirports();
  const indexMap = {};
  airports.forEach((a, i) => indexMap[a] = i);
  const n = airports.length;

  // Initialize distances and predecessors
  const dist = Array(n).fill(Infinity);
  const pred = Array(n).fill(null);
  dist[indexMap[src]] = 0;

  // Relax all edges n-1 times
  for (let k = 0; k < n - 1; k++) {
    for (let u = 0; u < n; u++) {
      const airport = airports[u];
      for (const edge of graph.getNeighbors(airport)) {
        const v = indexMap[edge.code];
        const weight = (metric === 'distance') ? edge.distance : edge.cost;
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          pred[v] = u;
        }
      }
    }
  }
  // Optional: Detect negative cycles (not applicable in airport)

  // Build path
  const path = [];
  let curr = indexMap[dest];
  if (dist[curr] === Infinity) return { path: null, total: null, visited: airports };
  while (curr !== null) {
    path.unshift(airports[curr]);
    if (curr === indexMap[src]) break;
    curr = pred[curr];
  }
  return { path, total: dist[indexMap[dest]], visited: airports };
}
