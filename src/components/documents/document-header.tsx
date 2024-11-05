import { FileText, Share2, Download, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DocumentHeaderProps {
  document: {
    name: string;
    type: string;
    status: string;
  };
  onShare: () => void;
  onDelete: () => void;
}

export function DocumentHeader({ document, onShare, onDelete }: DocumentHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{document.name}</h1>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="outline">{document.type}</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {document.status}
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Compartir
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar
        </Button>
        <Button variant="destructive" size="icon" onClick={onDelete}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}