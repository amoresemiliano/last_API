import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { SecondaryMetrics } from './components/SecondaryMetrics';
import { DetailView } from './components/DetailView';

const generateFullHeatmap = () => {
  const days = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'];
  const allHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const data = {};
  days.forEach(day => {
    data[day] = {};
    allHours.forEach(h => {
      data[day][h] = {
        s: Math.floor(Math.random() * 1500) + 300, 
        st: Math.floor(Math.random() * 4) + 1,    
        t: Math.floor(Math.random() * 30) + 10,   
        c: Math.floor(Math.random() * 60) + 15,   
        v: Math.floor(Math.random() * 4) + 1      
      };
    });
  });
  return data;
};

const MOCK_DATA = {
  stats: { totalSales: "2.450", salesTrend: "+12%", avgTicket: "34.20", ticketTrend: "+2%", occupancy: "142", occTrend: "+5%", avgTime: "52", timeTrend: "-4%" },
  heatmap: generateFullHeatmap(),
  products: Array.from({ length: 20 }, (_, i) => ({
    id: i,
    name: ['Burger Vegen', 'Tacos Heura', 'Pizza Nexus', 'Bowl Zen', 'Papas BBQ', 'Nuggets Soja', 'Cerveza Artesana', 'Kombucha', 'Tarta Queso', 'Café Especialty', 'Wrap Falafel', 'Ensalada Kale', 'Smoothie Green', 'Hummus Bio', 'Ramen Veg', 'Poke Tofu', 'Nachos Vegen', 'Bao Setas', 'Zumo Natural', 'Té Matcha'][i],
    qty: Math.floor(Math.random() * 100) + 10,
    type: ['STAR', 'PLOW', 'PUZZLE', 'DOG'][Math.floor(Math.random() * 4)]
  })),
  channels: [ { name: 'Local', percent: 65, color: 'bg-green-500' }, { name: 'Apps', percent: 25, color: 'bg-blue-500' }, { name: 'Web', percent: 10, color: 'bg-purple-500' } ],
  anomalies: [ { title: "Mesa 14: Sobremesa crítica", desc: "Duración actual: 2h 15m" } ]
};

function App() {
  const [view, setView] = useState('dashboard');
  const [activeTurn, setActiveTurn] = useState('MEDIODÍA');
  const [filterType, setFilterType] = useState(null);

  const getVisibleHours = () => {
    if (activeTurn === 'MAÑANA') return [9, 10, 11, 12];
    if (activeTurn === 'MEDIODÍA') return [12, 13, 14, 15, 16];
    if (activeTurn === 'NOCHE') return [17, 18, 19, 20, 21, 22];
    return [12, 13, 14, 15, 16];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div onClick={() => setView('dashboard')} className="cursor-pointer">
          <h1 className="text-2xl font-bold text-white tracking-tighter italic">
            VEGEN <span className="text-green-500 font-light not-italic uppercase text-sm">Manager Lite</span>
          </h1>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em]">Horeca Advanced Analytics</p>
        </div>
        
        {view === 'dashboard' && (
          <div className="flex p-1 bg-gray-900 rounded-xl border border-gray-800">
            {['MAÑANA', 'MEDIODÍA', 'NOCHE'].map(t => (
              <button 
                key={t} 
                onClick={() => setActiveTurn(t)} 
                className={`px-4 py-2 rounded-lg text-[9px] font-black transition-all ${activeTurn === t ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </header>
      
      {view === 'dashboard' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <Dashboard 
            stats={MOCK_DATA.stats} 
            heatmapData={MOCK_DATA.heatmap} 
            visibleHours={getVisibleHours()}
            onStatClick={(id) => setView(id)} 
          />
          {/* AQUÍ CONECTAMOS LAS 3 FUNCIONES DE CLIC */}
          <SecondaryMetrics 
            channels={MOCK_DATA.channels} 
            topProducts={MOCK_DATA.products.slice(0, 4)}
            anomalies={MOCK_DATA.anomalies}
            onProductClick={() => setView('products')}
            onChannelClick={() => setView('channels')} // <-- Conectado
            onAnomalyClick={() => setView('anomalies')} // <-- Conectado
          />
        </div>
      ) : (
        <DetailView 
          type={view} 
          data={MOCK_DATA} 
          filterType={filterType}
          setFilterType={setFilterType}
          onBack={() => { setView('dashboard'); setFilterType(null); }} 
        />
      )}
    </div>
  );
}

export default App;



