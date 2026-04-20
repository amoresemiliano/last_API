import React from 'react';

const productTypes = {
  STAR: { label: 'ESTRELLA', icon: '⭐', color: 'text-yellow-400 bg-yellow-400/10' },
  PLOW: { label: 'CABALLO', icon: '🐎', color: 'text-blue-400 bg-blue-400/10' },
  PUZZLE: { label: 'PUZLE', icon: '🧩', color: 'text-purple-400 bg-purple-400/10' },
  DOG: { label: 'PERRO', icon: '🐕', color: 'text-red-400 bg-red-400/10' }
};

export const DetailView = ({ type, data, onBack, filterType, setFilterType }) => {
  const isProducts = type === 'products';
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-500 pb-20">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-green-500 text-[10px] font-black uppercase tracking-widest">← VOLVER</button>
        {isProducts && (
          <div className="flex gap-2 bg-white dark:bg-gray-900 p-1 rounded-xl border dark:border-gray-800">
            {Object.keys(productTypes).map(k => (
              <button key={k} onClick={() => setFilterType(k)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{productTypes[k].icon}</button>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#161616] p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-x-auto transition-all">
        <h3 className="text-gray-400 font-black text-[10px] uppercase mb-8 tracking-widest italic">Auditoría Mensual: Marzo 2026</h3>
        {isProducts ? (
          <div className="space-y-3">
             {data.products.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-black/40 rounded-2xl border dark:border-gray-800">
                   <div className="flex items-center gap-4"><span className="text-xl">{productTypes[p.type].icon}</span><p className="text-sm font-bold dark:text-white uppercase">{p.name}</p></div>
                   <p className="text-green-500 font-black">{p.qty} u.</p>
                </div>
             ))}
          </div>
        ) : (
          <table className="w-full text-left text-[10px] font-bold min-w-[700px]">
            <thead className="text-gray-400 uppercase border-b dark:border-gray-800">
              <tr><th className="py-4 px-2">Día</th><th className="text-green-500 px-2">Local</th><th className="text-blue-500 px-2">Glovo</th><th className="text-yellow-600 px-2">Uber</th><th className="text-purple-500 px-2">Shop</th><th className="dark:text-white px-2">Total</th></tr>
            </thead>
            <tbody className="dark:text-gray-300">
              {days.map(d => (
                <tr key={d} className="border-b dark:border-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900/20">
                  <td className="py-3 px-2 opacity-50">{d}/03/26</td>
                  <td className="px-2">145.20€</td><td className="px-2">52.40€</td><td className="px-2">30.15€</td><td className="px-2">22.10€</td>
                  <td className="text-green-500 font-black px-2">249.85€</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
