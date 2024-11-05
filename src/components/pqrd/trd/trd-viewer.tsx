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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  Brain,
  Search,
  Filter,
  Download,
} from 'lucide-react';

interface TRDEntry {
  id: string;
  code: string;
  series: string;
  subseries: string;
  retentionPeriod: {
    archive: number;
    central: number;
  };
  finalDisposition: 'CT' | 'E' | 'S' | 'M';
  procedure: string;
  aiSuggestions?: {
    classification: string;
    retention: string;
    confidence: number;
  };
}

const MOCK_TRD: TRDEntry[] = [
  {
    id: '1',
    code: 'PQ-001',
    series: 'Peticiones',
    subseries: 'Peticiones de Información',
    retentionPeriod: {
      archive: 2,
      central: 8,
    },
    finalDisposition: 'S',
    procedure: 'Selección del 10% por año',
    aiSuggestions: {
      classification: 'Petición de Información General',
      retention: 'Sugerencia: Extender retención a 3 años en archivo',
      confidence: 0.92,
    },
  },
  {
    id: '2',
    code: 'PQ-002',
    series: 'Quejas',
    subseries: 'Quejas de Servicio',
    retentionPeriod: {
      archive: 3,
      central: 7,
    },
    finalDisposition: 'CT',
    procedure: 'Conservación total por valor legal',
    aiSuggestions: {
      classification: 'Queja por Calidad de Servicio',
      retention: 'Retención actual adecuada según análisis',
      confidence: 0.88,
    },
  },
];

const dispositionLabels = {
  CT: 'Conservación Total',
  E: 'Eliminación',
  S: 'Selección',
  M: 'Microfilmación',
};

export function TRDViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Tabla de Retención Documental
          </h2>
          <p className="text-muted-foreground mt-1">
            Gestión inteligente de retención documental
          </p>
        </div>
        <Button variant="outline" className="space-x-2">
          <Download className="h-4 w-4" />
          <span>Exportar TRD</span>
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar en la TRD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedSeries} onValueChange={setSelectedSeries}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por serie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las series</SelectItem>
            <SelectItem value="petitions">Peticiones</SelectItem>
            <SelectItem value="complaints">Quejas</SelectItem>
            <SelectItem value="claims">Reclamos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="space-x-2">
          <Filter className="h-4 w-4" />
          <span>Más filtros</span>
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Serie / Subserie</TableHead>
              <TableHead>Retención (años)</TableHead>
              <TableHead>Disposición Final</TableHead>
              <TableHead>Procedimiento</TableHead>
              <TableHead>Sugerencias IA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TRD.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.code}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{entry.series}</div>
                    <div className="text-sm text-muted-foreground">
                      {entry.subseries}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Archivo: {entry.retentionPeriod.archive} años</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Central: {entry.retentionPeriod.central} años</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {dispositionLabels[entry.finalDisposition]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm text-muted-foreground">
                    {entry.procedure}
                  </p>
                </TableCell>
                <TableCell>
                  {entry.aiSuggestions && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-primary" />
                        <Badge variant="secondary" className="space-x-1">
                          <span>{(entry.aiSuggestions.confidence * 100).toFixed(0)}%</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {entry.aiSuggestions.retention}
                      </p>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}