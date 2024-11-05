import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Eye, Download, Share2, Clock } from 'lucide-react';

interface DocumentAnalyticsProps {
  analytics: {
    views: number;
    downloads: number;
    shares: number;
    lastAccessed: string;
    accessHistory: Array<{
      date: string;
      views: number;
    }>;
  };
}

export function DocumentAnalytics({ analytics }: DocumentAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Eye className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Total Vistas</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{analytics.views}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Download className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Descargas</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{analytics.downloads}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Compartido</h3>
          </div>
          <p className="text-2xl font-bold mt-2">{analytics.shares}</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Último Acceso</h3>
          </div>
          <p className="text-sm font-medium mt-2">
            {new Date(analytics.lastAccessed).toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Views Chart */}
      <Card className="p-6">
        <h3 className="font-semibold mb-6">Tendencia de Vistas</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analytics.accessHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Access Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Historial de Accesos</h3>
        <div className="space-y-4">
          {analytics.accessHistory.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{entry.date}</Badge>
                <span className="text-sm">{entry.views} vistas</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}