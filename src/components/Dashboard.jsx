import { StatCard } from './StatCard';
import { Heatmap } from './Heatmap';

export default function Dashboard({ stats, heatmapData, visibleHours, onStatClick }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Ventas Mensuales" value={`${stats.totalSales}€`} trend="+15%" icon="💰" onClick={() => onStatClick('sales')} />
        <StatCard title="Ticket Medio" value={`${stats.avgTicket}€`} trend="+4%" icon="🎫" onClick={() => onStatClick('ticket')} />
        <StatCard title="Comensales" value={stats.occupancy} trend="+12%" icon="👥" onClick={() => onStatClick('occupancy')} />
        <StatCard title="Estancia Media" value={`${stats.avgTime}m`} trend="-2%" icon="⏱️" onClick={() => onStatClick('duration')} />
      </div>
      <Heatmap data={heatmapData} visibleHours={visibleHours} />
    </div>
  );
}
