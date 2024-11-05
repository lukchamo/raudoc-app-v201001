import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MOCK_INSIGHTS = [
  {
    id: '1',
    type: 'deadline',
    title: 'Renovación de Contrato',
    description: 'Vence en 30 días',
    action: 'Agendar recordatorio',
    icon: Calendar,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Factura Pendiente',
    description: 'Requiere aprobación',
    action: 'Ver detalles',
    icon: Bell,
  },
];

export function InsightsWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2">
        <Lightbulb className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_INSIGHTS.map((insight) => {
            const Icon = insight.icon;
            return (
              <div
                key={insight.id}
                className="flex items-center justify-between p-4 rounded-lg bg-accent/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-accent/20">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {insight.action}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}