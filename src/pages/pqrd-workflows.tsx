import { WorkflowViewer } from '@/components/pqrd/workflow/workflow-viewer';

export function PQRDWorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Flujos de Trabajo PQRD
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure y gestione flujos de trabajo automatizados para PQRD
        </p>
      </div>

      <WorkflowViewer />
    </div>
  );
}