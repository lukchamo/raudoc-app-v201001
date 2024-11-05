import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentAssociation } from '@/components/pqrd/document-association';
import { SmartDocumentViewer } from '@/components/pqrd/smart-document-viewer';
import { DocumentInsights } from '@/components/pqrd/document-insights';
import { PQRDTimeline } from '@/components/pqrd/pqrd-timeline';
import { PQRDResponse } from '@/components/pqrd/pqrd-response';
import {
  FileText,
  MessageSquare,
  Clock,
  Brain,
  History,
  Share2,
  Download,
  AlertTriangle,
} from 'lucide-react';

// Mock data
const MOCK_PQRD = {
  id: 'PQRD-2024-001',
  subject: 'Problema con el servicio',
  type: 'complaint',
  status: 'in_progress',
  priority: 'high',
  department: 'Technical Support',
  createdAt: '2024-03-15T10:00:00Z',
  deadline: '2024-03-22T10:00:00Z',
  description: 'Descripción detallada del problema reportado...',
  customer: {
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+1234567890',
  },
  assignee: {
    name: 'Ana García',
    department: 'Soporte Técnico',
    email: 'ana@company.com',
  },
  documents: [
    {
      id: 'doc1',
      name: 'Evidencia1.pdf',
      type: 'pdf',
      insights: 3,
      associatedAt: '2024-03-15T10:00:00Z',
      status: 'processed',
    },
    {
      id: 'doc2',
      name: 'Captura de pantalla.png',
      type: 'image',
      insights: 1,
      associatedAt: '2024-03-15T10:30:00Z',
      status: 'processed',
    },
  ],
  insights: [
    {
      id: '1',
      type: 'date',
      title: 'Fecha Crítica Detectada',
      description: 'Se requiere respuesta antes del 20 de marzo',
      priority: 'high',
      source: 'Documento adjunto',
      confidence: 0.95,
    },
    {
      id: '2',
      type: 'alert',
      title: 'Mención de SLA',
      description: 'Referencia al acuerdo de nivel de servicio',
      priority: 'medium',
      source: 'Análisis de contenido',
      confidence: 0.88,
    },
  ],
  timeline: [
    {
      id: '1',
      type: 'created',
      description: 'PQRD creada en el sistema',
      timestamp: '2024-03-15T10:00:00Z',
      user: 'Juan Pérez',
    },
    {
      id: '2',
      type: 'assigned',
      description: 'Asignada a Soporte Técnico',
      timestamp: '2024-03-15T10:30:00Z',
      user: 'Sistema',
    },
    {
      id: '3',
      type: 'document_added',
      description: 'Documento adjunto procesado',
      timestamp: '2024-03-15T11:00:00Z',
      user: 'Sistema',
    },
    {
      id: '4',
      type: 'response',
      description: 'Primera respuesta enviada',
      timestamp: '2024-03-15T14:00:00Z',
      user: 'Ana García',
    },
  ],
};

const statusStyles = {
  pending: { label: 'Pendiente', class: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'En Proceso', class: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resuelto', class: 'bg-green-100 text-green-800' },
  closed: { label: 'Cerrado', class: 'bg-gray-100 text-gray-800' },
};

const priorityStyles = {
  high: { label: 'Alta', class: 'bg-red-100 text-red-800' },
  medium: { label: 'Media', class: 'bg-yellow-100 text-yellow-800' },
  low: { label: 'Baja', class: 'bg-green-100 text-green-800' },
};

export function PQRDDetailsPage() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('summary');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {MOCK_PQRD.subject}
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{MOCK_PQRD.id}</Badge>
            <Badge
              variant="secondary"
              className={statusStyles[MOCK_PQRD.status as keyof typeof statusStyles].class}
            >
              {statusStyles[MOCK_PQRD.status as keyof typeof statusStyles].label}
            </Badge>
            <Badge
              variant="secondary"
              className={priorityStyles[MOCK_PQRD.priority as keyof typeof priorityStyles].class}
            >
              {priorityStyles[MOCK_PQRD.priority as keyof typeof priorityStyles].label}
            </Badge>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tiempo Restante</p>
              <p className="text-2xl font-bold">5 días</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Documentos</p>
              <p className="text-2xl font-bold">{MOCK_PQRD.documents.length}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Insights</p>
              <p className="text-2xl font-bold">{MOCK_PQRD.insights.length}</p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <Brain className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Respuestas</p>
              <p className="text-2xl font-bold">
                {MOCK_PQRD.timeline.filter(t => t.type === 'response').length}
              </p>
            </div>
            <div className="p-2 bg-primary/10 rounded-full">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="summary" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="space-x-2">
            <Brain className="h-4 w-4" />
            <span>Documentos</span>
            <Badge variant="secondary">{MOCK_PQRD.documents.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="insights" className="space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Insights</span>
            <Badge variant="secondary">{MOCK_PQRD.insights.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="history" className="space-x-2">
            <History className="h-4 w-4" />
            <span>Historial</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="summary" className="m-0 space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_PQRD.description}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Información del Cliente</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Nombre:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Teléfono:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.customer.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Asignación</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Responsable:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.assignee.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Departamento:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.assignee.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Email:</span>
                        <span className="text-sm font-medium">{MOCK_PQRD.assignee.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <PQRDResponse />
          </TabsContent>

          <TabsContent value="documents" className="m-0 space-y-6">
            <DocumentAssociation
              pqrdId={MOCK_PQRD.id}
              documents={MOCK_PQRD.documents}
              onAssociate={() => {}}
            />
            <SmartDocumentViewer
              documentId="doc1"
              documentName="Evidencia1.pdf"
              insights={[]}
            />
          </TabsContent>

          <TabsContent value="insights" className="m-0">
            <DocumentInsights
              insights={MOCK_PQRD.insights}
              onInsightAction={() => {}}
            />
          </TabsContent>

          <TabsContent value="history" className="m-0">
            <PQRDTimeline events={MOCK_PQRD.timeline} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}