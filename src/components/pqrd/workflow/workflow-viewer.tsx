import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Workflow,
  Play,
  Pause,
  Settings,
  Plus,
  Users,
  Clock,
  Mail,
} from 'lucide-react';
import { WorkflowBuilder } from './workflow-builder';

interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'active' | 'inactive';
  steps: number;
  lastRun: string;
  stats: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
  };
}

const MOCK_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: '1',
    name: 'Flujo de Quejas Técnicas',
    description: 'Proceso automatizado para quejas técnicas',
    type: 'complaint',
    status: 'active',
    steps: 5,
    lastRun: '2024-03-15T10:00:00Z',
    stats: {
      total: 128,
      completed: 115,
      pending: 10,
      failed: 3,
    },
  },
  {
    id: '2',
    name: 'Flujo de Reclamos Prioritarios',
    description: 'Manejo de reclamos de alta prioridad',
    type: 'claim',
    status: 'inactive',
    steps: 4,
    lastRun: '2024-03-14T15:30:00Z',
    stats: {
      total: 85,
      completed: 75,
      pending: 8,
      failed: 2,
    },
  },
];

export function WorkflowViewer() {
  const [showBuilder, setShowBuilder] = useState(false);

  const handleSaveWorkflow = (workflow: any) => {
    console.log('Saving workflow:', workflow);
    setShowBuilder(false);
  };

  if (showBuilder) {
    return (
      <WorkflowBuilder
        onSave={handleSaveWorkflow}
        onCancel={() => setShowBuilder(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Flujos de Trabajo
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestiona los flujos de trabajo automatizados
          </p>
        </div>
        <Button onClick={() => setShowBuilder(true)} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Flujo</span>
        </Button>
      </div>

      <div className="grid gap-6">
        {MOCK_WORKFLOWS.map((workflow) => (
          <Card key={workflow.id} className="p-6">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">{workflow.name}</h3>
                    <Badge
                      variant={workflow.status === 'active' ? 'default' : 'secondary'}
                    >
                      {workflow.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {workflow.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    {workflow.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Workflow className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{workflow.steps} pasos</p>
                    <p className="text-xs text-muted-foreground">Total pasos</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {workflow.stats.completed} completados
                    </p>
                    <p className="text-xs text-muted-foreground">
                      de {workflow.stats.total} total
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {workflow.stats.pending} pendientes
                    </p>
                    <p className="text-xs text-muted-foreground">En proceso</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Última ejecución
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(workflow.lastRun).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paso</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Configuración</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      <Badge variant="outline">Asignación</Badge>
                    </TableCell>
                    <TableCell>Asignar a Soporte Técnico</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Activo
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2</TableCell>
                    <TableCell>
                      <Badge variant="outline">Notificación</Badge>
                    </TableCell>
                    <TableCell>Enviar email al cliente</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Activo
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}