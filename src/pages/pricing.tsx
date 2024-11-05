import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { PlanDetailsModal } from '@/components/pricing/plan-details-modal';
import { CorporateContactModal } from '@/components/pricing/corporate-contact-modal';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const plans = [
  {
    id: 'free',
    name: 'Freemium',
    description: 'Para individuos y pequeños equipos',
    price: '0',
    features: [
      'Hasta 50 documentos por mes',
      'Conversión básica a documentos inteligentes',
      'Clasificación automática',
      '3 flujos de automatización',
      'Insights básicos',
      'Soporte por email',
    ],
    limitations: [
      'Sin acceso a automatización avanzada',
      'Sin integración con servicios externos',
      'Sin acceso a API',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para profesionales y equipos en crecimiento',
    price: '49',
    popular: true,
    features: [
      'Hasta 500 documentos por mes',
      'Conversión avanzada con IA',
      'Clasificación y etiquetado avanzado',
      'Flujos de automatización ilimitados',
      'Insights avanzados con IA',
      'Integraciones con servicios externos',
      'API de acceso',
      'Soporte prioritario',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporativo',
    description: 'Para grandes empresas con necesidades específicas',
    price: 'Personalizado',
    features: [
      'Documentos ilimitados',
      'Todas las características Pro',
      'Gestor de cuenta dedicado',
      'SLA garantizado',
      'Capacitación personalizada',
      'Personalización de flujos',
      'Implementación guiada',
      'Soporte 24/7',
    ],
  },
];

export function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCorporateModal, setShowCorporateModal] = useState(false);
  const documentsUsed = 35;
  const documentsLimit = 50;
  const daysLeft = 12;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Planes y Precios
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus necesidades. Todos los planes incluyen
          acceso a nuestra tecnología de IA para convertir documentos en activos inteligentes.
        </p>
      </div>

      {/* Current Plan Status */}
      <Card className="p-6 max-w-2xl mx-auto bg-muted/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Tu Plan Actual: Freemium</h3>
              <p className="text-sm text-muted-foreground">
                {daysLeft} días restantes en este ciclo
              </p>
            </div>
            <Badge variant="secondary">Activo</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uso de documentos</span>
              <span>{documentsUsed} de {documentsLimit}</span>
            </div>
            <Progress value={(documentsUsed / documentsLimit) * 100} />
          </div>
        </div>
      </Card>

      {/* Pricing Grid */}
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`relative p-6 space-y-6 ${
              plan.popular ? 'border-primary shadow-lg' : ''
            }`}>
              {plan.popular && (
                <Badge
                  className="absolute -top-2 -right-2"
                  variant="default"
                >
                  Más Popular
                </Badge>
              )}

              <div className="space-y-2">
                <h3 className="font-bold text-xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline space-x-2">
                {plan.price === 'Personalizado' ? (
                  <span className="text-3xl font-bold">Personalizado</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mes</span>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations && (
                  <div className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                        <span className="h-4 w-4 rounded-full border" />
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                {plan.id === 'corporate' ? (
                  <Button
                    className="w-full space-x-2"
                    onClick={() => setShowCorporateModal(true)}
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Contactar Ventas</span>
                  </Button>
                ) : plan.id === 'free' ? (
                  <Button variant="outline" className="w-full" disabled>
                    Plan Actual
                  </Button>
                ) : (
                  <Button
                    className="w-full space-x-2"
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Actualizar Plan</span>
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4 text-left">
            <h3 className="font-medium">¿Puedo cambiar de plan en cualquier momento?</h3>
            <p className="text-sm text-muted-foreground">
              Sí, puedes actualizar o cambiar tu plan en cualquier momento.
              Los cambios se aplican inmediatamente.
            </p>
          </Card>
          <Card className="p-4 text-left">
            <h3 className="font-medium">¿Qué pasa si excedo el límite de documentos?</h3>
            <p className="text-sm text-muted-foreground">
              Te notificaremos cuando estés cerca del límite. Puedes actualizar
              tu plan o esperar al siguiente ciclo.
            </p>
          </Card>
        </div>
      </div>

      {selectedPlan && (
        <PlanDetailsModal
          planId={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}

      {showCorporateModal && (
        <CorporateContactModal
          onClose={() => setShowCorporateModal(false)}
        />
      )}
    </div>
  );
}