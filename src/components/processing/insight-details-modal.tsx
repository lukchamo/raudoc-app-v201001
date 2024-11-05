import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle, Tag, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface InsightDetailsModalProps {
  insight: {
    id: string;
    type: string;
    category: string;
    title: string;
    description: string;
    priority: string;
    action?: string;
    icon: any;
    details?: {
      context: string;
      location: string;
      recommendations: string[];
      relatedInsights?: Array<{
        title: string;
        description: string;
      }>;
    };
  } | null;
  onClose: () => void;
}

const priorityStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export function InsightDetailsModal({ insight, onClose }: InsightDetailsModalProps) {
  if (!insight) return null;

  const Icon = insight.icon;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>{insight.title}</DialogTitle>
              <DialogDescription>{insight.category}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Badges */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{insight.type}</Badge>
            <Badge
              variant="secondary"
              className={priorityStyles[insight.priority as keyof typeof priorityStyles]}
            >
              {insight.priority}
            </Badge>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Descripción</h4>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </div>

            {insight.details && (
              <>
                <div>
                  <h4 className="font-medium mb-2">Contexto</h4>
                  <p className="text-sm text-muted-foreground">{insight.details.context}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Ubicación en el Documento</h4>
                  <p className="text-sm text-muted-foreground">{insight.details.location}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recomendaciones</h4>
                  <ul className="space-y-2">
                    {insight.details.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {insight.details.relatedInsights && (
                  <div>
                    <h4 className="font-medium mb-2">Insights Relacionados</h4>
                    <div className="space-y-2">
                      {insight.details.relatedInsights.map((related, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <h5 className="font-medium mb-1">{related.title}</h5>
                            <p className="text-sm text-muted-foreground">
                              {related.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
            {insight.action && (
              <Button className="space-x-2">
                <span>{insight.action}</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}