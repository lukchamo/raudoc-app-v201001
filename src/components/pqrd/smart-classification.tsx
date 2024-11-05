import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  FileText,
  Users,
  Clock,
} from 'lucide-react';

interface Classification {
  type: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  department: string;
  sla: string;
  keywords: string[];
  reasoning: string[];
}

interface SmartClassificationProps {
  onClassificationComplete?: (classification: Classification) => void;
}

export function SmartClassification({
  onClassificationComplete,
}: SmartClassificationProps) {
  const [classification] = useState<Classification>({
    type: 'technical_complaint',
    confidence: 0.95,
    priority: 'high',
    department: 'Technical Support',
    sla: '48h',
    keywords: ['servicio', 'técnico', 'error', 'urgente'],
    reasoning: [
      'Lenguaje que indica urgencia y criticidad',
      'Menciones específicas de problemas técnicos',
      'Impacto en operaciones del cliente',
      'Referencias a intentos previos de solución',
    ],
  });

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Clasificación Inteligente</h3>
              <p className="text-sm text-muted-foreground">
                Análisis y categorización automática
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="space-x-1">
            <Brain className="h-3 w-3" />
            <span>{(classification.confidence * 100).toFixed(0)}% confianza</span>
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Tipo de PQRD</label>
              <div className="flex items-center space-x-2 mt-1">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Queja Técnica</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Prioridad</label>
              <div className="flex items-center space-x-2 mt-1">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800"
                >
                  Alta
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Departamento Sugerido</label>
              <div className="flex items-center space-x-2 mt-1">
                <Users className="h-4 w-4 text-primary" />
                <span>{classification.department}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">SLA Recomendado</label>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-4 w-4 text-primary" />
                <span>{classification.sla}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Palabras Clave</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {classification.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Razonamiento</label>
              <div className="space-y-2 mt-2">
                {classification.reasoning.map((reason, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 text-sm"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            className="space-x-2"
            onClick={() => onClassificationComplete?.(classification)}
          >
            <FileText className="h-4 w-4" />
            <span>Ver Detalles</span>
          </Button>
          <Button
            className="space-x-2"
            onClick={() => onClassificationComplete?.(classification)}
          >
            <CheckCircle className="h-4 w-4" />
            <span>Aceptar Clasificación</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}