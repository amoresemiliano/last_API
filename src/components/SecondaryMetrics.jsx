import React from 'react';

const productTypes = {
  STAR: { label: 'ESTRELLA', icon: '⭐', color: 'text-yellow-400 bg-yellow-400/10' },
  PLOW: { label: 'CABALLO', icon: '🐎', color: 'text-blue-400 bg-blue-400/10' },
  PUZZLE: { label: 'PUZLE', icon: '🧩', color: 'text-purple-400 bg-purple-400/10' },
  DOG: { label: 'PERRO', icon: '🐕', color: 'text-red-400 bg-red-400/10' }
};

export const SecondaryMetrics = ({ channels, anomalies, topProducts, onProductClick }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Canales */}
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-gray-500 font-bold mb-6 text-[10px] uppercase tracking-widest">Mix de Canales</h3>
      <div className="space-y-5">
        {channels.map(c => (
          <div key={c.name} className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-gray-300">
              <span>{c.name}</span>
              <span>{c.percent}%</span>
            </div>
            <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden">
              <div className={`${c.color} h-full`} style={{ width: `${c.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Matriz BCG */}
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800 cursor-pointer group" onClick={onProductClick}>
      <h3 className="text-gray-500 font-bold mb-6 text-[10px] uppercase tracking-widest flex justify-between">
        Matriz BCG <span className="text-green-500 group-hover:translate-x-1 transition-transform">→</span>
      </h3>
      <div className="space-y-4">
        {topProducts.map((p) => (
          <div key={p.name} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <span>{productTypes[p.type].icon}</span>
              <div className="flex flex-col">
                <span className="text-xs text-white">{p.name}</span>
                <span className={`text-[7px] font-black px-1.5 py-0.5 rounded w-fit ${productTypes[p.type].color}`}>
                  {productTypes[p.type].label}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-gray-500">{p.qty} u.</span>
          </div>
        ))}
      </div>
    </div>

    {/* Alertas */}
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-gray-500 font-bold mb-6 text-[10px] uppercase tracking-widest">Alertas Operativas</h3>
      <div className="space-y-3">
        {anomalies.map((a, i) => (
          <div key={i} className="flex gap-4 p-3 rounded-2xl bg-red-500/5 border border-red-500/10">
            <span className="text-sm">⚠️</span>
            <div>
              <p className="text-[11px] text-white font-bold">{a.title}</p>
              <p className="text-[9px] text-gray-500">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
