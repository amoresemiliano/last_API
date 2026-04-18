import React from 'react';

const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
const hours = [9, 10, 11, 12, 13, 14, 15, 20, 21, 22];

export const Heatmap = ({ data = {}, staffData = {} }) => {
  const getEfficiency = (sales, staff) => {
    if (!sales || sales === 0) return { color: 'bg-gray-800/10', status: 'Sin actividad' };
    const ratio = sales / (staff || 1);
    if (ratio > 500) return { color: 'bg-green-500', status: 'Riesgo de Saturación' };
    if (ratio > 200) return { color: 'bg-green-600/60', status: 'Eficiencia Óptima' };
    return { color: 'bg-green-900/30', status: 'Exceso de Personal' };
  };

  return (
    <div className="bg-[#161616] p-6 rounded-3xl border border-gray-800 shadow-xl overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold flex items-center gap-2 text-[10px] uppercase tracking-widest">
          📊 VENTAS VS STAFF
        </h3>
      </div>
      <div className="min-w-[700px]">
        <div className="grid grid-cols-11 gap-2 mb-4">
          <div className="w-12"></div>
          {hours.map(h => <div key={h} className="text-center text-[10px] text-gray-500 font-bold">{h}H</div>)}
        </div>
        {days.map(day => (
          <div key={day} className="grid grid-cols-11 gap-2 mb-2">
            <div className="text-[10px] text-gray-400 font-bold flex items-center uppercase">{day}</div>
            {hours.map(h => {
              const dayData = data[day] || {};
              const dayStaff = staffData[day] || {};
              const sales = dayData[h] || 0;
              const staff = dayStaff[h] || 0;
              const { color, status } = getEfficiency(sales, staff);
              
              return (
                <div key={h} className={`group relative h-14 rounded-xl ${color} border border-white/5 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer`}>
                  <span className="text-[10px] font-bold text-white">{sales > 0 ? `${sales}€` : '-'}</span>
                  {sales > 0 && <span className="text-[8px] text-white/60">👤 {staff}</span>}
                  <div className="absolute bottom-full mb-2 hidden group-hover:block z-50 bg-white text-black text-[10px] p-2 rounded-lg shadow-2xl w-32 font-medium">
                    <p className="border-b pb-1 mb-1 font-bold">{day} - {h}h</p>
                    <p>Ventas: {sales}€</p>
                    <p>Staff: {staff}</p>
                    <p className="mt-1 text-green-700 font-bold">{status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};


