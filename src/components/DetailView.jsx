import React from 'react';

export const DetailView = ({ type, onBack }) => {
  const isSales = type === 'sales';
  
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500">
      <button onClick={onBack} className="text-green-500 text-[10px] font-black tracking-widest mb-4 flex items-center gap-2 hover:opacity-70">
        ← VOLVER AL PANEL GENERAL
      </button>

      <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-[2.5rem] shadow-2xl text-black">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Histórico Acumulado (Total)</p>
        <h2 className="text-5xl font-black tracking-tighter my-2">
          {isSales ? '142.850€' : '8.420 u.'}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-black/10 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">Desde Siempre</span>
          <p className="text-[10px] font-bold">Datos sincronizados con Last.app Cloud</p>
        </div>
      </div>

      <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800">
        <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest opacity-50">Desglose Mensual</h3>
        <div className="space-y-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex justify-between items-center p-4 rounded-2xl border border-gray-800/50 hover:bg-white/[0.02] transition-colors">
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500">{18-i}/04/2024</span>
                <span className="text-sm font-bold text-white">{isSales ? 'Cierre de Caja' : 'Top Vendido: Burger'}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-green-500">{isSales ? '1.240€' : '42 u.'}</p>
                <p className="text-[9px] font-bold text-gray-600 uppercase tracking-tighter">Status: Auditado</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
