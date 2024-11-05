import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Tag, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const insights = [
  {
    id: '1',
    type: 'date',
    title: 'Renovación de Contrato',
    description: 'Vence en 30 días - Contrato de Servicios 2024',
    priority: 'high',
    icon: Calendar,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Cláusula de Terminación',
    description: 'Requiere notificación con 60 días de anticipación',
    priority: 'medium',
    icon: AlertTriangle,
  },
  {
    id: '3',
    type: 'tag',
    title: 'Nueva Categoría Detectada',
    description: 'Documentos de cumplimiento normativo',
    priority: 'low',
    icon: Tag,
  },
];

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export function InsightsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights Recientes</CardTitle>
        <CardDescription>
          Últimos hallazgos detectados en tus documentos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge
                      variant="secondary"
                      className={cn(
                        priorityStyles[insight.priority as keyof typeof priorityStyles]
                      )}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}