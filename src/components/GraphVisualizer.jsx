import React from "react";

const GraphVisualizer = ({
  nodes,
  edges,
  visitedNodes = [],
  pathEdges = [],
  visitedStep = 0,
  pathStep = 0
}) => {
  // Slices: animate exploration and then path steps
  const currentVisited = visitedNodes.slice(0, visitedStep);
  const currentPath = pathEdges.slice(0, pathStep);
  const isPathEdge = (start, end) => currentPath.some(([s, e]) => (s === start && e === end) || (s === end && e === start));
  return (
    <svg width={600} height={400} style={{ border: "1px solid #222", background: "#101722" }}>
      {/* Edges */}
      {edges.map(([start, end], idx) => (
        <line
          key={idx}
          x1={nodes[start].x}
          y1={nodes[start].y}
          x2={nodes[end].x}
          y2={nodes[end].y}
          stroke={isPathEdge(start, end) ? "#27ec5f" : "#2d3756"}
          strokeWidth={isPathEdge(start, end) ? 4 : 2}
        />
      ))}
      {/* Nodes */}
      {Object.entries(nodes).map(([id, { x, y }]) => {
        const visited = currentVisited.includes(id);
        const onFinalPath = currentPath.flat().includes(id);
        let fill = "#222c40";
        if (onFinalPath) fill = "#27ec5f"; // green for final path
        else if (visited) fill = "#42a7ff"; // blue for visited
        return (
          <g key={id}>
            <circle cx={x} cy={y} r={17} fill={fill} stroke="#255dc5" strokeWidth={visited ? 4 : 2} />
            <text x={x} y={y + 6} textAnchor="middle" fontWeight="bold" fontSize={16} fill="#fff">{id}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default GraphVisualizer;
