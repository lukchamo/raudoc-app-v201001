import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  Download,
  Share2,
  FileText,
} from 'lucide-react';
import { useState } from 'react';

interface DocumentPreviewModalProps {
  document: {
    id: string;
    name: string;
    type: string;
    previewUrl?: string;
  };
  onClose: () => void;
  open: boolean;
}

export function DocumentPreviewModal({ document, onClose, open }: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // This would come from the actual document

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage((prev) => {
      if (direction === 'prev') {
        return Math.max(1, prev - 1);
      }
      return Math.min(totalPages, prev + 1);
    });
  };

  // Mock document content for preview
  const renderDocumentContent = () => (
    <div className="w-[595px] h-[842px] bg-white shadow-lg rounded-lg">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">{document.name}</h2>
          </div>
          <Badge variant="outline">{document.type}</Badge>
        </div>

        <div className="space-y-4 opacity-50">
          <h3 className="text-lg font-semibold">Vista Previa Limitada</h3>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <div className="text-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
            <Lock className="h-12 w-12 text-primary mx-auto" />
            <div className="space-y-2">
              <h3 className="font-medium">Vista previa limitada</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Crea una cuenta gratuita para ver el documento completo y
                acceder a todas las funcionalidades
              </p>
            </div>
            <Button className="mt-4 space-x-2">
              <Eye className="h-4 w-4" />
              <span>Ver documento completo</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <DialogTitle>{document.name}</DialogTitle>
              <Badge variant="outline">{document.type}</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en el documento..."
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Preview Controls */}
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
              disabled={currentPage === 1}
              onClick={() => handlePageChange('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Document Preview */}
        <div className="flex-1 bg-muted rounded-lg overflow-hidden p-4">
          <div
            className="h-full flex items-center justify-center"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            {document.previewUrl ? (
              <img
                src={document.previewUrl}
                alt="Document preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              renderDocumentContent()
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}