export const sampleAirports = [
  "DEL", "BOM", "BLR", "HYD", "MAA", "CCU",
  "PNQ", "GOI", "AMD", "LKO",
  "COK", "JAI", "PAT", "TRV",
  "IXE", "IXC"
];

export const sampleRoutes = [
  { src: "DEL", dest: "BOM", distance: 1150, cost: 4800 },
  { src: "DEL", dest: "BLR", distance: 1750, cost: 6800 },
  { src: "DEL", dest: "HYD", distance: 1250, cost: 5600 },
  { src: "DEL", dest: "MAA", distance: 1750, cost: 6900 },
  { src: "DEL", dest: "CCU", distance: 1300, cost: 5900 },

  { src: "BOM", dest: "BLR", distance: 840, cost: 4500 },
  { src: "BOM", dest: "HYD", distance: 620, cost: 4000 },
  { src: "BOM", dest: "MAA", distance: 1030, cost: 5100 },
  { src: "BOM", dest: "CCU", distance: 1660, cost: 7100 },

  { src: "BLR", dest: "HYD", distance: 570, cost: 3000 },
  { src: "BLR", dest: "MAA", distance: 290, cost: 1800 },
  { src: "BLR", dest: "CCU", distance: 1550, cost: 6700 },

  { src: "HYD", dest: "MAA", distance: 510, cost: 2500 },
  { src: "HYD", dest: "CCU", distance: 1180, cost: 5300 },

  { src: "MAA", dest: "CCU", distance: 1360, cost: 5800 },

  { src: "PNQ", dest: "BOM", distance: 120, cost: 900 },
  { src: "PNQ", dest: "BLR", distance: 730, cost: 3100 },
  { src: "PNQ", dest: "DEL", distance: 1450, cost: 5400 },

  { src: "GOI", dest: "BOM", distance: 430, cost: 1700 },
  { src: "GOI", dest: "BLR", distance: 560, cost: 2500 },
  { src: "GOI", dest: "CCU", distance: 1920, cost: 7600 },

  { src: "AMD", dest: "DEL", distance: 810, cost: 3300 },
  { src: "AMD", dest: "BOM", distance: 440, cost: 2100 },
  { src: "AMD", dest: "HYD", distance: 890, cost: 3400 },

  { src: "LKO", dest: "DEL", distance: 420, cost: 2100 },
  { src: "LKO", dest: "CCU", distance: 870, cost: 3500 },
  { src: "LKO", dest: "BOM", distance: 1260, cost: 5400 },

  { src: "COK", dest: "BLR", distance: 360, cost: 1600 },
  { src: "COK", dest: "MAA", distance: 500, cost: 2100 },
  { src: "COK", dest: "HYD", distance: 1010, cost: 4100 },

  { src: "JAI", dest: "DEL", distance: 280, cost: 1600 },
  { src: "JAI", dest: "BOM", distance: 910, cost: 3900 },

  { src: "PAT", dest: "DEL", distance: 1000, cost: 4800 },
  { src: "PAT", dest: "CCU", distance: 470, cost: 1900 },

  { src: "TRV", dest: "COK", distance: 210, cost: 1000 },
  { src: "TRV", dest: "BLR", distance: 760, cost: 2900 },

  { src: "IXE", dest: "BLR", distance: 350, cost: 1400 },

  { src: "IXC", dest: "DEL", distance: 260, cost: 1300 }
];
