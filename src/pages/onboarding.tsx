import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SurveyLayout } from '@/components/onboarding/survey-layout';
import { WelcomeStep } from '@/components/onboarding/welcome-step';
import { WorkTypeStep } from '@/components/onboarding/work-type-step';
import { DocumentFrequencyStep } from '@/components/onboarding/document-frequency-step';
import { AutomationPreferencesStep } from '@/components/onboarding/automation-preferences-step';
import { useToast } from '@/hooks/use-toast';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const handleComplete = () => {
    // Show success toast
    toast({
      title: "¡Configuración completada!",
      description: "Tu cuenta ha sido configurada exitosamente.",
      duration: 3000,
    });

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 500);
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return <WelcomeStep onNext={() => setStep(2)} />;
      case 2:
        return <WorkTypeStep onNext={() => setStep(3)} />;
      case 3:
        return <DocumentFrequencyStep onNext={() => setStep(4)} />;
      case 4:
        return <AutomationPreferencesStep onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  const getStepInfo = () => {
    switch (step) {
      case 1:
        return {
          title: 'Bienvenido a Raudoc',
          description: 'Comencemos con la configuración de tu cuenta',
        };
      case 2:
        return {
          title: '¿En qué sector trabajas?',
          description: 'Selecciona el tipo de trabajo que mejor describe tu actividad',
        };
      case 3:
        return {
          title: 'Uso de Documentos',
          description: 'Cuéntanos sobre tu manejo de documentos',
        };
      case 4:
        return {
          title: 'Automatizaciones',
          description: 'Configura tus preferencias de automatización',
        };
      default:
        return {
          title: '',
          description: '',
        };
    }
  };

  const { title, description } = getStepInfo();

  return (
    <SurveyLayout
      currentStep={step}
      totalSteps={totalSteps}
      title={title}
      description={description}
    >
      {getStepContent()}
    </SurveyLayout>
  );
}