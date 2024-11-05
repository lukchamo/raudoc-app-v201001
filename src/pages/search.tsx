import { SemanticSearch } from '@/components/search/semantic-search';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, History, Star, Filter } from 'lucide-react';

const RECENT_SEARCHES = [
  {
    query: 'contratos vencidos en los próximos 30 días',
    timestamp: '2024-03-15T10:00:00Z',
    results: 12,
  },
  {
    query: 'facturas pendientes de pago',
    timestamp: '2024-03-14T15:30:00Z',
    results: 8,
  },
  {
    query: 'documentos con cláusulas de confidencialidad',
    timestamp: '2024-03-14T09:45:00Z',
    results: 15,
  },
];

const SAVED_SEARCHES = [
  {
    name: 'Documentos por Vencer',
    query: 'vencimiento próximo',
    filters: ['type:contract', 'status:active'],
  },
  {
    name: 'Facturas Pendientes',
    query: 'facturas sin pagar',
    filters: ['type:invoice', 'status:pending'],
  },
  {
    name: 'Contratos Importantes',
    query: 'contratos con alta prioridad',
    filters: ['type:contract', 'priority:high'],
  },
];

export function SearchPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Búsqueda Avanzada</h1>
        <p className="text-muted-foreground mt-2">
          Encuentra documentos usando búsqueda semántica y filtros avanzados
        </p>
      </div>

      <SemanticSearch />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Searches */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <History className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Búsquedas Recientes</h2>
          </div>
          <div className="space-y-4">
            {RECENT_SEARCHES.map((search, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium">{search.query}</p>
                  <div className="flex items-center space-x-2 mt-1 text-sm text-muted-foreground">
                    <span>{new Date(search.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span>{search.results} resultados</span>
                  </div>
                </div>
                <Brain className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </Card>

        {/* Saved Searches */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Búsquedas Guardadas</h2>
          </div>
          <div className="space-y-4">
            {SAVED_SEARCHES.map((search, index) => (
              <div
                key={index}
                className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium">{search.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {search.query}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {search.filters.map((filter, i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded"
                      >
                        <Filter className="h-3 w-3" />
                        <span>{filter}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Brain className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}