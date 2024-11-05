import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface DocumentViewerProps {
  documentId: string;
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
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
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
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

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en el documento..."
              className="pl-8 w-64"
            />
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
      </div>

      {/* Document Viewer */}
      <div className="relative h-[calc(100vh-300px)] bg-muted rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center p-8"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          {/* Aquí iría el contenido real del documento */}
          <div className="relative w-[595px] h-[842px] bg-white shadow-lg rounded-lg">
            {/* Contenido de ejemplo */}
            <div className="absolute inset-0 p-8 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Contrato de Servicios</h2>
                </div>
                <span className="text-sm text-muted-foreground">Página {currentPage}</span>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">1. Objeto del Contrato</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                
                <h3 className="text-lg font-semibold">2. Términos y Condiciones</h3>
                <p className="text-sm text-muted-foreground">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h3 className="text-lg font-semibold">3. Vigencia</h3>
                <p className="text-sm text-muted-foreground">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}