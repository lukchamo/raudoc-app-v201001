import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface DocumentFiltersProps {
  selectedFilters: {
    type: string[];
    status: string[];
    date: string;
  };
  onFilterChange: (filters: any) => void;
}

const documentTypes = [
  { value: 'contract', label: 'Contratos' },
  { value: 'invoice', label: 'Facturas' },
  { value: 'report', label: 'Informes' },
  { value: 'other', label: 'Otros' },
];

const statusOptions = [
  { value: 'processed', label: 'Procesado' },
  { value: 'processing', label: 'En Proceso' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'error', label: 'Error' },
];

const dateRanges = [
  { value: 'all', label: 'Todo' },
  { value: 'today', label: 'Hoy' },
  { value: 'week', label: 'Esta Semana' },
  { value: 'month', label: 'Este Mes' },
  { value: 'year', label: 'Este Año' },
];

export function DocumentFilters({
  selectedFilters,
  onFilterChange,
}: DocumentFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-8"
              onChange={(e) =>
                onFilterChange({ ...selectedFilters, search: e.target.value })
              }
            />
          </div>
        </div>
        <Select
          value={selectedFilters.date}
          onValueChange={(value) =>
            onFilterChange({ ...selectedFilters, date: value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Fecha" />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedFilters.type.map((type) => (
          <Badge
            key={type}
            variant="secondary"
            className="cursor-pointer"
            onClick={() =>
              onFilterChange({
                ...selectedFilters,
                type: selectedFilters.type.filter((t) => t !== type),
              })
            }
          >
            {documentTypes.find((t) => t.value === type)?.label}
            <span className="ml-1">×</span>
          </Badge>
        ))}
        {selectedFilters.status.map((status) => (
          <Badge
            key={status}
            variant="secondary"
            className="cursor-pointer"
            onClick={() =>
              onFilterChange({
                ...selectedFilters,
                status: selectedFilters.status.filter((s) => s !== status),
              })
            }
          >
            {statusOptions.find((s) => s.value === status)?.label}
            <span className="ml-1">×</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}