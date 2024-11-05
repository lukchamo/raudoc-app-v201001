import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManagementReports } from '@/components/reports/management-reports';
import { AdvancedReports } from '@/components/reports/advanced-reports';
import { CustomReports } from '@/components/reports/custom-reports';
import { ReportScheduler } from '@/components/reports/report-scheduler';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  Settings, 
  Download, 
  Share2,
  Calendar,
  Clock,
  Filter
} from 'lucide-react';

export function ReportsPage() {
  const [currentTab, setCurrentTab] = useState('management');
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
          <p className="text-muted-foreground mt-2">
            Analiza y visualiza datos de tus documentos
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Programar</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Documentos</p>
              <p className="text-2xl font-bold">1,284</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <BarChart className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">
              +12% vs mes anterior
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
              <p className="text-2xl font-bold">2.4m</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">
              -0.5m vs mes anterior
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
              <p className="text-2xl font-bold">98.2%</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <PieChart className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">
              +2.1% vs mes anterior
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Insights Generados</p>
              <p className="text-2xl font-bold">3,842</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <LineChart className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">
              +18% vs mes anterior
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="management" className="space-x-2">
            <BarChart className="h-4 w-4" />
            <span>Gerenciales</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="space-x-2">
            <LineChart className="h-4 w-4" />
            <span>Avanzados</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="space-x-2">
            <Settings className="h-4 w-4" />
            <span>Personalizados</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="management">
            <ManagementReports />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedReports />
          </TabsContent>
          
          <TabsContent value="custom">
            <CustomReports />
          </TabsContent>
        </div>
      </Tabs>

      <Routes>
        <Route path="scheduler" element={<ReportScheduler />} />
      </Routes>
    </div>
  );
}