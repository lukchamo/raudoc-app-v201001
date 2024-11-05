import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Tag, ChevronRight, Brain } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Insight {
  id: string;
  type: 'date' | 'alert' | 'tag';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  details?: {
    context: string;
    recommendations: string[];
    relatedContent?: string;
  };
}

interface InsightDetailsModalProps {
  insight: Insight | null;
  onClose: () => void;
}

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

const typeIcons = {
  date: Calendar,
  alert: AlertTriangle,
  tag: Tag,
};

export function InsightDetailsModal({ insight, onClose }: InsightDetailsModalProps) {
  if (!insight) return null;

  const Icon = typeIcons[insight.type];

  return (
    <Dialog open={Boolean(insight)} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>{insight.title}</DialogTitle>
              <DialogDescription>Insight detectado por IA</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{insight.type}</Badge>
            <Badge
              variant="secondary"
              className={priorityStyles[insight.priority]}
            >
              {insight.priority}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Descripción</h4>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>

            {insight.details && (
              <>
                <div>
                  <h4 className="font-medium mb-2">Contexto</h4>
                  <p className="text-sm text-muted-foreground">
                    {insight.details.context}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recomendaciones</h4>
                  <div className="space-y-2">
                    {insight.details.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 text-sm"
                      >
                        <ChevronRight className="h-4 w-4 text-primary mt-0.5" />
                        <span className="text-muted-foreground">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {insight.details.relatedContent && (
                  <Card className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Contenido Relacionado</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.details.relatedContent}
                    </p>
                  </Card>
                )}
              </>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}