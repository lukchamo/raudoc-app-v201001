import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

export function PQRDStats() {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total PQRD</p>
            <p className="text-2xl font-bold">128</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <FileText className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-muted-foreground">
            +12 esta semana
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">En Proceso</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-full">
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <Progress value={35} className="h-2" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Resueltas</p>
            <p className="text-2xl font-bold">72</p>
          </div>
          <div className="p-2 bg-green-100 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-muted-foreground">
            Tasa de resolución: 92%
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Vencidas</p>
            <p className="text-2xl font-bold">11</p>
          </div>
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-muted-foreground">
            -3 vs mes anterior
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
            <p className="text-2xl font-bold">3.2d</p>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            <MessageSquare className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-xs text-muted-foreground">
            -0.5d vs objetivo
          </div>
        </div>
      </Card>
    </div>
  );
}