import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Calendar, AlertTriangle, Tag } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';

const stats = [
  {
    title: 'Total Insights',
    value: '156',
    icon: <Brain className="h-4 w-4" />,
    description: '+23 esta semana',
  },
  {
    title: 'Fechas Importantes',
    value: '28',
    icon: <Calendar className="h-4 w-4" />,
    description: '12 próximos a vencer',
  },
  {
    title: 'Alertas',
    value: '15',
    icon: <AlertTriangle className="h-4 w-4" />,
    description: '5 requieren atención',
  },
  {
    title: 'Categorías',
    value: '8',
    icon: <Tag className="h-4 w-4" />,
    description: 'En 45 documentos',
  },
];

export function InsightsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
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