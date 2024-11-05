import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SearchFilter {
  id: string;
  type: 'semantic' | 'date' | 'type' | 'status';
  value: string;
  label: string;
}

const SEMANTIC_SUGGESTIONS = [
  { value: 'vencimiento-proximo', label: 'Documentos próximos a vencer' },
  { value: 'contratos-renovacion', label: 'Contratos que necesitan renovación' },
  { value: 'facturas-pendientes', label: 'Facturas pendientes de pago' },
  { value: 'documentos-importantes', label: 'Documentos marcados como importantes' },
];

const TYPE_FILTERS = [
  { value: 'contract', label: 'Contratos' },
  { value: 'invoice', label: 'Facturas' },
  { value: 'report', label: 'Informes' },
  { value: 'proposal', label: 'Propuestas' },
];

const STATUS_FILTERS = [
  { value: 'active', label: 'Activo' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'expired', label: 'Vencido' },
  { value: 'archived', label: 'Archivado' },
];

const DATE_FILTERS = [
  { value: 'last-7-days', label: 'Últimos 7 días' },
  { value: 'last-30-days', label: 'Últimos 30 días' },
  { value: 'last-90-days', label: 'Últimos 90 días' },
  { value: 'this-year', label: 'Este año' },
];

export function AdvancedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [openFilter, setOpenFilter] = useState(false);

  const addFilter = (filter: SearchFilter) => {
    setFilters((prev) => {
      // Remove existing filter of the same type if it exists
      const filtered = prev.filter((f) => f.type !== filter.type);
      return [...filtered, filter];
    });
    setOpenFilter(false);
  };

  const removeFilter = (filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-input pl-9 pr-4 py-2 text-sm"
          />
        </div>
        <Popover open={openFilter} onOpenChange={setOpenFilter}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Buscar filtros..." />
              <CommandList>
                <CommandEmpty>No se encontraron filtros.</CommandEmpty>
                <CommandGroup heading="Búsqueda Semántica">
                  {SEMANTIC_SUGGESTIONS.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() =>
                        addFilter({
                          id: `semantic-${item.value}`,
                          type: 'semantic',
                          value: item.value,
                          label: item.label,
                        })
                      }
                    >
                      <Search className="mr-2 h-4 w-4" />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Tipo de Documento">
                  {TYPE_FILTERS.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() =>
                        addFilter({
                          id: `type-${item.value}`,
                          type: 'type',
                          value: item.value,
                          label: item.label,
                        })
                      }
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Estado">
                  {STATUS_FILTERS.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() =>
                        addFilter({
                          id: `status-${item.value}`,
                          type: 'status',
                          value: item.value,
                          label: item.label,
                        })
                      }
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandGroup heading="Fecha">
                  {DATE_FILTERS.map((item) => (
                    <CommandItem
                      key={item.value}
                      onSelect={() =>
                        addFilter({
                          id: `date-${item.value}`,
                          type: 'date',
                          value: item.value,
                          label: item.label,
                        })
                      }
                    >
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
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
              onClick={() => setFilters([])}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}
    </div>
  );
}