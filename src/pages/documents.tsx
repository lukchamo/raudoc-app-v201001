import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentsTable } from '@/components/documents/documents-table';
import { DocumentFilters } from '@/components/documents/document-filters';
import { DocumentStats } from '@/components/documents/document-stats';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function DocumentsPage() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    status: [],
    date: 'all',
  });

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mis Documentos</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona y organiza todos tus documentos inteligentes
          </p>
        </div>
        <Button onClick={handleUploadClick} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Subir Documento</span>
        </Button>
      </div>

      <DocumentStats />
      
      <div className="flex flex-col space-y-6">
        <DocumentFilters
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />
        <DocumentsTable filters={selectedFilters} />
      </div>
    </div>
  );
}