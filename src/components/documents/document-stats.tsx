import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';

const stats = [
  {
    title: 'Total Documentos',
    value: '128',
    icon: <FileText className="h-4 w-4" />,
    description: '+12 este mes',
  },
  {
    title: 'En Proceso',
    value: '5',
    icon: <Clock className="h-4 w-4" />,
    description: 'Tiempo promedio: 2 min',
  },
  {
    title: 'Procesados',
    value: '120',
    icon: <CheckCircle className="h-4 w-4" />,
    description: '94% de éxito',
  },
  {
    title: 'Requieren Atención',
    value: '3',
    icon: <AlertCircle className="h-4 w-4" />,
    description: 'Acciones pendientes',
  },
];

export function DocumentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          description={stat.description}
        />
      ))}
    </div>
  );
}