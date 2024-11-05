import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Calendar, CheckCircle } from 'lucide-react';

interface Frequency {
  id: string;
  title: string;
  description: string;
  icon: any;
  documentsPerMonth: string;
}

const frequencies: Frequency[] = [
  {
    id: 'daily',
    title: 'Diariamente',
    description: 'Manejo documentos todos los días',
    icon: Clock,
    documentsPerMonth: '100+',
  },
  {
    id: 'weekly',
    title: 'Semanalmente',
    description: 'Proceso documentos algunas veces por semana',
    icon: Calendar,
    documentsPerMonth: '20-50',
  },
  {
    id: 'monthly',
    title: 'Mensualmente',
    description: 'Trabajo con documentos algunas veces al mes',
    icon: FileText,
    documentsPerMonth: '5-20',
  },
  {
    id: 'occasionally',
    title: 'Ocasionalmente',
    description: 'Uso documentos de forma esporádica',
    icon: CheckCircle,
    documentsPerMonth: '1-5',
  },
];

const documentTypes = [
  { id: 'contracts', label: 'Contratos' },
  { id: 'invoices', label: 'Facturas' },
  { id: 'reports', label: 'Informes' },
  { id: 'proposals', label: 'Propuestas' },
  { id: 'legal', label: 'Documentos Legales' },
  { id: 'technical', label: 'Documentación Técnica' },
  { id: 'hr', label: 'Recursos Humanos' },
  { id: 'financial', label: 'Documentos Financieros' },
];

interface DocumentFrequencyStepProps {
  onNext: (data: { frequency: string; types: string[] }) => void;
}

export function DocumentFrequencyStep({ onNext }: DocumentFrequencyStepProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showTypes, setShowTypes] = useState(false);

  const handleFrequencySelect = (frequencyId: string) => {
    setSelectedFrequency(frequencyId);
    setShowTypes(true);
  };

  const toggleDocumentType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleContinue = () => {
    if (selectedFrequency && selectedTypes.length > 0) {
      onNext({
        frequency: selectedFrequency,
        types: selectedTypes,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">¿Con qué frecuencia manejas documentos?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {frequencies.map((freq) => {
            const Icon = freq.icon;
            const isSelected = selectedFrequency === freq.id;

            return (
              <Card
                key={freq.id}
                className={`
                  p-4 cursor-pointer transition-all
                  hover:shadow-lg hover:scale-[1.02]
                  ${isSelected ? 'ring-2 ring-primary' : ''}
                `}
                onClick={() => handleFrequencySelect(freq.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{freq.title}</h4>
                      <Badge variant="secondary" className="ml-2">
                        {freq.documentsPerMonth}/mes
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {freq.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {showTypes && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-medium">¿Qué tipos de documentos manejas?</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona todos los tipos de documentos que procesas regularmente
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {documentTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedTypes.includes(type.id) ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => toggleDocumentType(type.id)}
              >
                <FileText className="mr-2 h-4 w-4" />
                {type.label}
              </Button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleContinue}
              disabled={!selectedFrequency || selectedTypes.length === 0}
            >
              Continuar
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}