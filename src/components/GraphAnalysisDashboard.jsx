import React from "react";

function getDegreeCentrality(graph) {
  const degrees = {};
  for (let [airport, edges] of graph.adjList.entries()) {
    degrees[airport] = edges.length;
  }
  const maxDegree = Math.max(...Object.values(degrees));
  const mostConnected = Object.entries(degrees)
    .filter(([, d]) => d === maxDegree)
    .map(([code]) => code);
  return { degrees, mostConnected, maxDegree };
}

function getConnectedComponents(graph) {
  const visited = new Set();
  const components = [];
  const nodes = Array.from(graph.adjList.keys());
  for (const start of nodes) {
    if (visited.has(start)) continue;
    const comp = [];
    const queue = [start];
    visited.add(start);
    while (queue.length) {
      const u = queue.shift();
      comp.push(u);
      for (const { code: v } of graph.getNeighbors(u)) {
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

function getBetweennessCentrality(graph) {
  const airports = Array.from(graph.adjList.keys());
  const betweenness = {};
  airports.forEach(a => betweenness[a] = 0);
  function bfsPaths(src, dst) {
    if (src === dst) return [];
    let queue = [[src, [src]]];
    let res = [];
    while (queue.length) {
      let [node, path] = queue.shift();
      if (node === dst) {
        res.push(path);
        continue;
      }
      for (const { code: nbr } of graph.getNeighbors(node)) {
        if (!path.includes(nbr)) {
          queue.push([nbr, [...path, nbr]]);
        }
      }
    }
    return res;
  }
  for (let i = 0; i < airports.length; ++i) {
    for (let j = i + 1; j < airports.length; ++j) {
      const allPaths = bfsPaths(airports[i], airports[j]);
      for (const p of allPaths) {
        for (let k = 1; k < p.length - 1; ++k) {
          betweenness[p[k]]++;
        }
      }
    }
  }
  const maxBetw = Math.max(...Object.values(betweenness));
  const hubs = Object.entries(betweenness)
    .filter(([, x]) => x === maxBetw)
    .map(([code]) => code);
  return { betweenness, hubs };
}

const GraphAnalysisDashboard = ({ graph }) => {
  if (!graph) return null;
  const { mostConnected, maxDegree, degrees } = getDegreeCentrality(graph);
  const components = getConnectedComponents(graph);
  const { betweenness, hubs } = getBetweennessCentrality(graph);

  return (
    <div style={{
      background: "#192234",
      borderRadius: 10,
      padding: 16,
      marginTop: 8,
      color: "#fff",
      fontFamily: "sans-serif",
      fontSize: "15px"
    }}>
      <h3 style={{ fontWeight: 800, fontSize: 19, marginBottom: 8 }}>Graph Analysis Dashboard</h3>
      <div style={{ marginBottom: 16 }}>
        <strong>Most Connected Airport(s):</strong>
        <span style={{ marginLeft: 8 }}>
          {mostConnected.join(', ')} (Degree {maxDegree})
        </span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Hub Airport(s):</strong>
        <span style={{ marginLeft: 8 }}>
          {hubs.join(', ')}
        </span>
      </div>
      <div style={{ marginBottom: 16, maxHeight: 90, overflowY: "auto" }}>
        <strong>Subnetworks ({components.length}):</strong>
        <ul style={{ margin: 0, padding: 0 }}>
          {components.map((comp, i) =>
            <li key={i} style={{ marginBottom: 2, marginLeft: 8 }}>
              <span>{comp.join(', ')}</span>
            </li>
          )}
        </ul>
      </div>
      <details>
        <summary style={{ cursor: "pointer", color: "#bbb", marginTop: 12 }}>
          All Degree/Centrality Stats
        </summary>
        <div style={{ marginTop: 4, fontFamily: "monospace", fontSize: 13 }}>
          <u>Degree Centrality:</u><br/>
          {Object.entries(degrees)
            .map(([k, v]) => `${k}: ${v}`).join(" | ")}
          <br/><u>Betweenness Centrality:</u><br/>
          {Object.entries(betweenness)
            .map(([k, v]) => `${k}: ${v}`).join(" | ")}
        </div>
      </details>
    </div>
  );
};

export default GraphAnalysisDashboard;
