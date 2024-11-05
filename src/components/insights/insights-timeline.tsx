import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const timelineEvents = [
  {
    date: '2024-04-15',
    title: 'Renovación de Contrato',
    type: 'deadline',
    document: 'Contrato de Servicios 2024',
  },
  {
    date: '2024-05-01',
    title: 'Revisión Trimestral',
    type: 'review',
    document: 'Informe Q1 2024',
  },
  {
    date: '2024-05-15',
    title: 'Vencimiento de Factura',
    type: 'payment',
    document: 'Factura #2024-123',
  },
];

const typeStyles = {
  deadline: 'bg-red-100 text-red-800',
  review: 'bg-blue-100 text-blue-800',
  payment: 'bg-green-100 text-green-800',
};

export function InsightsTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Línea de Tiempo</CardTitle>
        <CardDescription>Próximos eventos y fechas importantes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4">
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="flex items-start space-x-4"
            >
              <div className="min-w-24 pt-1">
                <span className="text-sm font-medium">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex-1 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge
                    variant="secondary"
                    className={typeStyles[event.type as keyof typeof typeStyles]}
                  >
                    {event.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.document}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}