import { useState } from 'react';
import { Plus, Workflow, Play, Pause, Settings2, Search, Filter, BarChart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AutomationBuilder } from '@/components/automations/automation-builder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const MOCK_WORKFLOWS = [
  {
    id: '1',
    name: 'Notificación de Vencimientos',
    description: 'Envía alertas por correo y Slack cuando un documento está próximo a vencer',
    status: 'active',
    triggers: ['document.expiration'],
    actions: ['email', 'slack'],
    lastRun: '2024-03-15T10:30:00Z',
    stats: {
      executions: 145,
      success: 142,
      failed: 3,
      avgTime: '2.3s',
    },
  },
  {
    id: '2',
    name: 'Archivo Automático',
    description: 'Clasifica y archiva documentos según su tipo en Google Drive',
    status: 'inactive',
    triggers: ['document.processed'],
    actions: ['gdrive'],
    lastRun: '2024-03-14T15:45:00Z',
    stats: {
      executions: 89,
      success: 85,
      failed: 4,
      avgTime: '3.1s',
    },
  },
  {
    id: '3',
    name: 'Actualización de Base de Datos',
    description: 'Sincroniza información de documentos con sistema externo',
    status: 'error',
    triggers: ['document.updated'],
    actions: ['api', 'database'],
    lastRun: '2024-03-14T12:00:00Z',
    stats: {
      executions: 67,
      success: 64,
      failed: 3,
      avgTime: '4.2s',
    },
  },
];

export function AutomationsPage() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('active');

  const filteredWorkflows = MOCK_WORKFLOWS.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = currentTab === 'all' || 
                      (currentTab === 'active' && workflow.status === 'active') ||
                      (currentTab === 'inactive' && workflow.status === 'inactive') ||
                      (currentTab === 'error' && workflow.status === 'error');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automatizaciones</h1>
          <p className="text-muted-foreground mt-2">
            Configura flujos de trabajo automáticos para tus documentos
          </p>
        </div>
        <Button onClick={() => setShowBuilder(true)} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Flujo</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Automatizaciones
            </CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{MOCK_WORKFLOWS.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 este mes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ejecuciones Exitosas
            </CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">291</div>
            <Progress value={94} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tiempo Promedio
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2s</div>
            <p className="text-xs text-muted-foreground">
              -0.5s que el mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasa de Éxito
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <Progress value={94} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar automatizaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </Button>
      </div>

      {/* Tabs and Workflows List */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="active">Activas</TabsTrigger>
          <TabsTrigger value="inactive">Inactivas</TabsTrigger>
          <TabsTrigger value="error">Con Errores</TabsTrigger>
        </TabsList>

        <TabsContent value={currentTab} className="mt-6">
          <div className="grid gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                      <span>{workflow.name}</span>
                      <Badge
                        variant={workflow.status === 'active' ? 'default' : 'secondary'}
                        className={cn(
                          workflow.status === 'error' && 'bg-red-100 text-red-800',
                          workflow.status === 'inactive' && 'bg-gray-100 text-gray-800'
                        )}
                      >
                        {workflow.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {workflow.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ejecuciones</p>
                        <p className="text-lg font-semibold">{workflow.stats.executions}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Exitosas</p>
                        <p className="text-lg font-semibold text-green-600">{workflow.stats.success}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Fallidas</p>
                        <p className="text-lg font-semibold text-red-600">{workflow.stats.failed}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                        <p className="text-lg font-semibold">{workflow.stats.avgTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Workflow className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {workflow.triggers.length} trigger{workflow.triggers.length !== 1 && 's'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Settings2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {workflow.actions.length} acción{workflow.actions.length !== 1 && 'es'}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Última ejecución: {new Date(workflow.lastRun).toLocaleString()}
                        </span>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="icon">
                          {workflow.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showBuilder && (
        <AutomationBuilder onClose={() => setShowBuilder(false)} />
      )}
    </div>
  );
}