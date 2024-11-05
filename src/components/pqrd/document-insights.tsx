import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, AlertTriangle, Calendar, Tag, ChevronRight } from 'lucide-react';

interface DocumentInsight {
  id: string;
  type: 'date' | 'alert' | 'tag';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  confidence: number;
}

interface DocumentInsightsProps {
  insights: DocumentInsight[];
  onInsightAction?: (insight: DocumentInsight) => void;
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

export function DocumentInsights({ insights, onInsightAction }: DocumentInsightsProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Insights Detectados</h3>
          <Badge variant="secondary">
            {insights.length} hallazgos
          </Badge>
        </div>

        <div className="space-y-4">
          {insights.map((insight) => {
            const Icon = typeIcons[insight.type];
            return (
              <div
                key={insight.id}
                className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <Badge
                        variant="secondary"
                        className={priorityStyles[insight.priority]}
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">
                        Fuente: {insight.source}
                      </span>
                      <span>•</span>
                      <Badge variant="outline">
                        {(insight.confidence * 100).toFixed(0)}% confianza
                      </Badge>
                    </div>
                  </div>
                </div>
                {onInsightAction && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onInsightAction(insight)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}