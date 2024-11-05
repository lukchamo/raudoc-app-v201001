import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell, Brain } from 'lucide-react';

interface InsightAction {
  id: string;
  title: string;
  description: string;
  type: 'reminder' | 'notification' | 'task';
  icon: any;
  requiresAuth: boolean;
}

interface InsightActionModalProps {
  insight: {
    id: string;
    type: string;
    title: string;
    description: string;
  } | null;
  onClose: () => void;
}

const AVAILABLE_ACTIONS: InsightAction[] = [
  {
    id: 'reminder',
    title: 'Crear recordatorio',
    description: 'Programa una alerta para la fecha detectada',
    type: 'reminder',
    icon: Calendar,
    requiresAuth: true,
  },
  {
    id: 'notification',
    title: 'Configurar notificaciones',
    description: 'Recibe alertas sobre este documento',
    type: 'notification',
    icon: Bell,
    requiresAuth: true,
  },
];

export function InsightActionModal({ insight, onClose }: InsightActionModalProps) {
  if (!insight) return null;

  return (
    <Dialog open={Boolean(insight)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <div>
              <DialogTitle>Acciones Disponibles</DialogTitle>
              <DialogDescription>
                Selecciona una acción para este insight
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-1">{insight.title}</h4>
            <p className="text-sm text-muted-foreground">{insight.description}</p>
          </div>

          <div className="grid gap-4">
            {AVAILABLE_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{action.title}</h4>
                      {action.requiresAuth && (
                        <Badge variant="outline">Requiere cuenta</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 text-center">
            <Button size="lg" className="space-x-2">
              <Brain className="h-4 w-4" />
              <span>Crear cuenta para activar acciones</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}