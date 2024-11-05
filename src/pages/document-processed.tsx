import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Brain,
  Calendar,
  Clock,
  Lock,
  AlertTriangle,
  ChevronRight,
  Eye,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DocumentPreviewModal } from '@/components/document-processed/document-preview-modal';
import { InsightDetailsModal } from '@/components/document-processed/insight-details-modal';
import { InsightActionModal } from '@/components/document-processed/insight-action-modal';
import { ProcessingAnimation } from '@/components/document-processed/processing-animation';
import { DocumentSummary } from '@/components/document-processed/document-summary';

const MOCK_DOCUMENT = {
  id: 'DOC-2024-001',
  name: 'Contrato de Servicios.pdf',
  type: 'Contrato',
  receivedAt: '2024-03-15T10:30:00Z',
  phoneNumber: '+1234567890',
  summary: {
    type: 'Contrato Comercial',
    category: 'Servicios Profesionales',
    language: 'Español',
    pageCount: 12,
    wordCount: 3450,
    keyTopics: [
      'Servicios',
      'Términos y Condiciones',
      'Confidencialidad',
      'Renovación',
    ],
  },
  insights: [
    {
      id: '1',
      type: 'date',
      title: 'Fecha de Vencimiento',
      description: 'El contrato vence el 15 de abril de 2024',
      priority: 'high',
      details: {
        context: 'Detectado en la cláusula principal del contrato',
        recommendations: [
          'Programar recordatorio de renovación',
          'Revisar términos antes del vencimiento',
          'Preparar documentación necesaria',
        ],
      },
    },
    {
      id: '2',
      type: 'alert',
      title: 'Cláusula de Renovación',
      description: 'Requiere notificación con 30 días de anticipación',
      priority: 'medium',
      details: {
        context: 'Especificado en la sección de términos y condiciones',
        recommendations: [
          'Marcar fecha límite de notificación',
          'Preparar carta de renovación',
          'Revisar condiciones actualizadas',
        ],
      },
    },
  ],
};

export function DocumentProcessedPage() {
  const { id } = useParams();
  const [processing, setProcessing] = useState(true);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<typeof MOCK_DOCUMENT.insights[0] | null>(null);
  const [selectedAction, setSelectedAction] = useState<typeof MOCK_DOCUMENT.insights[0] | null>(null);
  const [timeLeft] = useState(180); // 3 hours in minutes

  const handleProcessingComplete = () => {
    setProcessing(false);
  };

  if (processing) {
    return <ProcessingAnimation onComplete={handleProcessingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              ¡Documento recibido y procesado!
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hemos procesado tu documento con IA y extraído información relevante.
            Crea una cuenta para acceder a todas las funcionalidades.
          </p>
        </motion.div>

        {/* Document Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{MOCK_DOCUMENT.name}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline">{MOCK_DOCUMENT.type}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {MOCK_DOCUMENT.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="space-x-2"
                  onClick={() => setShowDocumentPreview(true)}
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver Documento</span>
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Recibido</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(MOCK_DOCUMENT.receivedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Tiempo restante</p>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        {Math.floor(timeLeft / 60)}h {timeLeft % 60}m
                      </p>
                      <Progress value={(timeLeft / 180) * 100} className="h-1" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Seguridad</p>
                    <p className="text-sm text-muted-foreground">
                      Eliminación automática en 3h
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Document Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DocumentSummary document={MOCK_DOCUMENT} />
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Insights Detectados</h3>
              <Badge variant="secondary" className="space-x-1">
                <Brain className="h-3 w-3" />
                <span>IA</span>
              </Badge>
            </div>

            <div className="grid gap-4">
              {MOCK_DOCUMENT.insights.map((insight) => (
                <Card
                  key={insight.id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        {insight.type === 'date' && (
                          <Calendar className="h-4 w-4 text-primary" />
                        )}
                        {insight.type === 'alert' && (
                          <AlertTriangle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedAction(insight)}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedInsight(insight)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8 bg-primary/5">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">
                  Descubre el poder de la IA en tus documentos
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Crea una cuenta gratuita y accede a todas las funcionalidades premium
                  por 14 días. Sin compromiso.
                </p>
              </div>

              <div className="grid gap-4 max-w-lg mx-auto">
                <Button size="lg" className="space-x-2">
                  <Brain className="h-4 w-4" />
                  <span>Crear cuenta gratuita</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Al crear una cuenta, aceptas nuestros términos y condiciones
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <h4 className="font-medium">Procesamiento Ilimitado</h4>
                  <p className="text-sm text-muted-foreground">
                    Sin límites en el número de documentos
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium">Insights Avanzados</h4>
                  <p className="text-sm text-muted-foreground">
                    Detección inteligente de información clave
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-medium">Automatizaciones</h4>
                  <p className="text-sm text-muted-foreground">
                    Configura acciones automáticas
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Modals */}
      <InsightDetailsModal
        insight={selectedInsight}
        onClose={() => setSelectedInsight(null)}
      />

      <InsightActionModal
        insight={selectedAction}
        onClose={() => setSelectedAction(null)}
      />

      <DocumentPreviewModal
        document={MOCK_DOCUMENT}
        onClose={() => setShowDocumentPreview(false)}
        open={showDocumentPreview}
      />
    </div>
  );
}