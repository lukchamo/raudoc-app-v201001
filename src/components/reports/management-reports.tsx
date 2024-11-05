import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Download, Filter, RefreshCw } from 'lucide-react';

const documentsByType = [
  { name: 'Contratos', value: 45 },
  { name: 'Facturas', value: 30 },
  { name: 'Informes', value: 15 },
  { name: 'Legal', value: 10 },
];

const processingTrend = [
  { date: '2024-01', documents: 980, time: 2.8 },
  { date: '2024-02', documents: 1100, time: 2.5 },
  { date: '2024-03', documents: 1284, time: 2.4 },
];

const insightsByCategory = [
  { category: 'Fechas', value: 450 },
  { category: 'Legal', value: 300 },
  { category: 'Financiero', value: 280 },
  { category: 'Riesgo', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ManagementReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Reportes Gerenciales
          </h2>
          <p className="text-sm text-muted-foreground">
            Vista general del rendimiento y métricas clave
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button variant="outline" size="sm" className="space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Actualizar</span>
          </Button>
          <Button variant="outline" size="sm" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Processing Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Tendencia de Procesamiento</h3>
              <p className="text-sm text-muted-foreground">
                Documentos procesados y tiempo promedio
              </p>
            </div>
            <Badge variant="secondary">Últimos 3 meses</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="documents"
                  stroke="#0088FE"
                  name="Documentos"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="time"
                  stroke="#00C49F"
                  name="Tiempo (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Documents by Type */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Distribución por Tipo</h3>
              <p className="text-sm text-muted-foreground">
                Documentos procesados por categoría
              </p>
            </div>
            <Badge variant="secondary">Este mes</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={documentsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Insights by Category */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Insights por Categoría</h3>
              <p className="text-sm text-muted-foreground">
                Distribución de insights detectados
              </p>
            </div>
            <Badge variant="secondary">Este mes</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={insightsByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8">
                  {insightsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Processing Success Rate */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Tasa de Éxito</h3>
              <p className="text-sm text-muted-foreground">
                Rendimiento del procesamiento
              </p>
            </div>
            <Badge variant="secondary">Tiempo real</Badge>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processingTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="documents"
                  stroke="#0088FE"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}