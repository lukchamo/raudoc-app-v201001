import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentViewerModalProps {
  documentId: string;
  documentName: string;
  onClose: () => void;
}

export function DocumentViewerModal({
  documentId,
  documentName,
  onClose,
}: DocumentViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // This would come from the actual document

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <Dialog open onOpenChange={onClose} className="max-w-7xl">
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{documentName}</DialogTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en el documento..."
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-y py-2">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="w-16 text-center text-sm">{zoom}%</span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-auto bg-muted rounded-lg">
          <div
            className="min-h-full w-full flex items-center justify-center p-8"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            {/* This would be replaced with actual document content */}
            <div className="w-[595px] h-[842px] bg-white shadow-lg rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">
                Vista previa del documento
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}