import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Workflow,
  Plus,
  Settings,
  Users,
  Clock,
  Mail,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Save,
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  type: 'approval' | 'notification' | 'assignment' | 'sla' | 'automation';
  config: Record<string, any>;
}

interface WorkflowBuilderProps {
  onSave: (workflow: any) => void;
  onCancel: () => void;
}

const STEP_TEMPLATES = [
  {
    type: 'approval',
    name: 'Aprobación',
    description: 'Requiere aprobación de un usuario o rol',
    icon: Users,
  },
  {
    type: 'notification',
    name: 'Notificación',
    description: 'Envía notificaciones por email o Slack',
    icon: Mail,
  },
  {
    type: 'assignment',
    name: 'Asignación',
    description: 'Asigna la PQRD a un usuario o departamento',
    icon: Users,
  },
  {
    type: 'sla',
    name: 'SLA',
    description: 'Configura tiempos de respuesta y alertas',
    icon: Clock,
  },
  {
    type: 'automation',
    name: 'Automatización',
    description: 'Ejecuta acciones automáticas',
    icon: Settings,
  },
];

export function WorkflowBuilder({ onSave, onCancel }: WorkflowBuilderProps) {
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const handleAddStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type: type as WorkflowStep['type'],
      config: {},
    };
    setSteps([...steps, newStep]);
    setSelectedStep(newStep.id);
  };

  const handleSave = () => {
    onSave({
      name: workflowName,
      description: workflowDescription,
      steps,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Constructor de Flujos de Trabajo
          </h2>
          <p className="text-muted-foreground mt-1">
            Define el flujo de trabajo para las PQRD
          </p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="space-x-2">
            <Save className="h-4 w-4" />
            <span>Guardar Flujo</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Información General</h3>
                <p className="text-sm text-muted-foreground">
                  Configura los detalles básicos del flujo
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre del Flujo</label>
                  <Input
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="Ej: Flujo de Quejas Técnicas"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Descripción</label>
                  <Input
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    placeholder="Describe el propósito del flujo"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de PQRD</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="complaint">Quejas</SelectItem>
                      <SelectItem value="claim">Reclamos</SelectItem>
                      <SelectItem value="suggestion">Sugerencias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Pasos del Flujo</h3>
                <p className="text-sm text-muted-foreground">
                  Arrastra y suelta los pasos para crear el flujo
                </p>
              </div>

              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <div className="p-2 rounded-full bg-primary/10">
                      <Workflow className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          Paso {index + 1}: {step.type}
                        </span>
                        <Badge variant="outline">
                          {step.type}
                        </Badge>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setSelectedStep('new')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir Paso
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {selectedStep === 'new' ? (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Añadir Nuevo Paso</h3>
                <div className="grid gap-4">
                  {STEP_TEMPLATES.map((template) => {
                    const Icon = template.icon;
                    return (
                      <div
                        key={template.type}
                        className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleAddStep(template.type)}
                      >
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ) : selectedStep && (
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Configurar Paso</h3>
                {/* Aquí iría la configuración específica de cada tipo de paso */}
                <p className="text-sm text-muted-foreground">
                  Configuración del paso seleccionado
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}