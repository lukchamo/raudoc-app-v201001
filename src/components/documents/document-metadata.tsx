import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  FileText,
  User,
  Tag,
  Clock,
  Info,
} from 'lucide-react';

interface DocumentMetadataProps {
  metadata: {
    author: string;
    version: string;
    pages: number;
    createdAt: string;
    modifiedAt: string;
    category: string;
    tags: string[];
  };
}

export function DocumentMetadata({ metadata }: DocumentMetadataProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Información General</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Autor</span>
            </div>
            <span className="text-sm font-medium">{metadata.author}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Versión</span>
            </div>
            <span className="text-sm font-medium">{metadata.version}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Páginas</span>
            </div>
            <span className="text-sm font-medium">{metadata.pages}</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium mb-4">Fechas</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Creado</span>
              </div>
              <span className="text-sm font-medium">
                {new Date(metadata.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Modificado</span>
              </div>
              <span className="text-sm font-medium">
                {new Date(metadata.modifiedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Clasificación</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Categoría</h4>
            </div>
            <Badge variant="secondary" className="text-sm">
              {metadata.category}
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Etiquetas</h4>
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t">
            <h4 className="text-sm font-medium mb-4">Propiedades Adicionales</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Tipo de Archivo</span>
                <p className="text-sm text-muted-foreground">PDF</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Tamaño</span>
                <p className="text-sm text-muted-foreground">2.5 MB</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Idioma</span>
                <p className="text-sm text-muted-foreground">Español</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium">Estado</span>
                <p className="text-sm text-muted-foreground">Activo</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}