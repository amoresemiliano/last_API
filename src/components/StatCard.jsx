export const StatCard = ({ title, value, trend, icon, onClick }) => {
  // Verificamos que 'trend' exista antes de usar .includes()
  // Si no existe, usamos una cadena vacía
  const safeTrend = trend || "";
  const isPositive = safeTrend.includes('+');
  const hasTrend = safeTrend.length > 0;
  
  return (
    <div onClick={onClick} className="bg-[#161616] p-6 rounded-3xl border border-gray-800 hover:border-green-500/50 transition-all cursor-pointer group relative overflow-hidden">
      <div className="flex justify-between items-start relative z-10">
        <span className="text-2xl p-2 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform">{icon}</span>
        <div className="flex flex-col items-end">
          {hasTrend && (
            <span className={`text-[9px] font-black px-2 py-1 rounded-md ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {safeTrend}
            </span>
          )}
          <svg className="w-16 h-8 mt-2 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 40">
            <path d={isPositive || !hasTrend ? "M0 35 L20 30 L40 32 L60 15 L80 20 L100 5" : "M0 5 L20 15 L40 10 L60 30 L80 25 L100 38"} 
                  fill="none" stroke={isPositive || !hasTrend ? "#22C55E" : "#EF4444"} strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="mt-4 relative z-10">
        <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-bold text-white tracking-tighter">{value}</h3>
      </div>
    </div>
  );
};



