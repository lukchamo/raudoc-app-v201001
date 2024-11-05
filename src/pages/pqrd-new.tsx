import { PQRDForm } from '@/components/pqrd/pqrd-form';

export function PQRDNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nueva PQRD</h1>
        <p className="text-muted-foreground mt-2">
          Radique una nueva Petición, Queja, Reclamo o Denuncia
        </p>
      </div>

      <PQRDForm onSubmit={() => window.history.back()} />
    </div>
  );
}