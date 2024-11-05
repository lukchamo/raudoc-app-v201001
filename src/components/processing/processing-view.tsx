import { useState, useEffect, useCallback } from 'react';
import { FileText, Check, AlertCircle, Brain, Calendar, Tag } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DocumentSummary } from './document-summary';
import { DetectedInsights } from './detected-insights';
import { cn } from '@/lib/utils';

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

interface ProcessingViewProps {
  fileName: string;
  fileSize: string;
  onComplete?: () => void;
}

const initialSteps: ProcessingStep[] = [
  {
    id: 'upload',
    title: 'Subiendo documento',
    description: 'Preparando archivo para procesamiento',
    status: 'processing',
  },
  {
    id: 'analyze',
    title: 'Analizando contenido',
    description: 'Extrayendo información relevante',
    status: 'pending',
  },
  {
    id: 'classify',
    title: 'Clasificando documento',
    description: 'Identificando tipo y categoría',
    status: 'pending',
  },
  {
    id: 'insights',
    title: 'Generando insights',
    description: 'Detectando fechas, eventos y acciones importantes',
    status: 'pending',
  },
];

export function ProcessingView({ fileName, fileSize, onComplete }: ProcessingViewProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showInsights, setShowInsights] = useState(false);

  const updateProgress = useCallback(() => {
    const newProgress = Math.min((currentStep / (initialSteps.length - 1)) * 100, 100);
    setProgress(newProgress);
  }, [currentStep]);

  useEffect(() => {
    updateProgress();
  }, [currentStep, updateProgress]);

  useEffect(() => {
    let mounted = true;
    let stepTimer: NodeJS.Timeout;

    const processNextStep = () => {
      if (!mounted) return;

      setSteps((prevSteps) => {
        if (currentStep >= prevSteps.length) return prevSteps;

        const newSteps = [...prevSteps];
        // Complete current step
        newSteps[currentStep] = {
          ...newSteps[currentStep],
          status: 'completed',
        };
        // Start next step if available
        if (currentStep + 1 < newSteps.length) {
          newSteps[currentStep + 1] = {
            ...newSteps[currentStep + 1],
            status: 'processing',
          };
        }
        return newSteps;
      });

      if (currentStep < initialSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        stepTimer = setTimeout(processNextStep, 2000);
      } else {
        setShowInsights(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    stepTimer = setTimeout(processNextStep, 2000);

    return () => {
      mounted = false;
      clearTimeout(stepTimer);
    };
  }, [currentStep, onComplete]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">{fileName}</h3>
                <p className="text-sm text-muted-foreground">{fileSize}</p>
              </div>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-start space-x-4 p-4 rounded-lg transition-colors',
                    step.status === 'processing' && 'bg-primary/5',
                    step.status === 'completed' && 'bg-muted'
                  )}
                >
                  <div className="mt-1">
                    {step.status === 'completed' && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                    {step.status === 'processing' && (
                      <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                    )}
                    {step.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    )}
                    {step.status === 'pending' && (
                      <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/20" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <DocumentSummary show={showInsights} />
      </div>

      {showInsights && <DetectedInsights />}
    </div>
  );
}