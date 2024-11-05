import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, Tag, ChevronRight } from 'lucide-react';

interface Insight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: string;
}

interface DocumentInsightsProps {
  insights: Insight[];
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

export function DocumentInsights({ insights }: DocumentInsightsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {insights.map((insight) => {
        const Icon = typeIcons[insight.type as keyof typeof typeIcons] || Tag;
        return (
          <Card key={insight.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {insight.type}
                </Badge>
              </div>
              <Badge
                variant="secondary"
                className={priorityStyles[insight.priority as keyof typeof priorityStyles]}
              >
                {insight.priority}
              </Badge>
            </div>
            <h4 className="font-medium mb-1">{insight.title}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {insight.description}
            </p>
            <Button variant="outline" size="sm" className="w-full space-x-2">
              <span>Ver detalles</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Card>
        );
      })}
    </div>
  );
}