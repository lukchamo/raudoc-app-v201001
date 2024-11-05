import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentSummaryProps {
  show: boolean;
}

export function DocumentSummary({ show }: DocumentSummaryProps) {
  if (!show) return null;

  return (
    <Card className={cn('p-6', show ? 'animate-in fade-in-50' : '')}>
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-lg font-semibold">Resumen del Documento</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="font-medium">Tipo</span>
          </div>
          <Badge variant="secondary">Contrato</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Fecha</span>
          </div>
          <span className="text-sm">15 de marzo, 2024</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-primary" />
            <span className="font-medium">Categoría</span>
          </div>
          <Badge variant="outline">Servicios Profesionales</Badge>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <span className="font-medium">Prioridad</span>
          </div>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Media
          </Badge>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Palabras Clave</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Renovación</Badge>
            <Badge variant="outline">Servicios</Badge>
            <Badge variant="outline">Mensual</Badge>
            <Badge variant="outline">Confidencialidad</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}