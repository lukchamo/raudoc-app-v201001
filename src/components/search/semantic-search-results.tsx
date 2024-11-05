import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Brain,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Star,
  Clock,
  Tag,
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
  relevance: number;
  insights: Array<{
    type: 'date' | 'alert' | 'tag';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  matchedContent?: {
    text: string;
    confidence: number;
  };
}

interface SearchFilter {
  id: string;
  type: 'semantic' | 'date' | 'type' | 'status';
  value: string;
  label: string;
}

interface SemanticSearchResultsProps {
  query: string;
  filters: SearchFilter[];
  onClose: () => void;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Contrato de Servicios 2024',
    type: 'contract',
    status: 'active',
    date: '2024-03-15',
    relevance: 0.95,
    insights: [
      {
        type: 'date',
        title: 'Fecha de Vencimiento',
        description: 'Vence en 30 días',
        priority: 'high',
      },
      {
        type: 'alert',
        title: 'Cláusula de Renovación',
        description: 'Requiere notificación previa',
        priority: 'medium',
      },
    ],
    matchedContent: {
      text: '...requiere renovación automática con notificación previa de 60 días...',
      confidence: 0.92,
    },
  },
  {
    id: '2',
    title: 'Factura Proveedores Q1',
    type: 'invoice',
    status: 'pending',
    date: '2024-03-10',
    relevance: 0.85,
    insights: [
      {
        type: 'date',
        title: 'Fecha de Pago',
        description: 'Vence en 15 días',
        priority: 'medium',
      },
    ],
  },
];

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  expired: 'bg-red-100 text-red-800',
  archived: 'bg-gray-100 text-gray-800',
};

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export function SemanticSearchResults({
  query,
  filters,
  onClose,
}: SemanticSearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate API call with delay
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setLoading(false);
    }, 1000);
  }, [query, filters]);

  if (loading) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 z-50">
        <div className="p-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
            <span className="text-lg font-medium">Analizando documentos...</span>
          </div>
          <Progress value={45} className="w-64 mx-auto" />
        </div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 z-50">
        <div className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">
            No se encontraron resultados para tu búsqueda
          </p>
          <Button variant="outline" onClick={onClose}>
            Modificar búsqueda
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50">
      <ScrollArea className="max-h-[600px]">
        <div className="p-4 space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">{result.title}</h3>
                    <Badge
                      variant="secondary"
                      className={statusStyles[result.status as keyof typeof statusStyles]}
                    >
                      {result.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{result.date}</span>
                    <span>•</span>
                    <Tag className="h-4 w-4" />
                    <span>{result.type}</span>
                    <span>•</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{(result.relevance * 100).toFixed(0)}% relevante</span>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Matched Content */}
              {result.matchedContent && (
                <div className="mt-4 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Contenido coincidente</span>
                    <Badge variant="secondary" className="text-xs">
                      {(result.matchedContent.confidence * 100).toFixed(0)}% confianza
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.matchedContent.text}
                  </p>
                </div>
              )}

              {/* Insights */}
              {result.insights.length > 0 && (
                <div className="mt-4 grid gap-2">
                  {result.insights.map((insight, index) => {
                    const Icon = insight.type === 'date' ? Calendar :
                               insight.type === 'alert' ? AlertTriangle : Tag;
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-sm p-2 rounded-lg bg-muted/50"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="font-medium">{insight.title}:</span>
                        <span className="text-muted-foreground">
                          {insight.description}
                        </span>
                        <Badge
                          variant="secondary"
                          className={priorityStyles[insight.priority]}
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}