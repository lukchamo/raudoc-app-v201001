import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InsightsList } from './insights-list';
import { InsightsTimeline } from './insights-timeline';
import { InsightsStats } from './insights-stats';
import { InsightCategories } from './insight-categories';

export function InsightsDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <InsightsStats />
        <InsightsList />
      </div>
      <div className="space-y-6">
        <InsightsTimeline />
        <InsightCategories />
      </div>
    </div>
  );
}