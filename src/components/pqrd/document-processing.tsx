import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Upload,
  Brain,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

interface DocumentProcessingProps {
  file: File;
  onProcessingComplete?: (result: any) => void;
}

export function DocumentProcessing({
  file,
  onProcessingComplete,
}: DocumentProcessingProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: 'upload',
      name: 'Carga de Documento',
      description: 'Subiendo archivo al sistema',
      status: 'processing',
      progress: 0,
    },
    {
      id: 'extract',
      name: 'Extracción de Contenido',
      description: 'Procesando texto y estructura',
      status: 'pending',
    },
    {
      id: 'analyze',
      name: 'Análisis Inteligente',
      description: 'Aplicando modelos de IA',
      status: 'pending',
    },
    {
      id: 'classify',
      name: 'Clasificación',
      description: 'Determinando tipo y prioridad',
      status: 'pending',
    },
  ]);

  // Simulate processing steps
  useState(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        
        // Update current step progress
        if (currentStep < newSteps.length) {
          const step = newSteps[currentStep];
          if (step.progress !== undefined) {
            step.progress += 20;
            if (step.progress >= 100) {
              step.status = 'completed';
              if (currentStep + 1 < newSteps.length) {
                newSteps[currentStep + 1].status = 'processing';
                newSteps[currentStep + 1].progress = 0;
              }
              currentStep++;
            }
          } else {
            step.status = 'completed';
            if (currentStep + 1 < newSteps.length) {
              newSteps[currentStep + 1].status = 'processing';
              newSteps[currentStep + 1].progress = 0;
            }
            currentStep++;
          }
        }

        // Check if all steps are completed
        if (currentStep >= newSteps.length) {
          clearInterval(interval);
          if (onProcessingComplete) {
            onProcessingComplete({
              success: true,
              message: 'Procesamiento completado',
            });
          }
        }

        return newSteps;
      });
    }, 500);

    return () => clearInterval(interval);
  });

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-full bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{file.name}</h3>
            <p className="text-sm text-muted-foreground">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStepIcon(step.status)}
                  <div>
                    <p className="font-medium">{step.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={
                    step.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : step.status === 'processing'
                      ? 'bg-blue-100 text-blue-800'
                      : step.status === 'error'
                      ? 'bg-red-100 text-red-800'
                      : ''
                  }
                >
                  {step.status}
                </Badge>
              </div>
              {step.progress !== undefined && step.status === 'processing' && (
                <Progress value={step.progress} className="h-2" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              Procesado con IA avanzada
            </span>
          </div>
          <Button variant="outline" size="sm">
            Ver Detalles
          </Button>
        </div>
      </div>
    </Card>
  );
}