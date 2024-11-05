import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Tag, ChevronRight, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InsightDetailsModal } from './insight-details-modal';

const insights = [
  {
    id: '1',
    type: 'date',
    category: 'Fechas Importantes',
    title: 'Fecha de Vencimiento',
    description: 'El contrato vence el 15 de abril de 2024',
    priority: 'high',
    action: 'Agendar recordatorio',
    icon: Calendar,
    details: {
      context: 'Esta fecha fue detectada en la cláusula 8.2 del contrato, que especifica los términos de renovación.',
      location: 'Página 3, Párrafo 4',
      recommendations: [
        'Programar una reunión de revisión 60 días antes del vencimiento',
        'Preparar documentación para renovación',
        'Evaluar términos y condiciones actuales',
      ],
      relatedInsights: [
        {
          title: 'Período de Notificación',
          description: 'Se requiere notificar la intención de renovar con 60 días de anticipación',
        },
      ],
    },
  },
  {
    id: '2',
    type: 'alert',
    category: 'Cláusulas',
    title: 'Cláusula de Renovación',
    description: 'Requiere notificación con 60 días de anticipación',
    priority: 'medium',
    action: 'Ver detalles',
    icon: AlertTriangle,
    details: {
      context: 'La cláusula establece los requisitos específicos para la renovación del contrato.',
      location: 'Página 4, Cláusula 9.1',
      recommendations: [
        'Revisar condiciones de renovación',
        'Preparar notificación formal',
        'Documentar la comunicación con la otra parte',
      ],
    },
  },
  {
    id: '3',
    type: 'tag',
    category: 'Clasificación',
    title: 'Tipo de Contrato',
    description: 'Contrato de servicios profesionales',
    priority: 'low',
    icon: Tag,
    details: {
      context: 'Clasificación basada en el contenido y estructura del documento.',
      location: 'Documento completo',
      recommendations: [
        'Verificar cumplimiento con políticas internas',
        'Revisar requisitos regulatorios específicos',
      ],
    },
  },
];

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export function DetectedInsights() {
  const [selectedInsight, setSelectedInsight] = useState<typeof insights[0] | null>(null);

  return (
    <>
      <Card className="animate-in fade-in-50 duration-500">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>Insights Detectados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {insights.map((insight) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.id}
                  className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {insight.category}
                      </Badge>
                    </div>
                    <Badge
                      variant="secondary"
                      className={priorityStyles[insight.priority as keyof typeof priorityStyles]}
                    >
                      {insight.priority}
                    </Badge>
                  </div>
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {insight.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full space-x-2"
                    onClick={() => setSelectedInsight(insight)}
                  >
                    <span>Ver detalles</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <InsightDetailsModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
      />
    </>
  );
}