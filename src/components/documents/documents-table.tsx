import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  MoreVertical,
  Download,
  Trash,
  Share2,
  Eye,
  Brain,
} from 'lucide-react';
import { DocumentViewerModal } from './document-viewer-modal';
import { ShareDocumentModal } from './share-document-modal';

interface DocumentsTableProps {
  filters?: {
    type: string[];
    status: string[];
    date: string;
  };
}

const MOCK_DOCUMENTS = [
  {
    id: '1',
    name: 'Contrato de Servicios 2024',
    type: 'contract',
    status: 'processed',
    date: '2024-03-10T10:00:00Z',
    size: '2.5 MB',
    insights: 3,
  },
  {
    id: '2',
    name: 'Factura Proveedores Q1',
    type: 'invoice',
    status: 'processing',
    date: '2024-03-09T15:30:00Z',
    size: '1.2 MB',
    insights: 2,
  },
  {
    id: '3',
    name: 'Informe Trimestral',
    type: 'report',
    status: 'pending',
    date: '2024-03-08T09:15:00Z',
    size: '3.7 MB',
    insights: 0,
  },
];

const statusStyles = {
  processed: 'bg-green-100 text-green-800',
  processing: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  error: 'bg-red-100 text-red-800',
};

const typeLabels = {
  contract: 'Contrato',
  invoice: 'Factura',
  report: 'Informe',
};

export function DocumentsTable({ filters }: DocumentsTableProps) {
  const navigate = useNavigate();
  const [viewingDocument, setViewingDocument] = useState<{
    id: string;
    name: string;
  } | null>(null);
  
  const [sharingDocument, setSharingDocument] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleViewDocument = (doc: { id: string; name: string }) => {
    setViewingDocument(doc);
  };

  const handleViewAIDocument = (doc: { id: string; name: string }) => {
    navigate(`/documents/${doc.id}`);
  };

  const handleShare = (doc: { id: string; name: string }) => {
    setSharingDocument(doc);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Insights</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_DOCUMENTS.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium"
                      onClick={() => handleViewAIDocument({ id: doc.id, name: doc.name })}
                    >
                      {doc.name}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {typeLabels[doc.type as keyof typeof typeLabels]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      statusStyles[doc.status as keyof typeof statusStyles]
                    }
                  >
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(doc.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  {doc.insights > 0 && (
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20"
                      onClick={() => handleViewAIDocument({ id: doc.id, name: doc.name })}
                    >
                      {doc.insights} insights
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDocument({ id: doc.id, name: doc.name })}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleViewAIDocument({ id: doc.id, name: doc.name })}
                        className="bg-primary/5 hover:bg-primary/10"
                      >
                        <Brain className="mr-2 h-4 w-4 text-primary" />
                        Ver Documento AI
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Descargar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShare({ id: doc.id, name: doc.name })}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {viewingDocument && (
        <DocumentViewerModal
          documentId={viewingDocument.id}
          documentName={viewingDocument.name}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {sharingDocument && (
        <ShareDocumentModal
          documentId={sharingDocument.id}
          documentName={sharingDocument.name}
          onClose={() => setSharingDocument(null)}
        />
      )}
    </>
  );
}