import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, FileText, Video, MessageCircle, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  category: 'guide' | 'faq' | 'tutorial' | 'article';
  relevance: number;
  badge?: string;
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Cómo procesar documentos con IA',
    excerpt: 'Guía completa sobre el procesamiento de documentos usando nuestra tecnología de IA...',
    category: 'guide',
    relevance: 0.95,
    badge: 'Popular',
  },
  {
    id: '2',
    title: '¿Qué tipos de documentos puedo procesar?',
    excerpt: 'Lista completa de formatos soportados y recomendaciones de uso...',
    category: 'faq',
    relevance: 0.88,
  },
  {
    id: '3',
    title: 'Tutorial: Procesamiento Avanzado',
    excerpt: 'Aprende las técnicas avanzadas de procesamiento de documentos...',
    category: 'tutorial',
    relevance: 0.85,
    badge: 'Nuevo',
  },
  {
    id: '4',
    title: 'Mejores prácticas de procesamiento',
    excerpt: 'Recomendaciones y consejos para optimizar el procesamiento...',
    category: 'article',
    relevance: 0.82,
  },
];

const categoryIcons = {
  guide: Book,
  faq: MessageCircle,
  tutorial: Video,
  article: FileText,
};

const categoryLabels = {
  guide: 'Guía',
  faq: 'FAQ',
  tutorial: 'Tutorial',
  article: 'Artículo',
};

export function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = MOCK_RESULTS.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 300);
  }, [query]);

  if (query.length < 2) {
    return null;
  }

  if (loading) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 p-4">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 p-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            No se encontraron resultados para "{query}"
          </p>
          <Button variant="outline" onClick={() => window.location.href = '/help/contact'}>
            Contactar Soporte
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50">
      <ScrollArea className="max-h-[500px]">
        <div className="p-4 space-y-4">
          {results.map((result) => {
            const Icon = categoryIcons[result.category];
            return (
              <div
                key={result.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{result.title}</h4>
                        {result.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {result.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {categoryLabels[result.category]}
                        </Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs ml-1">
                            {(result.relevance * 100).toFixed(0)}% relevante
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.excerpt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}