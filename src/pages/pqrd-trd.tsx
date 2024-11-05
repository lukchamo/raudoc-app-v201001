import { TRDViewer } from '@/components/pqrd/trd/trd-viewer';

export function PQRDTRDPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tabla de Retención Documental
        </h1>
        <p className="text-muted-foreground mt-2">
          Gestione la retención y disposición de documentos PQRD
        </p>
      </div>

      <TRDViewer />
    </div>
  );
}