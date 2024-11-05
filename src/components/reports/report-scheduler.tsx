import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Download,
  Settings,
  Users,
} from 'lucide-react';

const SCHEDULED_REPORTS = [
  {
    id: '1',
    name: 'Reporte Mensual de KPIs',
    schedule: 'monthly',
    lastRun: '2024-03-01T10:00:00Z',
    nextRun: '2024-04-01T10:00:00Z',
    recipients: ['equipo@empresa.com'],
    format: 'pdf',
    active: true,
  },
  {
    id: '2',
    name: 'Reporte Semanal de Procesamiento',
    schedule: 'weekly',
    lastRun: '2024-03-15T15:30:00Z',
    nextRun: '2024-03-22T15:30:00Z',
    recipients: ['gerencia@empresa.com'],
    format: 'excel',
    active: true,
  },
];

export function ReportScheduler() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Programación de Reportes
          </h2>
          <p className="text-sm text-muted-foreground">
            Gestiona la programación y distribución automática de reportes
          </p>
        </div>
        <Button className="space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Programar Nuevo</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Scheduled Reports List */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Reportes Programados</h3>
              <Badge variant="secondary">
                {SCHEDULED_REPORTS.length} activos
              </Badge>
            </div>

            <div className="space-y-4">
              {SCHEDULED_REPORTS.map((report) => (
                <div
                  key={report.id}
                  className="flex items-start justify-between p-4 rounded-lg border"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Próxima ejecución: {new Date(report.nextRun).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {report.recipients.length} destinatarios
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={report.active} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedReport(report.id)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Schedule Configuration */}
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Configuración de Programación</h3>
              <p className="text-sm text-muted-foreground">
                Define cuándo y cómo se distribuirán los reportes
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Frecuencia</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Hora de Ejecución</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input type="time" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Formato de Salida</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Método de Distribución</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email" />
                    <Label htmlFor="email" className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Correo Electrónico</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="slack" />
                    <Label htmlFor="slack" className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Slack</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="download" />
                    <Label
                      htmlFor="download"
                      className="flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Descargar Automáticamente</span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Configuración</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}