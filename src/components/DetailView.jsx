import React from 'react';

const productTypes = {
  STAR: { label: 'ESTRELLA', icon: '⭐', color: 'text-yellow-400 bg-yellow-400/10' },
  PLOW: { label: 'CABALLO', icon: '🐎', color: 'text-blue-400 bg-blue-400/10' },
  PUZZLE: { label: 'PUZLE', icon: '🧩', color: 'text-purple-400 bg-purple-400/10' },
  DOG: { label: 'PERRO', icon: '🐕', color: 'text-red-400 bg-red-400/10' }
};

export const DetailView = ({ type, data, onBack, filterType, setFilterType }) => {
  const isProducts = type === 'products';
  const isAnomalies = type === 'anomalies';
  const isChannels = type === 'channels';

  const dummyRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Configuración de encabezado dinámico
  const getHeaderInfo = () => {
    switch (type) {
      case 'products': return { title: 'Ingeniería de Menús', val: `${data.products.length} Items`, desc: 'Análisis de Rentabilidad BCG', color: 'from-yellow-500 to-yellow-600' };
      case 'anomalies': return { title: 'Auditoría de Incidencias', val: '24 Casos', desc: 'Alertas Operativas Críticas', color: 'from-red-500 to-red-600' };
      case 'channels': return { title: 'Rendimiento por Origen', val: '142.850€', desc: 'Mix de Canales de Venta', color: 'from-blue-500 to-blue-600' };
      case 'sales': return { title: 'Reporte de Ingresos', val: '142.850€', desc: 'Ventas Totales Acumuladas', color: 'from-green-500 to-green-600' };
      default: return { title: 'Reporte Detallado', val: '8.420 pax', desc: 'Historial de Operaciones', color: 'from-green-500 to-green-600' };
    }
  };

  const header = getHeaderInfo();
  const displayProducts = isProducts && filterType ? data.products.filter(p => p.type === filterType) : data.products;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      <button onClick={onBack} className="text-green-500 text-[10px] font-black tracking-[0.3em] flex items-center gap-2 hover:opacity-70 transition-all uppercase">
        ← Volver al Panel
      </button>

      {/* Hero Section Dinámica */}
      <div className={`bg-gradient-to-br ${header.color} p-8 rounded-[2.5rem] text-black shadow-2xl relative overflow-hidden`}>
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{header.desc}</p>
          <h2 className="text-5xl font-black tracking-tighter my-1">{header.val}</h2>
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter">Nexus Core Data</span>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">{header.title}</h3>
          
          {isProducts && (
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-gray-800">
              {Object.keys(productTypes).map(key => (
                <button key={key} onClick={() => setFilterType(filterType === key ? null : key)}
                  className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${filterType === key ? 'bg-white scale-110 shadow-lg' : 'hover:bg-white/5'}`}>
                  <span className="text-lg">{productTypes[key].icon}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {/* VISTA A: PRODUCTOS (ESTRELLAS, PERROS, ETC) */}
          {isProducts && displayProducts.map(p => (
            <div key={p.id} className="flex justify-between items-center p-4 bg-gray-900/40 rounded-2xl border border-gray-800/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-950 rounded-xl flex items-center justify-center text-xl">{productTypes[p.type].icon}</div>
                <div><p className="text-sm font-bold text-white">{p.name}</p><p className={`text-[8px] font-black rounded px-1.5 py-0.5 w-fit mt-1 ${productTypes[p.type].color}`}>{productTypes[p.type].label}</p></div>
              </div>
              <p className="font-mono text-green-500 font-black text-lg">{p.qty} u.</p>
            </div>
          ))}

          {/* VISTA B: CANALES (LOCAL, GLOVO, WEB) */}
          {isChannels && dummyRows.map(i => (
            <div key={i} className="flex justify-between items-center p-5 bg-gray-900/40 rounded-2xl border border-gray-800/50">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 font-bold">{18-i}/04/2024</span>
                <span className="text-sm font-bold text-white uppercase tracking-tighter">ORIGEN: {['RESTAURANTE', 'GLOVO', 'UBER EATS', 'WEB'][i%4]}</span>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-blue-400">{(450 + i * 15).toFixed(2)}€</p>
                <p className="text-[9px] font-bold text-gray-600 uppercase">Sincronizado</p>
              </div>
            </div>
          ))}

          {/* VISTA C: ALERTAS (SOBREMESA, TICKETS ALTOS) */}
          {isAnomalies && dummyRows.map(i => (
            <div key={i} className="flex justify-between items-center p-4 bg-red-500/[0.02] rounded-2xl border border-red-500/10">
              <div className="flex items-center gap-4">
                <span className="text-sm text-red-500">⚠️</span>
                <div>
                  <p className="text-xs font-bold text-white italic">{i % 2 === 0 ? 'Mesa 14: Sobremesa Crítica' : 'Ticket #842: Consumo Inusual'}</p>
                  <p className="text-[9px] text-gray-500">Local Central • {18-i}/04/2024</p>
                </div>
              </div>
              <span className={`text-[8px] font-black px-2 py-1 rounded-full ${i % 3 === 0 ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-500'}`}>{i % 3 === 0 ? 'RESUELTO' : 'PENDIENTE'}</span>
            </div>
          ))}

          {/* VISTA D: VENTAS, COMENSALES, TICKET MEDIO, ESTANCIA */}
          {!isProducts && !isChannels && !isAnomalies && dummyRows.map(i => (
            <div key={i} className="flex justify-between items-center p-5 bg-gray-900/40 rounded-2xl border border-gray-800/50">
              <div className="flex flex-col">
                <p className="text-[11px] font-mono text-gray-500 font-bold">{18-i}/04/2024</p>
                <div className="flex gap-4 mt-2 text-[10px] font-black uppercase tracking-tighter">
                  <div className="flex flex-col"><span className="text-blue-400 opacity-50 text-[8px]">Mañana</span><span>{type === 'sales' ? `${150 + i*5}€` : type === 'duration' ? '42m' : '15pax'}</span></div>
                  <div className="flex flex-col border-l border-gray-800 pl-4"><span className="text-yellow-500 opacity-50 text-[8px]">Mediodía</span><span>{type === 'sales' ? `${450 + i*8}€` : type === 'duration' ? '58m' : '42pax'}</span></div>
                  <div className="flex flex-col border-l border-gray-800 pl-4"><span className="text-purple-500 opacity-50 text-[8px]">Noche</span><span>{type === 'sales' ? `${820 + i*12}€` : type === 'duration' ? '65m' : '88pax'}</span></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-white leading-none">
                  {type === 'sales' ? `${(1420 + i * 25).toLocaleString()}€` : type === 'duration' ? '55m' : (145 + i * 4)}
                </p>
                <p className="text-[9px] font-bold text-green-500 mt-1 uppercase">Total Día</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};






