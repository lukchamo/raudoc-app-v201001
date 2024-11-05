import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Download,
  Share2,
  Printer,
  Copy,
  MoreVertical,
  Trash,
} from 'lucide-react';

export function DocumentActions() {
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" className="space-x-2">
        <Download className="h-4 w-4" />
        <span>Descargar</span>
      </Button>
      <Button variant="outline" className="space-x-2">
        <Share2 className="h-4 w-4" />
        <span>Compartir</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Duplicar
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash className="mr-2 h-4 w-4" />
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}