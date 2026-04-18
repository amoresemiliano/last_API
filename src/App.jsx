import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import { SecondaryMetrics } from './components/SecondaryMetrics';
import { DetailView } from './components/DetailView';

const MOCK_DATA = {
  stats: { totalSales: "2.450", salesTrend: "+12%", avgTicket: "34.20", ticketTrend: "+2%", occupancy: "142", occTrend: "+5%", avgTime: "52", timeTrend: "-4%" },
  heatmap: { 'VIE': { 13: 1200, 14: 2500, 21: 2800, 22: 1900 }, 'SAB': { 13: 1500, 14: 3100, 21: 3400, 22: 2500 } },
  staff: { 'VIE': { 13: 3, 14: 4, 21: 5, 22: 4 }, 'SAB': { 13: 4, 14: 6, 21: 6, 22: 5 } },
  channels: [
    { name: 'Local', percent: 65, color: 'bg-green-500' },
    { name: 'Apps Delivery', percent: 25, color: 'bg-blue-500' },
    { name: 'Shop Online', percent: 10, color: 'bg-purple-500' }
  ],
  topProducts: [
    { name: 'Burger Vegen Extra', qty: 84, type: 'STAR' },
    { name: 'Papas Nexus BBQ', qty: 62, type: 'PLOW' },
    { name: 'Cerveza Artesana', qty: 15, type: 'PUZZLE' },
    { name: 'Postre de Soja', qty: 5, type: 'DOG' }
  ],
  anomalies: [
    { title: "Mesa 14: Sobremesa crítica", desc: "Duración actual: 2h 15m (+45m del promedio)" },
    { title: "Ticket #402: Consumo inusual", desc: "Gasto de 85€ (Promedio: 34€)" }
  ]
};

function App() {
  const [view, setView] = useState('dashboard');
  const [activeTurn, setActiveTurn] = useState('MEDIODÍA');

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter italic">
            VEGEN <span className="text-green-500 font-light not-italic uppercase text-sm">Manager Lite</span>
          </h1>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em]">Horeca Intelligence System</p>
        </div>
        
        {view === 'dashboard' && (
          <div className="hidden md:flex p-1 bg-gray-900 rounded-xl border border-gray-800">
            {['MAÑANA', 'MEDIODÍA', 'NOCHE'].map(t => (
              <button key={t} onClick={() => setActiveTurn(t)} 
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${activeTurn === t ? 'bg-green-500 text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>
        )}
      </header>
      
      {view === 'dashboard' ? (
        <div className="space-y-8">
          <Dashboard 
            stats={MOCK_DATA.stats} 
            heatmapData={MOCK_DATA.heatmap} 
            staffData={MOCK_DATA.staff} 
            onStatClick={(id) => setView(id)} 
          />
          <SecondaryMetrics 
            channels={MOCK_DATA.channels} 
            topProducts={MOCK_DATA.topProducts} 
            anomalies={MOCK_DATA.anomalies}
            onProductClick={() => setView('products')}
          />
        </div>
      ) : (
        <DetailView type={view} onBack={() => setView('dashboard')} />
      )}
    </div>
  );
}

export default App;



