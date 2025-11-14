# Airport Route Planner

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Dependencies](#dependencies)
- [How to Use](#how-to-use)
- [Learning Outcomes](#learning-outcomes)
- [Contributors](#contributors)
- [License](#license)

## Overview
The Airport Route Planner is a web-based application designed to visualize and analyze graph-based data structures, specifically focusing on airport routes. This project is ideal for B.Tech 2nd-year students to understand and implement graph algorithms in a practical setting.

## Features
- **Graph Algorithms**: Implementation of Dijkstra, Bellman-Ford, and A* algorithms for shortest path calculations.
- **Interactive Visualization**: Graphical representation of airports and routes.
- **Dynamic Forms**: Add or remove airports and routes dynamically.
- **Analysis Dashboard**: View metrics like connectivity, degree, and components of the graph.

## File Structure

```
CSL2020-project/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── algorithms/
│   │   ├── astar.js
│   │   ├── bellmanFord.js
│   │   ├── dijkstra.js
│   │   ├── fewestStops.js
│   ├── assets/
│   ├── components/
│   │   ├── MessageBar.jsx
│   │   ├── analysis/
│   │   │   ├── GraphAnalysisDashboard.jsx
│   │   │   ├── GraphList.jsx
│   │   │   ├── metrics.js
│   │   ├── forms/
│   │   │   ├── AddAirport.jsx
│   │   │   ├── AddRoute.jsx
│   │   │   ├── DeleteAirport.jsx
│   │   │   ├── DeleteRoute.jsx
│   │   │   ├── pathFinder.jsx
│   │   ├── graph/
│   │   │   ├── canvas.jsx
│   │   │   ├── GraphVisualizer.jsx
│   │   ├── layout/
│   │   │   ├── Card.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   ├── data/
│   │   ├── sampleData.js
│   ├── pages/
│   │   ├── AnalysisPage.jsx
│   │   ├── Home.jsx
│   ├── utils/
│       ├── Graph.js
```

This structure provides an organized layout for the project, making it easy to navigate and understand the different components and their purposes.

## Project Structure

### Algorithms
- **astar.js**: Implements the A* algorithm using a MinHeap for priority queue operations.
- **bellmanFord.js**: Implements the Bellman-Ford algorithm for shortest path calculations, supporting both distance and cost metrics.
- **dijkstra.js**: Implements Dijkstra's algorithm using a MinHeap for efficient shortest path calculations.

### Components
- **GraphAnalysisDashboard.jsx**: Displays metrics and analysis of the graph, such as total airports, routes, and connectivity.
- **AddAirport.jsx**: Form to add new airports to the graph.
- **pathFinder.jsx**: Interface to find paths between airports using different algorithms and metrics.

### Utilities
- **Graph.js**: Core graph data structure implementation, supporting operations like adding/removing airports and routes.

### Pages
- **Home.jsx**: Landing page of the application.
- **AnalysisPage.jsx**: Page dedicated to graph analysis and visualization.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/craftdesky/CSL2020-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CSL2020-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the application in your browser at `http://localhost:5173`.

## Dependencies
- **React**: Frontend library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vite**: Build tool for fast development.
- **Framer Motion**: Library for animations.

## How to Use
1. **Add Airports**: Use the "Add Airport" form to add new airports by their 3-letter codes.
2. **Add Routes**: Define routes between airports with distance and cost metrics.
3. **Find Paths**: Use the Path Finder to calculate shortest paths using different algorithms.
4. **Analyze Graph**: View the analysis dashboard for insights into the graph's structure.

## Learning Outcomes
- Understand graph data structures and their real-world applications.
- Implement and compare different graph algorithms.
- Develop a full-stack application with React and Vite.
- Visualize complex data structures interactively.

## Contributors
- **CraftDesky**: Project owner and maintainer.

## License
This project is licensed under the MIT License.