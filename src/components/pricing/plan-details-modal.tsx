import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Check, Zap } from 'lucide-react';

interface PlanDetailsModalProps {
  planId: string;
  onClose: () => void;
}

const planDetails = {
  pro: {
    name: 'Plan Pro',
    price: '49',
    features: [
      {
        title: 'Automatización Avanzada',
        description: 'Crea flujos de trabajo complejos con múltiples condiciones y acciones',
      },
      {
        title: 'Insights con IA',
        description: 'Análisis profundo de documentos con detección avanzada de patrones',
      },
      {
        title: 'Integraciones',
        description: 'Conecta con tus herramientas favoritas como Slack, Google Workspace y más',
      },
    ],
    benefits: [
      'ROI mejorado en gestión documental',
      'Ahorro de tiempo en procesamiento',
      'Mayor precisión en extracción de datos',
      'Flujos de trabajo optimizados',
    ],
  },
};

export function PlanDetailsModal({ planId, onClose }: PlanDetailsModalProps) {
  const plan = planDetails[planId as keyof typeof planDetails];
  if (!plan) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Actualizar a {plan.name}</DialogTitle>
          <DialogDescription>
            Descubre todas las características premium disponibles
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Price Section */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <span className="text-2xl font-bold">${plan.price}</span>
              <span className="text-muted-foreground">/mes</span>
            </div>
            <Badge variant="secondary">Facturación mensual</Badge>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-medium">Características Destacadas</h3>
            <div className="grid gap-4">
              {plan.features.map((feature, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h3 className="font-medium">Beneficios</h3>
            <div className="grid gap-2">
              {plan.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="space-x-2">
              <Zap className="h-4 w-4" />
              <span>Actualizar Ahora</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}