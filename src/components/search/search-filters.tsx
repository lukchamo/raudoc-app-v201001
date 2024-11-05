import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, AlertCircle, Clock, FileText } from 'lucide-react';

interface SearchFilter {
  id: string;
  type: 'semantic' | 'date' | 'type' | 'status';
  value: string;
  label: string;
}

interface SearchFiltersProps {
  onFilterSelect: (filter: SearchFilter) => void;
  activeFilters: SearchFilter[];
  onClose: () => void;
}

const FILTER_GROUPS = [
  {
    id: 'type',
    title: 'Tipo de Documento',
    icon: FileText,
    filters: [
      { value: 'contract', label: 'Contratos' },
      { value: 'invoice', label: 'Facturas' },
      { value: 'report', label: 'Informes' },
      { value: 'legal', label: 'Documentos Legales' },
    ],
  },
  {
    id: 'status',
    title: 'Estado',
    icon: AlertCircle,
    filters: [
      { value: 'active', label: 'Activo' },
      { value: 'expired', label: 'Vencido' },
      { value: 'pending', label: 'Pendiente' },
      { value: 'archived', label: 'Archivado' },
    ],
  },
  {
    id: 'date',
    title: 'Fecha',
    icon: Calendar,
    filters: [
      { value: 'last-7-days', label: 'Últimos 7 días' },
      { value: 'last-30-days', label: 'Últimos 30 días' },
      { value: 'last-90-days', label: 'Últimos 90 días' },
      { value: 'this-year', label: 'Este año' },
    ],
  },
];

export function SearchFilters({ onFilterSelect, activeFilters, onClose }: SearchFiltersProps) {
  const isFilterActive = (groupId: string, value: string) => {
    return activeFilters.some(
      (filter) => filter.type === groupId && filter.value === value
    );
  };

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-50">
      <CardHeader>
        <CardTitle>Filtros de Búsqueda</CardTitle>
        <CardDescription>
          Refina tu búsqueda aplicando filtros específicos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {FILTER_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.id}>
                <div className="flex items-center space-x-2 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">{group.title}</h3>
                </div>
                <div className="space-y-2">
                  {group.filters.map((filter) => {
                    const active = isFilterActive(group.id, filter.value);
                    return (
                      <Button
                        key={filter.value}
                        variant={active ? 'default' : 'outline'}
                        className="w-full justify-start"
                        onClick={() =>
                          onFilterSelect({
                            id: `${group.id}-${filter.value}`,
                            type: group.id as SearchFilter['type'],
                            value: filter.value,
                            label: filter.label,
                          })
                        }
                      >
                        <span>{filter.label}</span>
                        {active && (
                          <Badge variant="secondary" className="ml-auto">
                            Activo
                          </Badge>
                        )}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}