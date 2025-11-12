export function fewestStops(graph, src, dest) {
  if (!graph || !graph.adjList) throw new Error("Invalid graph");
  if (!graph.adjList.has(src) || !graph.adjList.has(dest)) {
    return { path: null, total: null, visited: [] };
  }
  const visited = new Set();
  const queue = [[src, [src]]];
  visited.add(src);
  while (queue.length) {
    const [node, path] = queue.shift();
    if (node === dest) {
      return { path, total: path.length - 1, visited: Array.from(visited) };
    }
    for (const neighbor of graph.getNeighbors(node)) {
      const next = neighbor.code;
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, [...path, next]]);
      }
    }
  }
  return { path: null, total: null, visited: Array.from(visited) };
}
