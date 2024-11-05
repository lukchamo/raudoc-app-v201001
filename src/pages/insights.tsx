import { InsightsDashboard } from '@/components/insights/insights-dashboard';

export function InsightsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Análisis de Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Descubre patrones y datos relevantes en tus documentos
        </p>
      </div>

      <InsightsDashboard />
    </div>
  );
}