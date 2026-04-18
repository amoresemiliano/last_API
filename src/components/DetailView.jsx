import React from 'react';

export const DetailView = ({ type, data, onBack }) => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      <button onClick={onBack} className="text-green-500 text-xs font-bold mb-6 hover:translate-x-[-4px] transition-transform flex items-center gap-2">
        ← VOLVER AL DASHBOARD
      </button>

      {/* Recuadro Llamativo Histórico "Desde Siempre" */}
      <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-3xl mb-8 shadow-2xl text-black">
        <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Rendimiento Histórico Acumulado</p>
        <h2 className="text-4xl font-black tracking-tighter">
          {type === 'sales' ? '142.850€' : '8.420 unidades'}
        </h2>
        <p className="text-xs font-medium mt-1">Desde la apertura del local vía Last.app</p>
      </div>

      <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
        <h3 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Listado Detallado: Mes Actual</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="pb-4">FECHA</th>
                <th className="pb-4">{type === 'sales' ? 'MONTO' : 'PRODUCTO'}</th>
                <th className="pb-4">{type === 'sales' ? 'TICKETS' : 'CATEGORÍA'}</th>
                <th className="pb-4">ESTADO</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {/* Aquí mapearías los datos reales */}
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono">1{i}/04/2024</td>
                  <td className="py-4 font-bold text-white">{type === 'sales' ? '1.240€' : 'Burger Vegen'}</td>
                  <td className="py-4">{type === 'sales' ? '42' : 'ESTRELLA ⭐'}</td>
                  <td className="py-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-[9px] font-bold">COMPLETADO</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
