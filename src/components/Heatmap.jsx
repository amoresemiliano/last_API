import React from 'react';
import { getStaffCount } from '../utils/staffLogic';

const DAYS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

export const Heatmap = ({ data = {}, visibleHours = [] }) => {
  if (!visibleHours || visibleHours.length === 0) return null;

  const getColorClasses = (v) => {
    switch(v) {
      case 1: return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]'; 
      case 2: return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)]'; 
      case 3: return 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]'; 
      case 4: return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'; 
      default: return 'bg-gray-100 dark:bg-gray-800/10';
    }
  };

  return (
    <div className="bg-white dark:bg-[#161616] p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 transition-all overflow-x-auto shadow-2xl">
      <div className="flex w-full mb-6 min-w-[700px]">
        <div className="w-24"></div>
        {DAYS.map(d => (
          <div key={d} className="flex-1 text-center text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">{d}</div>
        ))}
      </div>

      {visibleHours.map(h => (
        <div key={h} className="flex w-full mb-3 items-center min-w-[700px]">
          <div className="w-24 text-[11px] text-gray-500 dark:text-gray-400 font-black italic">{h}:00H</div>
          {DAYS.map(day => {
            const cell = data[day]?.[h] || { s: 0, v: 0, c: 0, t: 0 };
            const staff = getStaffCount(day, h);
            return (
              <div key={`${day}-${h}`} className={`flex-1 group relative h-14 mx-1 rounded-xl transition-all cursor-help ${cell.s > 0 ? getColorClasses(cell.v) : 'bg-gray-50 dark:bg-gray-900/40'}`}>
                {cell.s > 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-black text-black/80">{Math.round(cell.s)}€</span>
                    <span className="text-[7px] font-bold text-black/40 uppercase">👤 {staff}</span>
                  </div>
                )}
                {/* TOOLTIP RESTAURADO */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:block z-50 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl shadow-2xl w-44 animate-in fade-in zoom-in border border-gray-100 dark:border-gray-700">
                   <p className="text-[10px] font-black border-b dark:border-gray-700 mb-2 pb-1 uppercase">{day} • {h}h</p>
                   <div className="space-y-1 text-[9px] font-bold">
                     <p className="flex justify-between">INGRESOS: <span className="text-green-600">{cell.s.toFixed(2)}€</span></p>
                     <p className="flex justify-between">PAX: <span>{cell.c}</span></p>
                     <p className="flex justify-between">TICKETS: <span>{cell.t}</span></p>
                     <p className="flex justify-between text-blue-500 border-t dark:border-gray-700 pt-1 mt-1">PERSONAL: 👤 {staff}</p>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
