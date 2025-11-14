export function bellmanFord(graph, src, dest, metric = "distance") {
  const airports = graph.getAirports();
  const indexMap = {};
  airports.forEach((a, i) => indexMap[a] = i);
  const n = airports.length;
  const dist = Array(n).fill(Infinity);
  const pred = Array(n).fill(null);
  dist[indexMap[src]] = 0;

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
