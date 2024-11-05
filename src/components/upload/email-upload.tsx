import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function EmailUpload() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Envía por correo
        </CardTitle>
        <CardDescription>
          Envía tus documentos a nuestra dirección de correo dedicada
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted">
          <Mail className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <Input
              value="ai@raudoc.com"
              readOnly
              className="bg-transparent border-0 px-0 font-medium"
            />
          </div>
          <Button variant="secondary" size="sm">
            Copiar
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Los documentos enviados a esta dirección serán procesados automáticamente
          y aparecerán en tu dashboard.
        </p>
      </CardContent>
    </Card>
  );
}