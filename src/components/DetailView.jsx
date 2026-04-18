import React from 'react';

const productTypes = {
  STAR: { label: 'ESTRELLA', icon: '⭐', color: 'text-yellow-400 bg-yellow-400/10' },
  PLOW: { label: 'CABALLO', icon: '🐎', color: 'text-blue-400 bg-blue-400/10' },
  PUZZLE: { label: 'PUZLE', icon: '🧩', color: 'text-purple-400 bg-purple-400/10' },
  DOG: { label: 'PERRO', icon: '🐕', color: 'text-red-400 bg-red-400/10' }
};

export const DetailView = ({ type, data, onBack, filterType, setFilterType }) => {
  const isProducts = type === 'products';
  
  // Lógica de filtrado para los 20 productos
  const displayProducts = isProducts && filterType 
    ? data.products.filter(p => p.type === filterType) 
    : data.products;

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500">
      <button 
        onClick={onBack} 
        className="text-green-500 text-[10px] font-black tracking-[0.3em] flex items-center gap-2 hover:opacity-70 transition-opacity"
      >
        ← VOLVER AL PANEL
      </button>

      {/* Recuadro Llamativo: Histórico "Desde Siempre" */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-[2.5rem] text-black shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Histórico Consolidado Acumulado</p>
          <h2 className="text-5xl font-black tracking-tighter my-1">
            {isProducts ? `${data.products.length} Items` : '142.850€'}
          </h2>
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-black/20 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">Referencia Global</span>
            <p className="text-[10px] font-bold">Datos sincronizados vía Last.app Cloud</p>
          </div>
        </div>
        {/* Efecto visual de fondo */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h3 className="text-white font-bold text-xs uppercase tracking-widest">
            {isProducts ? 'Análisis de Inventario BCG' : 'Desglose por Turnos y Fecha'}
          </h3>
          
          {/* Filtros por Iconos para Productos */}
          {isProducts && (
            <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-gray-800">
              {Object.keys(productTypes).map(key => (
                <button 
                  key={key} 
                  onClick={() => setFilterType(filterType === key ? null : key)}
                  className={`w-10 h-10 rounded-xl transition-all flex items-center justify-center ${filterType === key ? 'bg-white scale-110 shadow-lg' : 'hover:bg-white/5'}`}
                  title={productTypes[key].label}
                >
                  <span className="text-lg">{productTypes[key].icon}</span>
                </button>
              ))}
              {filterType && (
                <button onClick={() => setFilterType(null)} className="text-[8px] text-gray-500 px-2 font-black uppercase">Limpiar</button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {isProducts ? (
            // LISTADO DE PRODUCTOS (Mínimo 20)
            displayProducts.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-gray-900/40 rounded-2xl border border-gray-800/50 hover:border-green-500/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-950 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                    {productTypes[p.type].icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">{p.name}</p>
                    <p className={`text-[8px] font-black rounded px-1.5 py-0.5 w-fit mt-1 ${productTypes[p.type].color}`}>
                      {productTypes[p.type].label}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-green-500 font-black text-lg">{p.qty}</p>
                  <p className="text-[8px] text-gray-600 font-bold uppercase">Unidades</p>
                </div>
              </div>
            ))
          ) : (
            // LISTADO DE COMENSALES/VENTAS POR TURNOS
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
              <div key={i} className="flex justify-between items-center p-5 bg-gray-900/40 rounded-2xl border border-gray-800/50 hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className="text-[11px] font-mono text-gray-500 font-bold">{18-i}/04/2024</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-[10px] font-black uppercase">
                    <div className="flex flex-col">
                      <span className="text-blue-400 opacity-50 text-[8px]">Mañana</span>
                      <span>☀️ {10 + i * 2} pax</span>
                    </div>
                    <div className="flex flex-col border-l border-gray-800 pl-4">
                      <span className="text-yellow-500 opacity-50 text-[8px]">Mediodía</span>
                      <span>🌤️ {35 + i * 3} pax</span>
                    </div>
                    <div className="flex flex-col border-l border-gray-800 pl-4">
                      <span className="text-purple-500 opacity-50 text-[8px]">Noche</span>
                      <span>🌙 {50 + i * 4} pax</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white leading-none">{95 + i * 9}</p>
                  <p className="text-[9px] font-bold text-green-500 mt-1 uppercase tracking-tighter">Total Diario</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


