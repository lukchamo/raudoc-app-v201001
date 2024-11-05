import { PQRDTracker } from '@/components/pqrd/pqrd-tracker';

export function PQRDTrackPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seguimiento PQRD</h1>
        <p className="text-muted-foreground mt-2">
          Consulte el estado de su PQRD
        </p>
      </div>

      <PQRDTracker />
    </div>
  );
}