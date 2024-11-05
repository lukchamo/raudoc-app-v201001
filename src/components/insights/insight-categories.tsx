import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const categories = [
  {
    name: 'Contratos',
    count: 45,
    total: 128,
    color: 'bg-blue-500',
  },
  {
    name: 'Facturas',
    count: 32,
    total: 128,
    color: 'bg-green-500',
  },
  {
    name: 'Informes',
    count: 28,
    total: 128,
    color: 'bg-purple-500',
  },
  {
    name: 'Legal',
    count: 15,
    total: 128,
    color: 'bg-orange-500',
  },
];

export function InsightCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías</CardTitle>
        <CardDescription>
          Distribución de insights por tipo de documento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{category.name}</span>
              <span className="text-sm text-muted-foreground">
                {category.count} / {category.total}
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full ${category.color}`}
                style={{
                  width: `${(category.count / category.total) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}