import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Code2,
  Building2,
  Users,
  LineChart,
  Scale,
  GraduationCap,
  Stethoscope,
  Briefcase,
} from 'lucide-react';

interface WorkType {
  id: string;
  title: string;
  description: string;
  icon: any;
  templates: string[];
}

const workTypes: WorkType[] = [
  {
    id: 'software',
    title: 'Desarrollo de Software',
    description: 'Gestión de documentación técnica, contratos y propuestas de desarrollo',
    icon: Code2,
    templates: [
      'Documentación técnica',
      'Contratos de desarrollo',
      'Propuestas de proyectos',
    ],
  },
  {
    id: 'business',
    title: 'Gestión Empresarial',
    description: 'Documentos corporativos, contratos y reportes financieros',
    icon: Building2,
    templates: [
      'Contratos comerciales',
      'Reportes financieros',
      'Documentos legales',
    ],
  },
  {
    id: 'hr',
    title: 'Recursos Humanos',
    description: 'Gestión de personal, contratos laborales y documentación de empleados',
    icon: Users,
    templates: [
      'Contratos laborales',
      'Evaluaciones de desempeño',
      'Políticas internas',
    ],
  },
  {
    id: 'sales',
    title: 'Ventas',
    description: 'Propuestas comerciales, contratos y documentación de clientes',
    icon: LineChart,
    templates: [
      'Propuestas comerciales',
      'Contratos de venta',
      'Documentación de clientes',
    ],
  },
  {
    id: 'legal',
    title: 'Legal',
    description: 'Contratos, documentos legales y cumplimiento normativo',
    icon: Scale,
    templates: [
      'Contratos legales',
      'Documentos normativos',
      'Acuerdos de confidencialidad',
    ],
  },
  {
    id: 'education',
    title: 'Educación',
    description: 'Documentación académica, planes de estudio y evaluaciones',
    icon: GraduationCap,
    templates: [
      'Planes de estudio',
      'Evaluaciones',
      'Documentos académicos',
    ],
  },
  {
    id: 'healthcare',
    title: 'Salud',
    description: 'Documentación médica, historias clínicas y formularios',
    icon: Stethoscope,
    templates: [
      'Historias clínicas',
      'Formularios médicos',
      'Documentación sanitaria',
    ],
  },
  {
    id: 'other',
    title: 'Otro',
    description: 'Selecciona esta opción si tu sector no está en la lista',
    icon: Briefcase,
    templates: [],
  },
];

interface WorkTypeStepProps {
  onNext: (selection: WorkType) => void;
}

export function WorkTypeStep({ onNext }: WorkTypeStepProps) {
  const [selectedType, setSelectedType] = useState<WorkType | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const handleSelect = (type: WorkType) => {
    setSelectedType(type);
    setShowTemplates(true);
  };

  const handleContinue = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType?.id === type.id;

          return (
            <Card
              key={type.id}
              className={`
                p-4 cursor-pointer transition-all
                hover:shadow-lg hover:scale-[1.02]
                ${isSelected ? 'ring-2 ring-primary' : ''}
              `}
              onClick={() => handleSelect(type)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type.description}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showTemplates && selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-medium mb-2">
              Plantillas recomendadas para {selectedType.title}:
            </h4>
            <ul className="space-y-2">
              {selectedType.templates.map((template, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">{template}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleContinue}>
              Continuar
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}