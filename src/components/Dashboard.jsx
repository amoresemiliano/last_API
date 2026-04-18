import { StatCard } from './StatCard';
import { Heatmap } from './Heatmap';

export default function Dashboard({ stats, heatmapData, staffData, onStatClick }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Header: 4 Métricas principales con capacidad de clic */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Venta Hoy" 
          value={`${stats.totalSales}€`} 
          trend={stats.salesTrend} 
          icon="💰" 
          onClick={() => onStatClick('sales')} 
        />
        <StatCard 
          title="Ticket Medio" 
          value={`${stats.avgTicket}€`} 
          trend={stats.ticketTrend} 
          icon="🎫" 
          onClick={() => onStatClick('sales')} 
        />
        <StatCard 
          title="Comensales" 
          value={stats.occupancy} 
          trend={stats.occTrend} 
          icon="👥" 
          onClick={() => onStatClick('sales')} 
        />
        <StatCard 
          title="Estancia Media" 
          value={`${stats.avgTime}m`} 
          trend={stats.timeTrend} 
          icon="⏱️" 
          onClick={() => onStatClick('sales')} 
        />
      </div>

      {/* Mapa de Calor: Ventas vs Staff */}
      <div className="w-full">
        <Heatmap data={heatmapData} staffData={staffData} />
      </div>
    </div>
  );
}
