import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
} from 'recharts';
import { Download, Filter, RefreshCw, Calendar, Search } from 'lucide-react';

const processingMetrics = [
  { date: '2024-01-01', accuracy: 95, confidence: 92, volume: 150 },
  { date: '2024-01-02', accuracy: 96, confidence: 94, volume: 145 },
  { date: '2024-01-03', accuracy: 94, confidence: 91, volume: 160 },
  { date: '2024-01-04', accuracy: 97, confidence: 95, volume: 155 },
  { date: '2024-01-05', accuracy: 95, confidence: 93, volume: 165 },
];

const correlationData = [
  { processingTime: 2.1, accuracy: 94, size: 50 },
  { processingTime: 2.3, accuracy: 95, size: 45 },
  { processingTime: 2.5, accuracy: 93, size: 60 },
  { processingTime: 2.2, accuracy: 96, size: 55 },
  { processingTime: 2.4, accuracy: 92, size: 65 },
];

export function AdvancedReports() {
  const [dateRange, setDateRange] = useState('7d');
  const [metric, setMetric] = useState('accuracy');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Reportes Avanzados
          </h2>
          <p className="text-sm text-muted-foreground">
            Análisis detallado y métricas avanzadas
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[150px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Rango de fechas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="90d">Últimos 90 días</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" size="sm" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Processing Quality Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Métricas de Calidad</h3>
              <p className="text-sm text-muted-foreground">
                Precisión y confianza del procesamiento
              </p>
            </div>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar métrica" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accuracy">Precisión</SelectItem>
                <SelectItem value="confidence">Confianza</SelectItem>
                <SelectItem value="combined">Combinado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processingMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#0088FE"
                  name="Precisión"
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="#00C49F"
                  name="Confianza"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Processing Volume Analysis */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Análisis de Volumen</h3>
              <p className="text-sm text-muted-foreground">
                Volumen de procesamiento y tendencias
              </p>
            </div>
            <Badge variant="secondary">Tiempo real</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processingMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                  name="Volumen"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Correlation Analysis */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Análisis de Correlación</h3>
              <p className="text-sm text-muted-foreground">
                Relación entre tiempo y precisión
              </p>
            </div>
            <Badge variant="secondary">Análisis avanzado</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="processingTime"
                  name="Tiempo de Procesamiento"
                  unit="s"
                />
                <YAxis dataKey="accuracy" name="Precisión" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter
                  name="Documentos"
                  data={correlationData}
                  fill="#8884d8"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Custom Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Métricas Personalizadas</h3>
              <p className="text-sm text-muted-foreground">
                Define y monitorea tus propias métricas
              </p>
            </div>
            <Button variant="outline" size="sm">
              Añadir Métrica
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input placeholder="Buscar métricas..." />
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {/* Placeholder for custom metrics */}
              <div className="p-4 rounded-lg border">
                <p className="font-medium">Tasa de Extracción</p>
                <p className="text-sm text-muted-foreground">
                  Porcentaje de datos extraídos correctamente
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="font-medium">Tiempo de Respuesta</p>
                <p className="text-sm text-muted-foreground">
                  Tiempo promedio de procesamiento
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}