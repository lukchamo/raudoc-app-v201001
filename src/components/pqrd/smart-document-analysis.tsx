import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  FileText,
  AlertTriangle,
  Calendar,
  Tag,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface DocumentAnalysis {
  id: string;
  type: 'date' | 'alert' | 'tag' | 'classification';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  source: string;
  details?: {
    context: string;
    recommendations: string[];
    relatedClauses?: Array<{
      title: string;
      content: string;
    }>;
  };
}

interface SmartDocumentAnalysisProps {
  documentId: string;
  onAnalysisComplete?: (analysis: DocumentAnalysis[]) => void;
}

const MOCK_ANALYSIS: DocumentAnalysis[] = [
  {
    id: '1',
    type: 'classification',
    title: 'Tipo de PQRD',
    description: 'Reclamo por servicio técnico deficiente',
    priority: 'high',
    confidence: 0.95,
    source: 'Análisis de contenido',
    details: {
      context: 'Basado en el lenguaje y estructura del documento',
      recommendations: [
        'Asignar al departamento de soporte técnico',
        'Prioridad alta debido a impacto en servicio',
        'Requiere respuesta en 48 horas según SLA',
      ],
    },
  },
  {
    id: '2',
    type: 'date',
    title: 'Fecha Límite Detectada',
    description: 'Requiere respuesta antes del 20 de marzo',
    priority: 'high',
    confidence: 0.92,
    source: 'Análisis temporal',
    details: {
      context: 'Mencionado en párrafo 2',
      recommendations: [
        'Configurar recordatorio automático',
        'Notificar a supervisores',
      ],
    },
  },
  {
    id: '3',
    type: 'alert',
    title: 'Mención Legal',
    description: 'Referencias a términos de servicio y garantías',
    priority: 'medium',
    confidence: 0.88,
    source: 'Análisis legal',
    details: {
      context: 'Sección de términos y condiciones',
      recommendations: [
        'Revisar política de garantías',
        'Consultar con departamento legal',
      ],
      relatedClauses: [
        {
          title: 'Cláusula de Garantía',
          content: 'Según la sección 3.2 del contrato de servicio...',
        },
      ],
    },
  },
];

export function SmartDocumentAnalysis({
  documentId,
  onAnalysisComplete,
}: SmartDocumentAnalysisProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<DocumentAnalysis[]>([]);

  // Simulate analysis process
  useState(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setAnalyzing(false);
        setAnalysis(MOCK_ANALYSIS);
        if (onAnalysisComplete) {
          onAnalysisComplete(MOCK_ANALYSIS);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  });

  if (analyzing) {
    return (
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
            <div>
              <h3 className="font-semibold">Analizando Documento</h3>
              <p className="text-sm text-muted-foreground">
                Procesando contenido con IA
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span>Extracción de texto</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Análisis temporal</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span>Detección de alertas</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span>Clasificación</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Brain className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Análisis Completado</h3>
                <p className="text-sm text-muted-foreground">
                  Se encontraron {analysis.length} insights relevantes
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>IA Avanzada</span>
            </Badge>
          </div>

          <div className="space-y-4">
            {analysis.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge
                        variant="secondary"
                        className={
                          item.priority === 'high'
                            ? 'bg-red-100 text-red-800'
                            : item.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="space-x-1">
                        <Brain className="h-3 w-3" />
                        <span>{(item.confidence * 100).toFixed(0)}% confianza</span>
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Fuente: {item.source}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {item.details && (
                  <div className="mt-4 pl-4 border-l-2 border-muted">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {item.details.context}
                      </p>
                      {item.details.recommendations && (
                        <div className="space-y-1">
                          <span className="text-sm font-medium">
                            Recomendaciones:
                          </span>
                          <ul className="space-y-1">
                            {item.details.recommendations.map((rec, index) => (
                              <li
                                key={index}
                                className="text-sm text-muted-foreground flex items-center space-x-2"
                              >
                                <ChevronRight className="h-3 w-3" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}