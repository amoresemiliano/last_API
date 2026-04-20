import React, { useState } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export const ConfigurationView = ({ products, onBack }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-green-500 text-[10px] font-black uppercase tracking-widest">← DASHBOARD</button>
        <div className="flex gap-2">
          <button className="bg-white dark:bg-gray-800 text-[9px] px-4 py-2 rounded-xl font-black shadow-sm dark:text-white">📥 IMPORTAR</button>
          <button className="bg-white dark:bg-gray-800 text-[9px] px-4 py-2 rounded-xl font-black shadow-sm dark:text-white">📤 EXPORTAR MODELO</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PERSONAL */}
        <div className="bg-white dark:bg-[#161616] p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl">
          <h3 className="text-blue-500 font-black text-sm uppercase italic mb-6">Staff & Registro Horario</h3>
          <div className="space-y-4 bg-gray-50 dark:bg-black/40 p-6 rounded-3xl mb-8">
            <div className="grid grid-cols-2 gap-3">
              <select className="bg-white dark:bg-gray-900 p-3 rounded-xl text-[10px] font-bold dark:text-white outline-none"><option>Empleado</option>{['Maria','Luis','Eduardo','Fernando','Diego','Elizabeth','José'].map(n => <option key={n}>{n}</option>)}</select>
              <select className="bg-white dark:bg-gray-900 p-3 rounded-xl text-[10px] font-bold dark:text-white outline-none"><option>Día</option>{DAYS.map(d => <option key={d}>{d}</option>)}</select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select className="bg-white dark:bg-gray-900 p-3 rounded-xl text-[10px] dark:text-white outline-none"><option>Ingreso</option>{HOURS.map(h => <option key={h}>{h}</option>)}</select>
              <select className="bg-white dark:bg-gray-900 p-3 rounded-xl text-[10px] dark:text-white outline-none"><option>Salida</option>{HOURS.map(h => <option key={h}>{h}</option>)}</select>
            </div>
            <button className="w-full bg-blue-500 text-white font-black text-[10px] py-4 rounded-xl uppercase tracking-widest">Guardar Jornada</button>
          </div>
          <div className="border-t dark:border-gray-800 pt-4 text-center text-gray-400 text-[10px] font-black italic uppercase">Registro de Horarios Guardados</div>
        </div>

        {/* INSUMOS */}
        <div className="bg-white dark:bg-[#161616] p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-6"><h3 className="text-green-500 font-black text-sm uppercase italic">Costos de Insumos</h3><button className="bg-green-500 text-black text-[9px] px-3 py-1 rounded-full font-black">+ PRODUCTO</button></div>
          <div className="space-y-2 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
            {products.map((p, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-black/40 p-4 rounded-2xl">
                <div className="flex-1 truncate"><p className="text-[10px] font-black uppercase dark:text-white">{p.name}</p><p className="text-[8px] text-green-500 font-black italic">Venta: {p.price}€</p></div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-xl border dark:border-gray-800"><span className="text-[9px] opacity-40 dark:text-white">COSTO:</span><input type="number" placeholder="0.00" className="bg-transparent border-none text-[10px] text-blue-500 w-12 text-right outline-none font-black" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
