import { useState } from 'react';
import { Calendar, Bell, Tag, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Insight {
  id: string;
  type: 'date' | 'alert' | 'tag';
  title: string;
  description: string;
  action?: string;
}

interface InsightsPreviewProps {
  insights: Insight[];
  onAction?: (insight: Insight) => void;
}

const iconMap = {
  date: Calendar,
  alert: Bell,
  tag: Tag,
};

export function InsightsPreview({ insights, onAction }: InsightsPreviewProps) {
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Insights Detectados
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const Icon = iconMap[insight.type];
          return (
            <div
              key={insight.id}
              className={`
                group flex items-center justify-between p-4 rounded-lg
                transition-colors cursor-pointer
                ${selectedInsight === insight.id ? 'bg-accent/10' : 'hover:bg-muted'}
              `}
              onClick={() => setSelectedInsight(insight.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>
                </div>
              </div>
              {insight.action && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onAction?.(insight)}
                >
                  <span className="mr-2">{insight.action}</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}