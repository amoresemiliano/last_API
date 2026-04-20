import Papa from 'papaparse';

export const parseLastAppFiles = async (files) => {
  const data = {
    stats: { totalSales: "0", avgTicket: "0", occupancy: "0", avgTime: "0" },
    products: [],
    heatmap: {},
    channels: [],
    anomalies: []
  };

  try {
    const fileMap = {};
    for (const file of files) {
      const text = await file.text();
      const result = Papa.parse(text, { header: true, skipEmptyLines: true });
      const cols = result.meta.fields || [];
      if (cols.includes('Price Per Unit')) fileMap.productSales = result.data;
      if (cols.includes('Seats') && cols.includes('Creation Time')) fileMap.transactions = result.data;
    }

    // --- CONSOLIDACIÓN DE PRODUCTOS ---
    if (fileMap.productSales) {
      const consolidated = {};
      fileMap.productSales.forEach(p => {
        if (!p.Name) return;
        const name = p.Name.trim();
        if (!consolidated[name]) {
          consolidated[name] = { 
            name, 
            qty: 0, 
            price: parseFloat(p['Price Per Unit'] || 0), 
            cost: 0, 
            type: 'PLOW' 
          };
        }
        consolidated[name].qty += parseInt(p.Units || 0);
      });
      data.products = Object.values(consolidated).sort((a, b) => b.qty - a.qty);
    }

    // --- LÓGICA DE HEATMAP (Verde = Éxito) ---
    if (fileMap.transactions) {
      const tempHeatmap = {};
      fileMap.transactions.forEach(t => {
        const val = parseFloat(t.Total || 0);
        const date = new Date(t['Creation Time']);
        if (isNaN(date.getTime())) return;

        const day = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'][date.getDay()];
        const hour = date.getHours();

        if (!tempHeatmap[day]) tempHeatmap[day] = {};
        if (!tempHeatmap[day][hour]) tempHeatmap[day][hour] = { s: 0, t: 0, c: 0 };
        
        tempHeatmap[day][hour].s += val;
        tempHeatmap[day][hour].t += 1;
        tempHeatmap[day][hour].c += parseInt(t.Seats || 0);
      });

      // Asignación de V según jerarquía solicitada
      Object.keys(tempHeatmap).forEach(d => {
        Object.keys(tempHeatmap[d]).forEach(h => {
          const s = tempHeatmap[d][h].s;
          if (s >= 400) tempHeatmap[d][h].v = 1;      // VERDE
          else if (s >= 200) tempHeatmap[d][h].v = 2; // AMARILLO
          else if (s >= 100) tempHeatmap[d][h].v = 3; // NARANJA
          else tempHeatmap[d][h].v = 4;               // ROJO
        });
      });
      data.heatmap = tempHeatmap;
    }
    return data;
  } catch (e) {
    console.error("Error en Parser:", e);
    return null;
  }
};
