import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Brain, Workflow } from 'lucide-react';

interface HistoryEntry {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  user: string;
}

interface DocumentHistoryProps {
  history: HistoryEntry[];
}

const actionIcons = {
  created: FileText,
  uploaded: Upload,
  processed: Brain,
  automated: Workflow,
};

export function DocumentHistory({ history }: DocumentHistoryProps) {
  return (
    <div className="space-y-4">
      {history.map((entry) => {
        const Icon = actionIcons[entry.action as keyof typeof actionIcons] || FileText;
        return (
          <div
            key={entry.id}
            className="flex items-start space-x-4"
          >
            <div className="min-w-24 pt-1">
              <span className="text-sm text-muted-foreground">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="flex-1 flex items-start space-x-4 rounded-lg border p-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{entry.description}</h4>
                  <Badge variant="secondary">
                    {entry.action}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Por: {entry.user}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}