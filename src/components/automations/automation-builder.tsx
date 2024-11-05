import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Workflow, Mail, Slack, Calendar, Database } from 'lucide-react';

interface AutomationBuilderProps {
  onClose: () => void;
}

const TRIGGERS = [
  {
    id: 'document.processed',
    name: 'Documento Procesado',
    description: 'Cuando un documento ha sido procesado completamente',
    icon: Database,
  },
  {
    id: 'document.expiration',
    name: 'Documento por Vencer',
    description: 'Cuando un documento está próximo a su fecha de vencimiento',
    icon: Calendar,
  },
];

const ACTIONS = [
  {
    id: 'email',
    name: 'Enviar Email',
    description: 'Envía una notificación por correo electrónico',
    icon: Mail,
  },
  {
    id: 'slack',
    name: 'Notificar en Slack',
    description: 'Envía un mensaje a un canal de Slack',
    icon: Slack,
  },
];

export function AutomationBuilder({ onClose }: AutomationBuilderProps) {
  const [step, setStep] = useState(1);
  const [workflow, setWorkflow] = useState({
    name: '',
    description: '',
    trigger: '',
    actions: [] as string[],
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Aquí iría la lógica para guardar el workflow
      console.log('Workflow creado:', workflow);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Automatización</DialogTitle>
          <DialogDescription>
            Configura un nuevo flujo de trabajo automatizado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del flujo</Label>
                <Input
                  id="name"
                  value={workflow.name}
                  onChange={(e) =>
                    setWorkflow({ ...workflow, name: e.target.value })
                  }
                  placeholder="Ej: Notificación de vencimientos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  value={workflow.description}
                  onChange={(e) =>
                    setWorkflow({ ...workflow, description: e.target.value })
                  }
                  placeholder="Describe qué hará este flujo"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Selecciona el disparador</Label>
              <div className="grid gap-4">
                {TRIGGERS.map((trigger) => {
                  const Icon = trigger.icon;
                  return (
                    <div
                      key={trigger.id}
                      className={`
                        flex items-start space-x-4 p-4 rounded-lg cursor-pointer
                        transition-colors
                        ${
                          workflow.trigger === trigger.id
                            ? 'bg-primary/10 border-primary'
                            : 'border hover:bg-muted'
                        }
                        border
                      `}
                      onClick={() =>
                        setWorkflow({ ...workflow, trigger: trigger.id })
                      }
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{trigger.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {trigger.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>Selecciona las acciones</Label>
              <div className="grid gap-4">
                {ACTIONS.map((action) => {
                  const Icon = action.icon;
                  const isSelected = workflow.actions.includes(action.id);
                  return (
                    <div
                      key={action.id}
                      className={`
                        flex items-start space-x-4 p-4 rounded-lg cursor-pointer
                        transition-colors
                        ${
                          isSelected
                            ? 'bg-primary/10 border-primary'
                            : 'border hover:bg-muted'
                        }
                        border
                      `}
                      onClick={() =>
                        setWorkflow({
                          ...workflow,
                          actions: isSelected
                            ? workflow.actions.filter((a) => a !== action.id)
                            : [...workflow.actions, action.id],
                        })
                      }
                    >
                      <div className="p-2 rounded-full bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{action.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? 'Crear Flujo' : 'Siguiente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}