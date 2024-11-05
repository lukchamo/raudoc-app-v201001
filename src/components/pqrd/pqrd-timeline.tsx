import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  UserPlus,
  MessageSquare,
  Brain,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
  details?: Record<string, any>;
}

interface PQRDTimelineProps {
  events: TimelineEvent[];
}

const eventIcons = {
  created: FileText,
  assigned: UserPlus,
  response: MessageSquare,
  document_added: Brain,
  alert: AlertTriangle,
  resolved: CheckCircle,
};

const eventStyles = {
  created: 'bg-blue-100 text-blue-800',
  assigned: 'bg-purple-100 text-purple-800',
  response: 'bg-green-100 text-green-800',
  document_added: 'bg-yellow-100 text-yellow-800',
  alert: 'bg-red-100 text-red-800',
  resolved: 'bg-green-100 text-green-800',
};

export function PQRDTimeline({ events }: PQRDTimelineProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="font-semibold">Historial de la PQRD</h3>

        <div className="space-y-6">
          {events.map((event, index) => {
            const Icon = eventIcons[event.type as keyof typeof eventIcons] || FileText;
            return (
              <div key={event.id} className="flex items-start space-x-4">
                <div className="min-w-24 pt-1">
                  <span className="text-sm text-muted-foreground">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-full ${eventStyles[event.type as keyof typeof eventStyles]}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Por: {event.user}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {event.type}
                    </Badge>
                  </div>

                  {event.details && (
                    <div className="mt-2 pl-8">
                      {Object.entries(event.details).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}