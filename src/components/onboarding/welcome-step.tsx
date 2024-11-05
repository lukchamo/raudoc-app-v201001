import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 text-center"
    >
      <div className="flex justify-center">
        <div className="p-4 rounded-full bg-primary/10">
          <Brain className="h-12 w-12 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Bienvenido a Raudoc
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Queremos conocer un poco más sobre tu trabajo para ofrecerte una experiencia 
          adaptada a tus necesidades. Completa esta breve encuesta y descubre el 
          potencial de la gestión documental inteligente.
        </p>
      </div>

      <Button onClick={onNext} size="lg" className="animate-pulse">
        Comenzar Configuración
      </Button>
    </motion.div>
  );
}