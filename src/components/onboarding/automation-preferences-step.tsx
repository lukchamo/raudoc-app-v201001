import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Workflow, 
  Bell, 
  Calendar,
  Mail,
  MessageSquare,
  Clock,
  Share2
} from 'lucide-react';

const automationPreferences = [
  {
    id: 'notifications',
    title: 'Notificaciones',
    description: 'Recibe alertas sobre documentos importantes',
    icon: Bell,
    options: [
      { id: 'email', label: 'Correo electrónico', icon: Mail },
      { id: 'slack', label: 'Slack', icon: MessageSquare },
      { id: 'calendar', label: 'Calendario', icon: Calendar },
    ],
  },
  {
    id: 'reminders',
    title: 'Recordatorios',
    description: 'Configuración de recordatorios automáticos',
    icon: Clock,
    options: [
      { id: 'expiration', label: 'Vencimientos' },
      { id: 'review', label: 'Revisiones periódicas' },
      { id: 'followup', label: 'Seguimientos' },
    ],
  },
  {
    id: 'sharing',
    title: 'Compartir',
    description: 'Opciones para compartir documentos',
    icon: Share2,
    options: [
      { id: 'team', label: 'Equipo' },
      { id: 'external', label: 'Usuarios externos' },
      { id: 'public', label: 'Enlaces públicos' },
    ],
  },
];

interface AutomationPreferencesStepProps {
  onComplete: (preferences: Record<string, string[]>) => void;
}

export function AutomationPreferencesStep({ onComplete }: AutomationPreferencesStepProps) {
  const [preferences, setPreferences] = useState<Record<string, string[]>>({});

  const toggleOption = (categoryId: string, optionId: string) => {
    setPreferences((prev) => {
      const current = prev[categoryId] || [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      
      return {
        ...prev,
        [categoryId]: updated,
      };
    });
  };

  const handleComplete = () => {
    onComplete(preferences);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="space-y-6">
        {automationPreferences.map((category) => {
          const Icon = category.icon;
          const selectedOptions = preferences[category.id] || [];

          return (
            <Card key={category.id} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {category.options.map((option) => {
                      const OptionIcon = option.icon;
                      const isSelected = selectedOptions.includes(option.id);

                      return (
                        <div
                          key={option.id}
                          className={`
                            flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                            transition-colors
                            ${isSelected ? 'bg-primary/10' : 'hover:bg-muted'}
                          `}
                          onClick={() => toggleOption(category.id, option.id)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleOption(category.id, option.id)}
                          />
                          {OptionIcon && <OptionIcon className="h-4 w-4" />}
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end space-x-4">
        <Button onClick={handleComplete} size="lg">
          Finalizar Configuración
        </Button>
      </div>
    </motion.div>
  );
}