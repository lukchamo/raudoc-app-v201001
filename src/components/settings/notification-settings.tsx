import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const notificationSettings = [
  {
    category: 'Documentos',
    settings: [
      {
        id: 'doc-processed',
        label: 'Documento procesado',
        description: 'Cuando un documento ha sido procesado completamente',
      },
      {
        id: 'doc-expiring',
        label: 'Documento por vencer',
        description: 'Cuando un documento está próximo a su fecha de vencimiento',
      },
    ],
  },
  {
    category: 'Insights',
    settings: [
      {
        id: 'new-insight',
        label: 'Nuevos insights',
        description: 'Cuando se detectan insights importantes en tus documentos',
      },
      {
        id: 'insight-action',
        label: 'Acciones requeridas',
        description: 'Cuando un insight requiere tu atención',
      },
    ],
  },
  {
    category: 'Automatizaciones',
    settings: [
      {
        id: 'automation-success',
        label: 'Ejecución exitosa',
        description: 'Cuando una automatización se completa correctamente',
      },
      {
        id: 'automation-error',
        label: 'Error en automatización',
        description: 'Cuando una automatización falla o requiere atención',
      },
    ],
  },
];

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      {notificationSettings.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
            <CardDescription>
              Configura las notificaciones para {category.category.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {category.settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="space-y-1">
                  <Label htmlFor={setting.id}>{setting.label}</Label>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
                <Switch id={setting.id} defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}