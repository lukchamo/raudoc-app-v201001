import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Brain,
  Search,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
} from 'lucide-react';

interface SmartDocumentViewerProps {
  documentId: string;
  documentName: string;
  insights: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    position: { x: number; y: number; width: number; height: number };
  }>;
}

export function SmartDocumentViewer({
  documentId,
  documentName,
  insights,
}: SmartDocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [showInsights, setShowInsights] = useState(true);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-full bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{documentName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">PDF</Badge>
                <Badge variant="secondary" className="space-x-1">
                  <Brain className="h-3 w-3" />
                  <span>Procesado con IA</span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

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
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar en el documento..."
                className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowInsights(!showInsights)}
              className="space-x-2"
            >
              <Brain className="h-4 w-4" />
              <span>Insights</span>
            </Button>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="relative h-[600px] bg-muted rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 0.2s ease-in-out',
            }}
          >
            {/* Document Content */}
            <div className="relative w-[595px] h-[842px] bg-white shadow-lg">
              {showInsights &&
                insights.map((insight) => (
                  <div
                    key={insight.id}
                    className="absolute border-2 border-primary/50 bg-primary/10 rounded cursor-pointer hover:bg-primary/20 transition-colors"
                    style={{
                      left: `${insight.position.x}%`,
                      top: `${insight.position.y}%`,
                      width: `${insight.position.width}%`,
                      height: `${insight.position.height}%`,
                    }}
                  >
                    <Badge
                      className="absolute -top-2 -right-2 z-10"
                      variant="secondary"
                    >
                      {insight.type}
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Processing Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Procesamiento con IA</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
    </Card>
  );
}