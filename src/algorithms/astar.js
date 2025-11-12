class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node, priority) {
    this.heap.push({ node, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (!this.heap.length) return null;
    this._swap(0, this.heap.length - 1);
    const res = this.heap.pop();
    this.bubbleDown(0);
    return res;
  }

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return i * 2 + 1;
  }

  _right(i) {
    return i * 2 + 2;
  }

  bubbleUp(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (this.heap[p].priority <= this.heap[i].priority) break;
      this._swap(i, p);
      i = p;
    }
  }

  bubbleDown(i) {
    while (true) {
      const l = this._left(i),
        r = this._right(i);
      let smallest = i;
      if (l < this.heap.length && this.heap[l].priority < this.heap[smallest].priority)
        smallest = l;
      if (r < this.heap.length && this.heap[r].priority < this.heap[smallest].priority)
        smallest = r;
      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
  }

  _swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  size() {
    return this.heap.length;
  }
}

function defaultHeuristic(a, b) {
  return 0;
}

export function astar(graph, src, dest, metric = "distance", heuristic = defaultHeuristic) {
  if (!graph || !graph.adjList) throw new Error("Invalid graph");
  if (!graph.adjList.has(src) || !graph.adjList.has(dest)) {
    return { path: null, total: null, visited: [], distMap: new Map() };
  }
  if (metric !== "distance" && metric !== "cost") metric = "distance";

  const dist = new Map();
  const prev = new Map();
  const visitedOrder = [];
  const fScore = new Map();

  for (let node of graph.getAirports()) {
    dist.set(node, Infinity);
    prev.set(node, null);
    fScore.set(node, Infinity);
  }
  dist.set(src, 0);
  fScore.set(src, heuristic(src, dest));

  const heap = new MinHeap();
  heap.push(src, fScore.get(src));

  while (heap.size()) {
    const top = heap.pop();
    if (!top) break;
    const u = top.node;
    const fu = top.priority;

    if (fu > fScore.get(u)) continue;
    visitedOrder.push(u);

    if (u === dest) break;

    const neighbors = graph.getNeighbors(u);
    for (let edge of neighbors) {
      const v = edge.code;
      const w = Number(edge[metric] ?? Infinity);
      if (!isFinite(w) || w < 0) continue;

      const tentative_gScore = dist.get(u) + w;
      if (tentative_gScore < dist.get(v)) {
        dist.set(v, tentative_gScore);
        prev.set(v, u);
        const f = tentative_gScore + heuristic(v, dest);
        fScore.set(v, f);
        heap.push(v, f);
      }
    }
  }

  if (!isFinite(dist.get(dest))) {
    return { path: null, total: null, visited: visitedOrder, distMap: dist };
  }

  const path = [];
  let cur = dest;
  while (cur !== null) {
    path.push(cur);
    cur = prev.get(cur);
  }
  path.reverse();
  return { path, total: dist.get(dest), visited: visitedOrder, distMap: dist };
}
