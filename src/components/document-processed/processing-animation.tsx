import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, FileText, Search, Tag } from 'lucide-react';

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  progress: number;
}

const steps: ProcessingStep[] = [
  {
    id: 'analyze',
    title: 'Analizando documento',
    description: 'Procesando contenido y estructura',
    icon: FileText,
    progress: 0,
  },
  {
    id: 'classify',
    title: 'Clasificando contenido',
    description: 'Identificando tipo y categoría',
    icon: Tag,
    progress: 0,
  },
  {
    id: 'extract',
    title: 'Extrayendo información',
    description: 'Detectando datos relevantes',
    icon: Search,
    progress: 0,
  },
  {
    id: 'insights',
    title: 'Generando insights',
    description: 'Aplicando IA avanzada',
    icon: Brain,
    progress: 0,
  },
];

interface ProcessingAnimationProps {
  onComplete: () => void;
}

export function ProcessingAnimation({ onComplete }: ProcessingAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    const processStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        setTimeout(onComplete, 500);
        return;
      }

      const step = steps[stepIndex];
      let stepProgress = 0;

      const interval = setInterval(() => {
        stepProgress += 5;
        setProgress(prev => ({
          ...prev,
          [step.id]: stepProgress,
        }));

        if (stepProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => processStep(stepIndex + 1), 300);
          setCurrentStep(prev => prev + 1);
        }
      }, 50);
    };

    processStep(0);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Brain className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-xl font-semibold">Procesando documento</h2>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const stepProgress = progress[step.id] || 0;

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg transition-colors ${
                    isActive ? 'bg-primary/5' : isCompleted ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className={`h-5 w-5 text-primary ${
                        isActive ? 'animate-pulse' : ''
                      }`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{step.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {stepProgress}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      {(isActive || isCompleted) && (
                        <Progress value={stepProgress} className="h-1" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}