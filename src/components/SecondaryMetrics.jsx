export const SecondaryMetrics = ({ channels, anomalies, topProducts }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Mix de Canales */}
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Mix de Canales</h3>
      <div className="space-y-4">
        {channels.map(c => (
          <div key={c.name} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">{c.name}</span>
              <span className="text-white font-bold">{c.percent}%</span>
            </div>
            <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
              <div className={`${c.color} h-full transition-all duration-1000`} style={{ width: `${c.percent}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Top 5 Productos */}
    // Dentro de SecondaryMetrics.jsx, en la sección de productos:
<div 
  className="bg-[#161616] p-6 rounded-3xl border border-gray-800 shadow-sm cursor-pointer hover:border-green-500/30 transition-all"
  onClick={onProductClick}
>
  <h3 className="text-white font-bold mb-6 text-[10px] uppercase tracking-[0.2em] opacity-50 flex justify-between items-center">
    Matriz de Productos (BCG)
    <span className="text-green-500">VER TODO →</span>
  </h3>
  {/* ... resto del código de productos ... */}
</div>

    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Top 5 Productos</h3>
      <div className="space-y-3">
        {topProducts.map((p, i) => (
          <div key={p.name} className="flex justify-between items-center text-xs">
            <span className="text-gray-400"><span className="text-green-500 mr-2 font-bold">{i+1}.</span>{p.name}</span>
            <span className="bg-gray-900 px-2 py-1 rounded text-white font-mono">{p.qty}u</span>
          </div>
        ))}
      </div>
    </div>

    {/* Listado de Anomalías */}
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
      <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Alertas Operativas</h3>
      <div className="space-y-3">
        {anomalies.map((a, i) => (
          <div key={i} className="flex gap-3 items-start p-2 rounded-xl bg-red-500/5 border border-red-500/10">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="text-[11px] text-white font-medium">{a.title}</p>
              <p className="text-[9px] text-gray-500">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
