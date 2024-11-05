import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Save,
  Share2,
  Copy,
  Edit2,
  Trash,
  FileText,
  BarChart,
  PieChart,
  LineChart,
} from 'lucide-react';

const SAVED_REPORTS = [
  {
    id: '1',
    name: 'Reporte Mensual de Contratos',
    description: 'Análisis mensual de contratos procesados',
    type: 'chart',
    lastRun: '2024-03-15T10:00:00Z',
    schedule: 'monthly',
  },
  {
    id: '2',
    name: 'Métricas de Procesamiento',
    description: 'Rendimiento y calidad del procesamiento',
    type: 'metrics',
    lastRun: '2024-03-14T15:30:00Z',
    schedule: 'weekly',
  },
];

const REPORT_TEMPLATES = [
  {
    id: 'performance',
    name: 'Rendimiento del Sistema',
    description: 'Métricas de rendimiento y procesamiento',
    icon: BarChart,
  },
  {
    id: 'documents',
    name: 'Análisis de Documentos',
    description: 'Estadísticas y tendencias de documentos',
    icon: FileText,
  },
  {
    id: 'trends',
    name: 'Tendencias Temporales',
    description: 'Análisis de tendencias a lo largo del tiempo',
    icon: LineChart,
  },
];

export function CustomReports() {
  const [currentTab, setCurrentTab] = useState('saved');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Reportes Personalizados
          </h2>
          <p className="text-sm text-muted-foreground">
            Crea y gestiona tus propios reportes
          </p>
        </div>
        <Button className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nuevo Reporte</span>
        </Button>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="saved">Guardados</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="shared">Compartidos</TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-4">
          {SAVED_REPORTS.map((report) => (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {report.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      Última ejecución: {new Date(report.lastRun).toLocaleString()}
                    </Badge>
                    <Badge variant="outline">{report.schedule}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {REPORT_TEMPLATES.map((template) => {
              const Icon = template.icon;
              return (
                <Card
                  key={template.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="p-2 w-fit rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <Button className="w-full">Usar Plantilla</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <Card className="p-6">
            <div className="text-center space-y-4">
              <div className="p-4">
                <Share2 className="h-12 w-12 text-muted-foreground mx-auto" />
                <h3 className="font-semibold mt-4">No hay reportes compartidos</h3>
                <p className="text-sm text-muted-foreground">
                  Los reportes compartidos contigo aparecerán aquí
                </p>
              </div>
              <Button variant="outline">Solicitar Acceso</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Builder Form */}
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Crear Nuevo Reporte</h3>
            <p className="text-sm text-muted-foreground">
              Configura los parámetros de tu reporte personalizado
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Reporte</Label>
                <Input id="name" placeholder="Ej: Reporte Mensual de KPIs" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Reporte</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chart">Gráfico</SelectItem>
                    <SelectItem value="table">Tabla</SelectItem>
                    <SelectItem value="metrics">Métricas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Describe el propósito de este reporte"
              />
            </div>

            <div className="space-y-2">
              <Label>Programación</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Frecuencia de ejecución" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diario</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="space-x-2">
                <Save className="h-4 w-4" />
                <span>Guardar Reporte</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}