import Papa from 'papaparse';

export const parseLastAppFiles = async (files) => {
  const data = {
    stats: { totalSales: 0, avgTicket: 0, occupancy: 0, avgTime: 45 },
    products: [],
    heatmap: {},
    channels: []
  };

  const fileMap = {};
  for (const file of files) {
    const text = await file.text();
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    const cols = Object.keys(result.data[0] || {});
    
    if (cols.includes('Price')) fileMap.productSales = result.data;
    if (cols.includes('Seats')) fileMap.transactions = result.data;
    if (cols.includes('Activation Time')) fileMap.hourlySales = result.data;
  }

  // --- LÓGICA DE INGENIERÍA DE MENÚS (Popularidad) ---
  if (fileMap.productSales) {
    const rawProducts = fileMap.productSales
      .filter(p => p.Name && p.Units)
      .map(p => ({
        name: p.Name,
        qty: parseInt(p.Units),
        price: parseFloat(p.Price || 0),
        total: parseFloat(p.Price || 0) * parseInt(p.Units)
      }));

    // Calculamos el umbral de popularidad (70% del promedio)
    const avgQty = rawProducts.reduce((acc, p) => acc + p.qty, 0) / rawProducts.length;
    const popularityThreshold = avgQty * 0.7;

    data.products = rawProducts.map(p => {
      // Por ahora, sin costos, clasificamos por Volumen vs Promedio
      // Cuando tengamos costos, 'v' será el margen
      let type = 'PUZZLE'; // Margen alto (supuesto), pocas ventas
      if (p.qty >= popularityThreshold) type = 'STAR'; // Margen alto, muchas ventas
      if (p.qty < popularityThreshold * 0.5) type = 'DOG'; // Candidato a Perro
      
      return { ...p, type };
    }).sort((a, b) => b.qty - a.qty);
  }

  // --- PROCESAMIENTO DE TRANSACCIONES ---
  if (fileMap.transactions) {
    let totalRev = 0;
    let totalSeats = 0;
    const channels = { R: 0, G: 0, U: 0 };

    fileMap.transactions.forEach(t => {
      const val = parseFloat(t.Total || 0);
      totalRev += val;
      totalSeats += parseInt(t.Seats || 0);
      const prefix = t.Code?.charAt(0);
      if (channels[prefix] !== undefined) channels[prefix] += val;
    });

    data.stats.totalSales = totalRev.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    data.stats.occupancy = totalSeats.toLocaleString();
    data.stats.avgTicket = (totalRev / fileMap.transactions.length).toFixed(2);
    
    const grandTotal = Object.values(channels).reduce((a, b) => a + b, 0);
    data.channels = [
      { name: 'Sala', percent: Math.round((channels.R/grandTotal)*100) || 0, color: 'bg-green-500' },
      { name: 'Glovo', percent: Math.round((channels.G/grandTotal)*100) || 0, color: 'bg-blue-500' },
      { name: 'Uber/Web', percent: Math.round((channels.U/grandTotal)*100) || 0, color: 'bg-purple-500' }
    ];
  }

  return data;
};

