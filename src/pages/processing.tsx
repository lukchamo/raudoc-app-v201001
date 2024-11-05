import { useState } from 'react';
import { ProcessingView } from '@/components/processing/processing-view';
import { InsightsPreview } from '@/components/processing/insights-preview';

const MOCK_INSIGHTS = [
  {
    id: '1',
    type: 'date',
    title: 'Fecha de vencimiento',
    description: 'El contrato vence el 15 de abril de 2024',
    action: 'Agendar recordatorio',
  },
  {
    id: '2',
    type: 'alert',
    title: 'Cláusula importante',
    description: 'Se requiere notificación con 30 días de anticipación',
    action: 'Ver detalles',
  },
  {
    id: '3',
    type: 'tag',
    title: 'Tipo de documento',
    description: 'Contrato de servicios profesionales',
  },
] as const;

export function ProcessingPage() {
  const [processingComplete, setProcessingComplete] = useState(false);

  const handleProcessingComplete = () => {
    setProcessingComplete(true);
  };

  const handleInsightAction = (insight: typeof MOCK_INSIGHTS[number]) => {
    console.log('Acción para insight:', insight);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Procesando Documento
        </h1>
        <p className="text-muted-foreground mt-2">
          Convirtiendo tu documento en un activo inteligente
        </p>
      </div>

      <ProcessingView
        fileName="Contrato de Servicios 2024.pdf"
        fileSize="2.5 MB"
        onComplete={handleProcessingComplete}
      />

      {processingComplete && (
        <InsightsPreview
          insights={MOCK_INSIGHTS}
          onAction={handleInsightAction}
        />
      )}
    </div>
  );
}