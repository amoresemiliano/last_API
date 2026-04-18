import React from 'react';

const productTypes = {
  STAR: { label: 'ESTRELLA', icon: '⭐', color: 'text-yellow-400 bg-yellow-400/10' },
  PLOW: { label: 'CABALLO', icon: '🐎', color: 'text-blue-400 bg-blue-400/10' },
  PUZZLE: { label: 'PUZLE', icon: '🧩', color: 'text-purple-400 bg-purple-400/10' },
  DOG: { label: 'PERRO', icon: '🐕', color: 'text-red-400 bg-red-400/10' }
};

export const DetailView = ({ type, data, onBack, filterType, setFilterType }) => {
  const isProducts = type === 'products';
  const isChannels = type === 'channels';
  const isAnomalies = type === 'anomalies';

  const getHeaderInfo = () => {
    if (isProducts) return { title: 'Ingeniería de Menús (BCG)', val: `${data.products.length} Items`, desc: 'Análisis de Rentabilidad' };
    if (isAnomalies) return { title: 'Historial de Incidencias', val: '24 Alertas', desc: 'Auditoría Operativa' };
    if (isChannels) return { title: 'Rendimiento por Canal', val: '142.850€', desc: 'Análisis de Origen de Venta' };
    return { title: 'Reporte Consolidado', val: '142.850€', desc: 'Referencia Histórica' };
  };

  const header = getHeaderInfo();
  const displayProducts = isProducts && filterType ? data.products.filter(p => p.type === filterType) : data.products;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      <button onClick={onBack} className="text-green-500 text-[10px] font-black tracking-[0.3em] flex items-center gap-2 hover:opacity-70 transition-all">
        ← VOLVER AL DASHBOARD
      </button>

      {/* Header Premium */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-[2.5rem] text-black shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{header.desc}</p>
          <h2 className="text-5xl font-black tracking-tighter my-1">{header.val}</h2>
          <p className="text-[10px] font-bold mt-2 bg-black/10 w-fit px-2 py-0.5 rounded-full italic">Sincronizado con Last.app Cloud</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">{header.title}</h3>
          
          {/* Filtros dinámicos según el tipo de vista */}
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

          {isChannels && (
            <select className="bg-black text-white text-[10px] font-bold border border-gray-800 rounded-xl px-4 py-2 outline-none">
              <option>TODOS LOS CANALES</option>
              <option>LOCAL (RESTAURANTE)</option>
              <option>GLOVO / UBER EATS</option>
              <option>SHOP ONLINE</option>
            </select>
          )}
        </div>

        {/* LISTADO DINÁMICO SEGÚN TIPO */}
        <div className="grid grid-cols-1 gap-3">
          
          {/* CASO A: DETALLE DE PRODUCTOS (MATRIZ BCG) */}
          {isProducts && displayProducts.map(p => (
            <div key={p.id} className="flex justify-between items-center p-4 bg-gray-900/40 rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-950 rounded-xl flex items-center justify-center text-xl shadow-inner italic font-bold">
                  {productTypes[p.type].icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-tight">{p.name}</p>
                  <p className={`text-[8px] font-black rounded px-1.5 py-0.5 w-fit mt-1 ${productTypes[p.type].color}`}>{productTypes[p.type].label}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-green-500 font-black text-lg">{p.qty}</p>
                <p className="text-[8px] text-gray-600 font-bold uppercase">Vendidos</p>
              </div>
            </div>
          ))}

          {/* CASO B: DETALLE DE CANALES (Monto, Pax, Tickets, Top Prod) */}
          {isChannels && [1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-gray-900/40 rounded-2xl border border-gray-800/50 hover:bg-white/[0.02] transition-colors gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 font-bold">FECHA: {18-i}/04/2024</span>
                <span className="text-sm font-bold text-white uppercase tracking-tighter">Canal: {['Local', 'Glovo', 'Web'][i%3]}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full md:w-auto">
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold">VENTAS</span><span className="text-xs font-black text-green-500">{450 + i * 20}€</span></div>
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold">TICKETS</span><span className="text-xs font-black text-white">{12 + i}</span></div>
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold">PAX</span><span className="text-xs font-black text-blue-400">{28 + i * 2}</span></div>
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold">TOP ITEM</span><span className="text-[10px] font-black text-yellow-500">⭐ Burger</span></div>
              </div>
            </div>
          ))}

          {/* CASO C: HISTORIAL DE ALERTAS */}
          {isAnomalies && [1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex justify-between items-center p-4 bg-red-500/[0.02] rounded-2xl border border-red-500/10 hover:bg-red-500/[0.05] transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs ${i % 2 === 0 ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
                  ⚠️
                </div>
                <div>
                  <p className="text-xs font-bold text-white italic">{i % 2 === 0 ? 'Sobremesa Crítica' : 'Ticket Inusual'}</p>
                  <p className="text-[9px] text-gray-500">Mesa {10+i} • {18-i}/04/2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[8px] font-black px-2 py-1 rounded-full ${i % 3 === 0 ? 'bg-green-500/10 text-green-500' : 'bg-gray-800 text-gray-500'}`}>
                  {i % 3 === 0 ? 'RESUELTO' : 'AUDITAR'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




