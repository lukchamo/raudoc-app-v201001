import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  FileText,
  Calendar,
  Tag,
  Brain,
  History,
  Share2,
  Download,
  Trash,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { DocumentViewerModal } from './document-viewer-modal';
import { DocumentInsights } from './document-insights';
import { DocumentHistory } from './document-history';
import { ShareDocumentModal } from './share-document-modal';
import { cn } from '@/lib/utils';

interface DocumentDetailViewProps {
  documentId: string;
  documentName: string;
  onClose: () => void;
}

interface DocumentMetadata {
  author: string;
  version: string;
  pages: number;
  createdAt: string;
  modifiedAt: string;
  category: string;
  tags: string[];
}

interface DocumentInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
}

interface HistoryEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  user: string;
}

interface MockDocument {
  id: string;
  name: string;
  type: string;
  status: string;
  metadata: DocumentMetadata;
  insights: DocumentInsight[];
  history: HistoryEntry[];
}

const statusStyles = {
  processed: {
    icon: CheckCircle,
    className: 'text-green-500',
  },
  processing: {
    icon: Clock,
    className: 'text-blue-500',
  },
  pending: {
    icon: AlertTriangle,
    className: 'text-yellow-500',
  },
  error: {
    icon: AlertTriangle,
    className: 'text-red-500',
  },
};

const MOCK_DOCUMENT: MockDocument = {
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
    },
    {
      id: '2',
      type: 'alert',
      title: 'Cláusula de Renovación',
      description: 'Requiere notificación con 60 días de anticipación',
      priority: 'medium',
    },
    {
      id: '3',
      type: 'tag',
      title: 'Tipo de Contrato',
      description: 'Contrato de servicios profesionales',
      priority: 'low',
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
};

export function DocumentDetailView({
  documentId,
  documentName,
  onClose,
}: DocumentDetailViewProps) {
  const [currentTab, setCurrentTab] = useState('document');
  const [isSharing, setIsSharing] = useState(false);

  const StatusIcon = statusStyles[MOCK_DOCUMENT.status as keyof typeof statusStyles]?.icon;

  const handleShare = () => {
    setIsSharing(true);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete document:', documentId);
  };

  return (
    <Dialog open onOpenChange={onClose} className="max-w-7xl">
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle>{documentName}</DialogTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{MOCK_DOCUMENT.type}</Badge>
                  <div className="flex items-center space-x-1">
                    {StatusIcon && (
                      <StatusIcon
                        className={cn(
                          'h-4 w-4',
                          statusStyles[MOCK_DOCUMENT.status as keyof typeof statusStyles]?.className
                        )}
                      />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {MOCK_DOCUMENT.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </Button>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="document" className="space-x-2">
                <FileText className="h-4 w-4" />
                <span>Documento</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="space-x-2">
                <Brain className="h-4 w-4" />
                <span>Insights</span>
                {MOCK_DOCUMENT.insights.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {MOCK_DOCUMENT.insights.length}
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
            </TabsList>

            <div className="mt-4">
              <TabsContent value="document" className="m-0">
                <DocumentViewerModal
                  documentId={documentId}
                  documentName={documentName}
                  onClose={() => {}}
                />
              </TabsContent>
              
              <TabsContent value="insights" className="m-0">
                <DocumentInsights insights={MOCK_DOCUMENT.insights} />
              </TabsContent>
              
              <TabsContent value="history" className="m-0">
                <DocumentHistory history={MOCK_DOCUMENT.history} />
              </TabsContent>
              
              <TabsContent value="metadata" className="m-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Información General
                      </h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm">Autor</dt>
                          <dd className="text-sm font-medium">
                            {MOCK_DOCUMENT.metadata.author}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm">Versión</dt>
                          <dd className="text-sm font-medium">
                            {MOCK_DOCUMENT.metadata.version}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm">Páginas</dt>
                          <dd className="text-sm font-medium">
                            {MOCK_DOCUMENT.metadata.pages}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Fechas
                      </h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm">Creado</dt>
                          <dd className="text-sm font-medium">
                            {new Date(MOCK_DOCUMENT.metadata.createdAt).toLocaleString()}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm">Modificado</dt>
                          <dd className="text-sm font-medium">
                            {new Date(MOCK_DOCUMENT.metadata.modifiedAt).toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Clasificación
                      </h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm">Categoría</dt>
                          <dd className="text-sm font-medium">
                            {MOCK_DOCUMENT.metadata.category}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Etiquetas
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {MOCK_DOCUMENT.metadata.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {isSharing && (
          <ShareDocumentModal
            documentId={documentId}
            documentName={documentName}
            onClose={() => setIsSharing(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}