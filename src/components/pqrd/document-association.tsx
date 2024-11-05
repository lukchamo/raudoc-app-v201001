import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FileText, Plus, Search, Brain, Link as LinkIcon } from 'lucide-react';

interface AssociatedDocument {
  id: string;
  name: string;
  type: string;
  insights: number;
  associatedAt: string;
  status: 'processed' | 'processing' | 'failed';
}

interface DocumentAssociationProps {
  pqrdId: string;
  documents: AssociatedDocument[];
  onAssociate: () => void;
}

export function DocumentAssociation({
  pqrdId,
  documents,
  onAssociate,
}: DocumentAssociationProps) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">Documentos Asociados</h3>
            <p className="text-sm text-muted-foreground">
              Gestiona los documentos relacionados con esta PQRD
            </p>
          </div>
          <Button onClick={onAssociate} className="space-x-2">
            <Plus className="h-4 w-4" />
            <span>Asociar Documento</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Insights</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Asociación</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span>{doc.insights}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        doc.status === 'processed'
                          ? 'bg-green-100 text-green-800'
                          : doc.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {doc.status === 'processed'
                        ? 'Procesado'
                        : doc.status === 'processing'
                        ? 'Procesando'
                        : 'Error'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(doc.associatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="space-x-2">
                      <LinkIcon className="h-4 w-4" />
                      <span>Ver</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}