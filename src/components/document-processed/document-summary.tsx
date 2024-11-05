import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Tag, AlertTriangle } from 'lucide-react';

interface DocumentSummaryProps {
  document: {
    id: string;
    name: string;
    type: string;
    receivedAt: string;
    summary?: {
      type: string;
      category: string;
      language: string;
      pageCount: number;
      wordCount: number;
      keyTopics: string[];
    };
  };
}

export function DocumentSummary({ document }: DocumentSummaryProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Resumen del Documento</h3>
          <Badge variant="secondary" className="space-x-1">
            <FileText className="h-3 w-3" />
            <span>AI Summary</span>
          </Badge>
        </div>

        {document.summary ? (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Información General
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Tipo</span>
                    <span className="text-sm font-medium">{document.summary.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Categoría</span>
                    <span className="text-sm font-medium">{document.summary.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Idioma</span>
                    <span className="text-sm font-medium">{document.summary.language}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Estadísticas
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Páginas</span>
                    <span className="text-sm font-medium">{document.summary.pageCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Palabras</span>
                    <span className="text-sm font-medium">{document.summary.wordCount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Temas Principales
              </h4>
              <div className="flex flex-wrap gap-2">
                {document.summary.keyTopics.map((topic, index) => (
                  <Badge key={index} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Crea una cuenta para ver el resumen completo del documento
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}