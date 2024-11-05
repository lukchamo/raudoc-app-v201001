import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FileText, Brain, History, Tag, Share2, Download, Trash, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DocumentHeader } from '@/components/documents/document-header';
import { DocumentViewer } from '@/components/documents/document-viewer';
import { DocumentInsights } from '@/components/documents/document-insights';
import { DocumentHistory } from '@/components/documents/document-history';
import { DocumentMetadata } from '@/components/documents/document-metadata';
import { DocumentSummary } from '@/components/documents/document-summary';
import { DocumentAnalytics } from '@/components/documents/document-analytics';
import { ShareDocumentModal } from '@/components/documents/share-document-modal';
import { useToast } from '@/hooks/use-toast';

// Mock document data (move to a separate file in production)
const MOCK_DOCUMENT = {
  id: '1',
  name: 'Contrato de Servicios 2024',
  type: 'Contrato',
  status: 'processed',
  metadata: {
    author: 'Juan Pérez',
    version: '1.0',
    pages: 12,
    createdAt: '2024-03-15T10:00:00Z',
    modifiedAt: '2024-03-15T15:30:00Z',
    category: 'Contratos Comerciales',
    tags: ['Servicios', 'Legal', '2024', 'Renovación'],
  },
  insights: [
    {
      id: '1',
      type: 'date',
      title: 'Fecha de Vencimiento',
      description: 'El contrato vence el 15 de abril de 2024',
      priority: 'high',
      details: {
        context: 'Detectado en la cláusula 8.2 del contrato',
        recommendations: [
          'Programar recordatorio 30 días antes',
          'Preparar documentación para renovación',
          'Revisar términos y condiciones',
        ],
        relatedClauses: [
          {
            title: 'Cláusula de Renovación',
            content: 'La renovación debe ser notificada con 60 días de anticipación',
          }
        ]
      }
    },
    {
      id: '2',
      type: 'alert',
      title: 'Cláusula de Renovación',
      description: 'Requiere notificación con 60 días de anticipación',
      priority: 'medium',
      details: {
        context: 'Cláusula 9.1 del contrato',
        recommendations: [
          'Revisar condiciones de renovación',
          'Preparar notificación formal',
          'Documentar la comunicación',
        ]
      }
    },
    {
      id: '3',
      type: 'tag',
      title: 'Tipo de Contrato',
      description: 'Contrato de servicios profesionales',
      priority: 'low',
      details: {
        context: 'Clasificación basada en el contenido',
        recommendations: [
          'Verificar cumplimiento con políticas',
          'Revisar requisitos regulatorios',
        ]
      }
    },
  ],
  history: [
    {
      id: '1',
      action: 'created',
      description: 'Documento creado',
      timestamp: '2024-03-15T10:00:00Z',
      user: 'Juan Pérez',
    },
    {
      id: '2',
      action: 'processed',
      description: 'Procesamiento completado',
      timestamp: '2024-03-15T10:05:00Z',
      user: 'Sistema',
    },
    {
      id: '3',
      action: 'automated',
      description: 'Recordatorio configurado',
      timestamp: '2024-03-15T10:10:00Z',
      user: 'Sistema',
    },
  ],
  analytics: {
    views: 45,
    downloads: 12,
    shares: 8,
    lastAccessed: '2024-03-15T16:00:00Z',
    accessHistory: [
      { date: '2024-03-10', views: 5 },
      { date: '2024-03-11', views: 8 },
      { date: '2024-03-12', views: 12 },
      { date: '2024-03-13', views: 7 },
      { date: '2024-03-14', views: 6 },
      { date: '2024-03-15', views: 7 },
    ],
  },
};

export function DocumentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState<typeof MOCK_DOCUMENT | null>(null);
  const [currentTab, setCurrentTab] = useState('summary');
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDocument(MOCK_DOCUMENT);
      } catch (error) {
        console.error('Error loading document:', error);
        toast({
          title: "Error",
          description: "No se pudo cargar el documento",
          variant: "destructive",
        });
        navigate('/documents');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDocument();
    }
  }, [id, navigate, toast]);

  if (!id || loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="animate-pulse">Cargando documento...</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-destructive">Documento no encontrado</div>
      </div>
    );
  }

  const handleShare = () => {
    setIsSharing(true);
  };

  const handleDelete = () => {
    // Implement delete functionality
    toast({
      title: "Documento eliminado",
      description: "El documento ha sido eliminado correctamente",
    });
    navigate('/documents');
  };

  return (
    <div className="space-y-6">
      <DocumentHeader
        document={document}
        onShare={handleShare}
        onDelete={handleDelete}
      />

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="summary" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="document" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Documento</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="space-x-2">
            <Brain className="h-4 w-4" />
            <span>Insights</span>
            {document.insights.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {document.insights.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="space-x-2">
            <History className="h-4 w-4" />
            <span>Historial</span>
          </TabsTrigger>
          <TabsTrigger value="metadata" className="space-x-2">
            <Tag className="h-4 w-4" />
            <span>Metadatos</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="space-x-2">
            <BarChart className="h-4 w-4" />
            <span>Analíticas</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="summary" className="m-0">
            <DocumentSummary document={document} />
          </TabsContent>

          <TabsContent value="document" className="m-0">
            <DocumentViewer documentId={document.id} />
          </TabsContent>
          
          <TabsContent value="insights" className="m-0">
            <DocumentInsights insights={document.insights} />
          </TabsContent>
          
          <TabsContent value="history" className="m-0">
            <DocumentHistory history={document.history} />
          </TabsContent>
          
          <TabsContent value="metadata" className="m-0">
            <DocumentMetadata metadata={document.metadata} />
          </TabsContent>

          <TabsContent value="analytics" className="m-0">
            <DocumentAnalytics analytics={document.analytics} />
          </TabsContent>
        </div>
      </Tabs>

      {isSharing && (
        <ShareDocumentModal
          documentId={document.id}
          documentName={document.name}
          onClose={() => setIsSharing(false)}
        />
      )}
    </div>
  );
}