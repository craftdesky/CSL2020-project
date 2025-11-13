// src/components/analysis/metrics.js
// Utility metrics for analysis page (unweighted/hop-based distances)

export function getDegreeStats(graph) {
  const degrees = {};
  const airports = graph.getAirports();
  airports.forEach((a) => {
    const neigh = graph.getNeighbors(a) || [];
    degrees[a] = neigh.length;
  });

  const values = Object.values(degrees);
  const totalNodes = values.length;
  const totalDegree = values.reduce((s, v) => s + v, 0);
  const avgDegree = totalNodes ? totalDegree / totalNodes : 0;

  const maxDegree = Math.max(...values);
  const minDegree = Math.min(...values);

  const mostConnected = Object.entries(degrees)
    .filter(([, d]) => d === maxDegree)
    .map(([k]) => k);

  const leastConnected = Object.entries(degrees)
    .filter(([, d]) => d === minDegree)
    .map(([k]) => k);

  return {
    degrees,
    totalNodes,
    totalDegree,
    avgDegree,
    maxDegree,
    minDegree,
    mostConnected,
    leastConnected,
  };
}

/**
 * BFS that returns distances in number of hops from src to all reachable nodes.
 * Uses graph.getNeighbors(u) which must return an array of { code } or simple codes.
 */
export function bfsDistances(graph, src) {
  const q = [];
  const dist = {};
  q.push(src);
  dist[src] = 0;

  while (q.length) {
    const u = q.shift();
    const neighbors = graph.getNeighbors(u) || [];
    for (const nbrObj of neighbors) {
      // support both { code } or direct string
      const v = typeof nbrObj === "string" ? nbrObj : nbrObj.code;
      if (dist[v] === undefined) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist; // keys: node, value: hops distance
}

export function getConnectedComponents(graph) {
  const visited = new Set();
  const components = [];
  const nodes = graph.getAirports();

  for (const start of nodes) {
    if (visited.has(start)) continue;
    const comp = [];
    const queue = [start];
    visited.add(start);

    while (queue.length) {
      const u = queue.shift();
      comp.push(u);
      const neighbors = graph.getNeighbors(u) || [];
      for (const nbrObj of neighbors) {
        const v = typeof nbrObj === "string" ? nbrObj : nbrObj.code;
        if (!visited.has(v)) {
          visited.add(v);
          queue.push(v);
        }
      }
    }
    components.push(comp);
  }

  return components;
}

/**
 * Returns whether graph is connected (single component)
 */
export function isConnected(graph) {
  const comps = getConnectedComponents(graph);
  return comps.length <= 1;
}

/**
 * Compute eccentricity (max distance in hops to any reachable node) for every node.
 * For nodes not connected to all others, we compute distances within their component only.
 * Returns:
 *   { eccentricities: {node: ecc}, minEcc, maxEcc, centers: [...], peripherals: [...] }
 */
export function getEccentricitiesAndCenters(graph) {
  const nodes = graph.getAirports();
  const eccentricities = {};

  // BFS from each node to compute eccentricity (in hops)
  for (const n of nodes) {
    const dist = bfsDistances(graph, n);
    // If node has no reachable nodes (isolated), eccentricity = 0
    const dists = Object.values(dist);
    const ecc = dists.length ? Math.max(...dists) : 0;
    eccentricities[n] = ecc;
  }

  const values = Object.values(eccentricities);
  const minEcc = Math.min(...values);
  const maxEcc = Math.max(...values);

  const centers = Object.entries(eccentricities)
    .filter(([, e]) => e === minEcc)
    .map(([k]) => k);

  const peripherals = Object.entries(eccentricities)
    .filter(([, e]) => e === maxEcc)
    .map(([k]) => k);

  return {
    eccentricities,
    minEcc,
    maxEcc,
    centers,
    peripherals,
  };
}

/**
 * Convenience aggregator returning everything the Analysis page needs
 */
export function getAllAnalysisMetrics(graph) {
  const degreeStats = getDegreeStats(graph);
  const components = getConnectedComponents(graph);
  const connected = components.length === 1;
  const eccInfo = getEccentricitiesAndCenters(graph);

  return {
    // basic
    totalAirports: degreeStats.totalNodes,
    totalRoutes: graph.getAllEdges ? graph.getAllEdges().length : null,
    degrees: degreeStats.degrees,
    avgDegree: degreeStats.avgDegree,
    maxDegree: degreeStats.maxDegree,
    minDegree: degreeStats.minDegree,
    mostConnected: degreeStats.mostConnected,
    leastConnected: degreeStats.leastConnected,

    // connectivity
    isConnected: connected,
    components,

    // structural (centers/peripherals)
    eccentricities: eccInfo.eccentricities,
    centers: eccInfo.centers,
    peripherals: eccInfo.peripherals,
  };
}