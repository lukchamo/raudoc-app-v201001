import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  MessageSquare,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Edit,
  Trash,
  Share2,
  History,
  Brain,
  Workflow,
  Plus,
} from 'lucide-react';

const MOCK_PQRDS = [
  {
    id: 'PQRD-2024-001',
    type: 'complaint',
    subject: 'Problema con el servicio',
    status: 'pending',
    priority: 'high',
    department: 'Technical Support',
    createdAt: '2024-03-15T10:00:00Z',
    deadline: '2024-03-22T10:00:00Z',
    responses: 2,
  },
  {
    id: 'PQRD-2024-002',
    type: 'petition',
    subject: 'Solicitud de información',
    status: 'in_progress',
    priority: 'medium',
    department: 'Customer Service',
    createdAt: '2024-03-14T15:30:00Z',
    deadline: '2024-03-21T15:30:00Z',
    responses: 1,
  },
];

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

const typeLabels = {
  petition: 'Petición',
  complaint: 'Queja',
  claim: 'Reclamo',
  suggestion: 'Sugerencia',
};

export function PQRDList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (action: string, pqrd: typeof MOCK_PQRDS[0]) => {
    switch (action) {
      case 'view':
        navigate(`/pqrd/${pqrd.id}`);
        break;
      case 'edit':
        navigate(`/pqrd/${pqrd.id}/edit`);
        break;
      case 'documents':
        navigate(`/pqrd/${pqrd.id}?tab=documents`);
        break;
      case 'workflow':
        navigate(`/pqrd/${pqrd.id}?tab=workflow`);
        break;
      case 'insights':
        navigate(`/pqrd/${pqrd.id}?tab=insights`);
        break;
      case 'history':
        navigate(`/pqrd/${pqrd.id}?tab=history`);
        break;
      case 'share':
        toast({
          title: "Compartir PQRD",
          description: "Funcionalidad de compartir próximamente disponible",
        });
        break;
      case 'delete':
        toast({
          title: "Confirmar eliminación",
          description: "¿Está seguro de que desea eliminar esta PQRD?",
          variant: "destructive",
        });
        break;
      default:
        console.log(`Action ${action} for PQRD ${pqrd.id}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar PQRD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" className="space-x-2">
          <Filter className="h-4 w-4" />
          <span>Filtros</span>
        </Button>
        <Button onClick={() => navigate('/pqrd/new')} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nueva PQRD</span>
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Fecha Límite</TableHead>
              <TableHead>Respuestas</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PQRDS.map((pqrd) => (
              <TableRow key={pqrd.id}>
                <TableCell className="font-medium">{pqrd.id}</TableCell>
                <TableCell>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-left"
                    onClick={() => handleAction('view', pqrd)}
                  >
                    {pqrd.subject}
                  </Button>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {typeLabels[pqrd.type as keyof typeof typeLabels]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      statusStyles[pqrd.status as keyof typeof statusStyles].class
                    }
                  >
                    {statusStyles[pqrd.status as keyof typeof statusStyles].label}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      priorityStyles[pqrd.priority as keyof typeof priorityStyles]
                        .class
                    }
                  >
                    {priorityStyles[pqrd.priority as keyof typeof priorityStyles]
                      .label}
                  </Badge>
                </TableCell>
                <TableCell>{pqrd.department}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(pqrd.deadline).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{pqrd.responses}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleAction('view', pqrd)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('edit', pqrd)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('documents', pqrd)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Documentos
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('workflow', pqrd)}>
                        <Workflow className="h-4 w-4 mr-2" />
                        Flujo de Trabajo
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('insights', pqrd)}>
                        <Brain className="h-4 w-4 mr-2" />
                        Ver Insights
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('history', pqrd)}>
                        <History className="h-4 w-4 mr-2" />
                        Historial
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('share', pqrd)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleAction('delete', pqrd)}
                        className="text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}