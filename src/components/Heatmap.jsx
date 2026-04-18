import React from 'react';

const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

export const Heatmap = ({ data = {}, visibleHours = [] }) => {
  
  // 1. Blindaje: Si no hay horas visibles, mostramos un mensaje amigable en lugar de negro
  if (!visibleHours || visibleHours.length === 0) {
    return (
      <div className="bg-[#161616] p-12 rounded-3xl border border-gray-800 text-center">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest animate-pulse">
          Selecciona un turno (Mañana/Mediodía/Noche) para ver datos
        </p>
      </div>
    );
  }

  const getColor = (riskLevel) => {
    switch(riskLevel) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-orange-500';
      case 4: return 'bg-red-500';
      default: return 'bg-gray-800/20';
    }
  };

  return (
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800 shadow-xl overflow-x-auto">
      <div className="min-w-[700px]">
        {/* Cabecera de Horas */}
        <div className="grid grid-cols-11 gap-2 mb-4">
          <div className="w-12"></div>
          {visibleHours.map(h => (
            <div key={h} className="text-center text-[10px] text-gray-500 font-black">
              {h}:00H
            </div>
          ))}
        </div>

        {/* Filas de Días */}
        {days.map(day => (
          <div key={day} className="grid grid-cols-11 gap-2 mb-2 text-center">
            <div className="text-[10px] text-gray-500 font-black flex items-center justify-start uppercase italic">
              {day}
            </div>
            
            {visibleHours.map(h => {
              const cell = data[day]?.[h] || { s: 0, st: 0, t: 0, c: 0, v: 0 };
              
              return (
                <div 
                  key={h} 
                  className={`group relative h-14 rounded-xl ${getColor(cell.v)} border border-white/5 flex flex-col items-center justify-center transition-all hover:scale-110 cursor-help`}
                >
                  <span className="text-[10px] font-black text-black/90">
                    {cell.s > 0 ? `${cell.s}€` : '-'}
                  </span>
                  {cell.s > 0 && (
                    <span className="text-[8px] font-bold text-black/60 uppercase">
                      {cell.c}pax
                    </span>
                  )}

                  {/* Tooltip Detallado */}
                  {cell.s > 0 && (
                    <div className="absolute bottom-full mb-3 hidden group-hover:block z-50 bg-white text-black p-4 rounded-2xl shadow-2xl w-48 text-left">
                      <p className="text-[10px] font-black border-b mb-2 pb-1">{day} • {h}:00H</p>
                      <div className="space-y-1 text-[10px] font-bold">
                        <p className="flex justify-between">Ventas: <span className="text-green-600">{cell.s}€</span></p>
                        <p className="flex justify-between">Tickets: <span>{cell.t}</span></p>
                        <p className="flex justify-between border-t pt-1 mt-1">Staff: <span className="text-blue-600">👤 {cell.st}</span></p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};




