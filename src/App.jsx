import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { SecondaryMetrics } from './components/SecondaryMetrics';
import { DetailView } from './components/DetailView';
import { Importer } from './components/Importer';
import { ConfigurationView } from './components/ConfigurationView';

function App() {
  const [view, setView] = useState('dashboard');
  const [activeTurn, setActiveTurn] = useState('MEDIODÍA');
  const [darkMode, setDarkMode] = useState(true);
  const [currentData, setCurrentData] = useState({ stats: { totalSales: "38.450", avgTicket: "28.40", occupancy: "2.840", avgTime: "45" }, heatmap: {}, products: [], channels: [], anomalies: [] });

  const getVisibleHours = () => {
    if (activeTurn === 'MAÑANA') return [8, 9, 10, 11, 12, 13];
    if (activeTurn === 'MEDIODÍA') return [13, 14, 15, 16, 17, 18];
    if (activeTurn === 'NOCHE') return [18, 19, 20, 21, 22, 23];
    return [13, 14, 15, 16, 17, 18];
  };

  return (
    <div className={`${darkMode ? 'dark bg-[#0a0a0a]' : 'bg-[#F4F4F4]'} min-h-screen transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div onClick={() => setView('dashboard')} className="cursor-pointer">
            <h1 className="text-2xl font-bold dark:text-white italic">VEGEN <span className="text-green-500 not-italic uppercase text-sm font-light">Manager Lite</span></h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-white dark:bg-gray-900 p-2 rounded-xl border dark:border-gray-800 flex gap-4 items-center">
              <select className="bg-transparent text-[9px] font-black dark:text-white uppercase outline-none"><option>Marzo 2026</option></select>
              <Importer onDataImported={setCurrentData} />
            </div>
            
            <button onClick={() => setView('config')} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">⚙️ Configuración</button>
            
            <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-xl hover:scale-110 transition-transform">
               {darkMode ? '☀️' : '🌙'}
            </button>
            
            <div className="flex p-1 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
              {['MAÑANA', 'MEDIODÍA', 'NOCHE'].map(t => (
                <button key={t} onClick={() => setActiveTurn(t)} className={`px-4 py-2 rounded-lg text-[9px] font-black transition-all ${activeTurn === t ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-400'}`}>{t}</button>
              ))}
            </div>
          </div>
        </header>

        {view === 'dashboard' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <Dashboard stats={currentData.stats} heatmapData={currentData.heatmap} visibleHours={getVisibleHours()} onStatClick={setView} />
            <SecondaryMetrics channels={currentData.channels} topProducts={currentData.products.slice(0, 4)} anomalies={currentData.anomalies} onProductClick={() => setView('products')} onChannelClick={() => setView('channels')} onAnomalyClick={() => setView('anomalies')} />
          </div>
        ) : view === 'config' ? (
          <ConfigurationView products={currentData.products} onBack={() => setView('dashboard')} />
        ) : (
          <DetailView type={view} data={currentData} onBack={() => setView('dashboard')} setFilterType={() => {}} />
        )}
      </div>
    </div>
  );
}

export default App;
