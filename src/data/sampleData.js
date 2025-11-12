// src/data/sampleData.js

export const sampleAirports = [
  // India
  "DEL", "BOM", "BLR", "HYD", "CCU", "MAA", "PNQ", "GOI", "AMD", "LKO", "COK", "JAI",
  "PAT", "NAG", "TRV", "VGA", "RPR", "IXC", "BBI", "IXM", "IXE",

];

export const sampleRoutes = [
  // --- India Major Metro Routes ---
  { src: "DEL", dest: "BOM", distance: 1150, cost: 5000 },
  { src: "DEL", dest: "BLR", distance: 1750, cost: 7200 },
  { src: "DEL", dest: "HYD", distance: 1250, cost: 5800 },
  { src: "DEL", dest: "CCU", distance: 1300, cost: 6000 },
  { src: "DEL", dest: "MAA", distance: 1750, cost: 7300 },
  { src: "DEL", dest: "LKO", distance: 420, cost: 2300 },
  { src: "DEL", dest: "JAI", distance: 280, cost: 2000 },
  { src: "DEL", dest: "IXC", distance: 240, cost: 1900 },
  { src: "DEL", dest: "BBI", distance: 1280, cost: 5600 },

  { src: "BOM", dest: "BLR", distance: 840, cost: 4500 },
  { src: "BOM", dest: "HYD", distance: 620, cost: 4000 },
  { src: "BOM", dest: "AMD", distance: 440, cost: 2200 },
  { src: "BOM", dest: "GOI", distance: 430, cost: 2100 },
  { src: "BOM", dest: "PNQ", distance: 120, cost: 1000 },
  { src: "BOM", dest: "NAG", distance: 700, cost: 3200 },
  { src: "BOM", dest: "TRV", distance: 1250, cost: 5600 },

  { src: "BLR", dest: "HYD", distance: 570, cost: 3000 },
  { src: "BLR", dest: "MAA", distance: 290, cost: 2000 },
  { src: "BLR", dest: "COK", distance: 360, cost: 2300 },
  { src: "BLR", dest: "VGA", distance: 520, cost: 2800 },
  { src: "BLR", dest: "IXE", distance: 340, cost: 2000 },
  { src: "BLR", dest: "TRV", distance: 740, cost: 3600 },

  { src: "HYD", dest: "MAA", distance: 510, cost: 2800 },
  { src: "HYD", dest: "RPR", distance: 480, cost: 2500 },
  { src: "HYD", dest: "VGA", distance: 290, cost: 2000 },
  { src: "HYD", dest: "NAG", distance: 420, cost: 2100 },

  { src: "CCU", dest: "BLR", distance: 1550, cost: 7000 },
  { src: "CCU", dest: "HYD", distance: 1180, cost: 6200 },
  { src: "CCU", dest: "BBI", distance: 380, cost: 2000 },
  { src: "CCU", dest: "PAT", distance: 470, cost: 2300 },
  { src: "CCU", dest: "LKO", distance: 870, cost: 3900 },

  { src: "MAA", dest: "COK", distance: 500, cost: 2500 },
  { src: "MAA", dest: "TRV", distance: 760, cost: 3100 },
  { src: "MAA", dest: "IXM", distance: 420, cost: 1900 },

  { src: "AMD", dest: "PNQ", distance: 520, cost: 2400 },
  { src: "AMD", dest: "JAI", distance: 540, cost: 2500 },
  { src: "AMD", dest: "NAG", distance: 720, cost: 3300 },

  { src: "LKO", dest: "JAI", distance: 480, cost: 2600 },
  { src: "LKO", dest: "PAT", distance: 520, cost: 2500 },
  { src: "LKO", dest: "BBI", distance: 850, cost: 4100 },

  { src: "PNQ", dest: "GOI", distance: 360, cost: 1800 },
  { src: "GOI", dest: "COK", distance: 570, cost: 2700 },
  { src: "COK", dest: "TRV", distance: 220, cost: 1200 },
  { src: "RPR", dest: "BBI", distance: 420, cost: 2300 },
  { src: "IXE", dest: "COK", distance: 400, cost: 2300 },

];