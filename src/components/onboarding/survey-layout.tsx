import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SurveyLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
}

export function SurveyLayout({
  children,
  currentStep,
  totalSteps,
  title,
  description,
}: SurveyLayoutProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-6">
      <Card className="w-full max-w-3xl">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Paso {currentStep} de {totalSteps}</span>
              <span>{Math.round(progress)}% completado</span>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>

          {children}
        </div>
      </Card>
    </div>
  );
}