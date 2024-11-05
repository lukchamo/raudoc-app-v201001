import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  Clock,
  FileText,
  Users,
  Eye,
  Download,
  Share2,
  ChevronRight,
} from 'lucide-react';

interface DocumentSummaryProps {
  document: any; // Type this properly based on your document structure
}

export function DocumentSummary({ document }: DocumentSummaryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Información General</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Creado</span>
            </div>
            <span className="text-sm font-medium">
              {new Date(document.metadata.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Última modificación</span>
            </div>
            <span className="text-sm font-medium">
              {new Date(document.metadata.modifiedAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Páginas</span>
            </div>
            <span className="text-sm font-medium">{document.metadata.pages}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Autor</span>
            </div>
            <span className="text-sm font-medium">{document.metadata.author}</span>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Etiquetas</h4>
          <div className="flex flex-wrap gap-2">
            {document.metadata.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Actividad Reciente</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Vistas</span>
            </div>
            <span className="text-sm font-medium">{document.analytics.views}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Descargas</span>
            </div>
            <span className="text-sm font-medium">{document.analytics.downloads}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Share2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Compartido</span>
            </div>
            <span className="text-sm font-medium">{document.analytics.shares} veces</span>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Insights Destacados</h4>
          <div className="space-y-3">
            {document.insights.slice(0, 2).map((insight: any) => (
              <div
                key={insight.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <h5 className="font-medium text-sm">{insight.title}</h5>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}