import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_RECENT_DOCS } from '@/lib/constants';

const statusIcons = {
  processed: CheckCircle,
  processing: Clock,
  pending: AlertCircle,
};

const statusStyles = {
  processed: 'text-green-500',
  processing: 'text-blue-500',
  pending: 'text-yellow-500',
};

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Documentos Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_RECENT_DOCS.map((doc) => {
            const StatusIcon = statusIcons[doc.status as keyof typeof statusIcons];
            return (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(doc.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {doc.insights > 0 && (
                    <span className="text-sm font-medium">
                      {doc.insights} insights
                    </span>
                  )}
                  <StatusIcon
                    className={cn(
                      'h-5 w-5',
                      statusStyles[doc.status as keyof typeof statusStyles]
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}