import React from 'react';

const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];

export const Heatmap = ({ data = {}, visibleHours = [] }) => {
  
  // Blindaje por si no hay horas seleccionadas
  if (!visibleHours || visibleHours.length === 0) return null;

  // Función para generar gradientes y sombras según el riesgo (v)
  const getColorClasses = (riskLevel) => {
    switch(riskLevel) {
      case 1: return 'bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_15px_rgba(34,197,94,0.3)]'; // Óptimo
      case 2: return 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.2)]'; // Aviso
      case 3: return 'bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.2)]'; // Riesgo
      case 4: return 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_15px_rgba(239,68,68,0.3)]'; // Crítico
      default: return 'bg-gray-800/20';
    }
  };

  const getStatusLabel = (v) => {
    if (v === 1) return "EFICIENCIA ÓPTIMA";
    if (v === 2) return "REVISAR PERSONAL";
    if (v === 3) return "RIESGO OPERATIVO";
    if (v === 4) return "CRÍTICO / SATURADO";
    return "";
  };

  return (
    <div className="bg-[#161616] p-6 md:p-8 rounded-[2.5rem] border border-gray-800 shadow-2xl animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] opacity-40">
          Análisis de Eficiencia Temporal
        </h3>
        <div className="flex gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-50"></div>
           <div className="w-1.5 h-1.5 rounded-full bg-red-500 opacity-50"></div>
        </div>
      </div>

      <div className="w-full">
        {/* Cabecera de Horas - Flexbox para ocupar 100% ancho */}
        <div className="flex mb-4 w-full">
          <div className="w-16 flex-shrink-0"></div>
          <div className="flex-1 grid grid-flow-col auto-cols-fr gap-3">
            {visibleHours.map(h => (
              <div key={h} className="text-center text-[10px] text-gray-500 font-black tracking-tighter">
                {h}:00H
              </div>
            ))}
          </div>
        </div>

        {/* Filas de Días */}
        {days.map(day => (
          <div key={day} className="flex mb-3 w-full group/row">
            <div className="w-16 flex-shrink-0 text-[10px] text-gray-400 font-black flex items-center uppercase italic group-hover/row:text-green-500 transition-colors">
              {day}
            </div>
            
            {/* Celdas al 100% del ancho con Grid Automático */}
            <div className="flex-1 grid grid-flow-col auto-cols-fr gap-3">
              {visibleHours.map(h => {
                const cell = data[day]?.[h] || { s: 0, st: 0, t: 0, c: 0, v: 0 };
                
                return (
                  <div 
                    key={h} 
                    className={`group relative h-16 rounded-2xl ${getColorClasses(cell.v)} border border-white/10 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110 hover:z-30 cursor-help`}
                  >
                    {cell.s > 0 && (
                      <>
                        <span className="text-[11px] font-black text-black/90 tracking-tighter">
                          {cell.s}€
                        </span>
                        <span className="text-[8px] font-bold text-black/50 uppercase tracking-tighter">
                          {cell.c}pax
                        </span>
                      </>
                    )}

                    {/* TOOLTIP PREMIUM */}
                    {cell.s > 0 && (
                      <div className="absolute bottom-full mb-4 hidden group-hover:block z-50 bg-white text-black p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-56 text-left animate-in fade-in slide-in-from-bottom-2">
                        <div className="flex justify-between items-center border-b border-gray-100 mb-3 pb-2">
                          <p className="text-[10px] font-black uppercase tracking-widest">{day} • {h}:00H</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-gray-400 font-bold uppercase">Monto</span>
                            <span className="font-black text-green-600">{cell.s}€</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-gray-400 font-bold uppercase">Tickets</span>
                            <span className="font-black">{cell.t}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-gray-400 font-bold uppercase">Comensales</span>
                            <span className="font-black text-blue-600">{cell.c} pax</span>
                          </div>
                          <div className="flex justify-between text-[11px] border-t border-gray-100 pt-3 mt-2 font-black italic">
                            <span className="text-gray-400">STAFF</span>
                            <span>👤 {cell.st} Empleados</span>
                          </div>
                        </div>

                        <div className="mt-4 text-center bg-gray-100 py-2 rounded-xl">
                          <p className="text-[8px] font-black tracking-widest text-gray-500 uppercase">Status</p>
                          <p className="text-[10px] font-black uppercase">{getStatusLabel(cell.v)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





