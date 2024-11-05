import { useState, useRef } from 'react';
import { Search, Filter, Brain, FileText, Calendar, Tag, AlertTriangle, X, History, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useClickAway } from '@/hooks/use-click-away';
import { SemanticSearchResults } from './semantic-search-results';
import { SearchFilters } from './search-filters';
import { useToast } from '@/hooks/use-toast';

interface SearchFilter {
  id: string;
  type: 'semantic' | 'date' | 'type' | 'status';
  value: string;
  label: string;
}

const SEMANTIC_SUGGESTIONS = [
  { value: 'vencimiento-proximo', label: 'Documentos próximos a vencer', category: 'dates' },
  { value: 'contratos-renovacion', label: 'Contratos que necesitan renovación', category: 'contracts' },
  { value: 'facturas-pendientes', label: 'Facturas pendientes de pago', category: 'invoices' },
  { value: 'documentos-importantes', label: 'Documentos marcados como importantes', category: 'priority' },
  { value: 'clausulas-confidencialidad', label: 'Cláusulas de confidencialidad', category: 'legal' },
  { value: 'requisitos-legales', label: 'Requisitos legales y regulatorios', category: 'legal' },
];

const RECENT_SEARCHES = [
  { query: 'contratos vencidos 2024', timestamp: '2024-03-15T10:00:00Z' },
  { query: 'facturas pendientes Q1', timestamp: '2024-03-14T15:30:00Z' },
];

const SAVED_SEARCHES = [
  { 
    name: 'Documentos Críticos',
    query: 'documentos importantes vencimiento próximo',
    filters: ['priority:high', 'status:active']
  },
  {
    name: 'Facturas por Pagar',
    query: 'facturas pendientes',
    filters: ['type:invoice', 'status:pending']
  }
];

export function SemanticSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentTab, setCurrentTab] = useState<'suggestions' | 'recent' | 'saved'>('suggestions');
  const searchRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useClickAway(searchRef, () => {
    setShowResults(false);
    setShowFilters(false);
  });

  const addFilter = (filter: SearchFilter) => {
    setFilters((prev) => {
      const filtered = prev.filter((f) => f.type !== filter.type);
      return [...filtered, filter];
    });
  };

  const removeFilter = (filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() || filters.length > 0) {
      setShowResults(true);
    }
  };

  const saveSearch = () => {
    toast({
      title: "Búsqueda guardada",
      description: "Tu búsqueda ha sido guardada y estará disponible en tu lista de búsquedas guardadas.",
    });
  };

  const handleSavedSearch = (search: typeof SAVED_SEARCHES[0]) => {
    setSearchTerm(search.query);
    setFilters(search.filters.map(filter => {
      const [type, value] = filter.split(':');
      return {
        id: `${type}-${value}`,
        type: type as SearchFilter['type'],
        value,
        label: `${type}: ${value}`,
      };
    }));
    setShowResults(true);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-3 flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              {searchTerm && (
                <Badge variant="secondary" className="bg-primary/10">
                  <Brain className="h-3 w-3 mr-1" />
                  <span className="text-xs">Búsqueda semántica</span>
                </Badge>
              )}
            </div>
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "pl-24 py-6 text-lg",
                searchTerm && "pr-20"
              )}
              placeholder="Buscar documentos usando lenguaje natural..."
            />
            {searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            type="button"
            variant="outline"
            className="space-x-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            {filters.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {filters.length}
              </Badge>
            )}
          </Button>
          <Button type="submit" className="space-x-2">
            <Brain className="h-4 w-4" />
            <span>Buscar</span>
          </Button>
          {(searchTerm || filters.length > 0) && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={saveSearch}
              className="text-yellow-500"
            >
              <Star className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className={cn(
                'pl-2 pr-1',
                filter.type === 'semantic' && 'bg-primary/10 text-primary'
              )}
            >
              {filter.label}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 hover:bg-transparent"
                onClick={() => removeFilter(filter.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Search Suggestions and History */}
      {searchTerm.length > 0 && !showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as typeof currentTab)}>
            <TabsList className="w-full">
              <TabsTrigger value="suggestions" className="flex-1">
                <Sparkles className="h-4 w-4 mr-2" />
                Sugerencias
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex-1">
                <History className="h-4 w-4 mr-2" />
                Recientes
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">
                <Star className="h-4 w-4 mr-2" />
                Guardadas
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[300px]">
              <TabsContent value="suggestions" className="p-4">
                <div className="grid gap-2">
                  {SEMANTIC_SUGGESTIONS
                    .filter(suggestion =>
                      suggestion.label.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((suggestion) => (
                      <Button
                        key={suggestion.value}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          addFilter({
                            id: `semantic-${suggestion.value}`,
                            type: 'semantic',
                            value: suggestion.value,
                            label: suggestion.label,
                          });
                          setShowResults(true);
                        }}
                      >
                        <Brain className="h-4 w-4 mr-2 text-primary" />
                        <div className="flex flex-col items-start">
                          <span>{suggestion.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {suggestion.category}
                          </span>
                        </div>
                      </Button>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="p-4">
                <div className="space-y-2">
                  {RECENT_SEARCHES.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => {
                        setSearchTerm(search.query);
                        setShowResults(true);
                      }}
                    >
                      <History className="h-4 w-4 mr-2" />
                      <div className="flex flex-col items-start">
                        <span>{search.query}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(search.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="saved" className="p-4">
                <div className="space-y-2">
                  {SAVED_SEARCHES.map((search, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => handleSavedSearch(search)}
                    >
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <div className="flex flex-col items-start">
                        <span>{search.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {search.query}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {search.filters.map((filter, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {filter}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </Card>
      )}

      {/* Search Filters */}
      {showFilters && (
        <SearchFilters
          onFilterSelect={addFilter}
          activeFilters={filters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Search Results */}
      {showResults && (
        <SemanticSearchResults
          query={searchTerm}
          filters={filters}
          onClose={() => setShowResults(false)}
        />
      )}
    </div>
  );
}