import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Smartphone } from 'lucide-react';

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>
                Actualiza tu contraseña regularmente para mantener tu cuenta segura
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Contraseña actual</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">Nueva contraseña</Label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirmar contraseña</Label>
            <Input id="confirm" type="password" />
          </div>
          <Button className="w-full">Actualizar contraseña</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Key className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Autenticación de dos factores</CardTitle>
              <CardDescription>
                Añade una capa extra de seguridad a tu cuenta
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Estado</p>
              <p className="text-sm text-muted-foreground">
                La autenticación de dos factores está habilitada
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Activo
            </Badge>
          </div>
          <Button variant="outline" className="w-full">
            Configurar 2FA
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Smartphone className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Dispositivos conectados</CardTitle>
              <CardDescription>
                Gestiona los dispositivos que tienen acceso a tu cuenta
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {['MacBook Pro - Chrome', 'iPhone 12 - Safari'].map((device) => (
              <div
                key={device}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="space-y-1">
                  <p className="font-medium">{device}</p>
                  <p className="text-sm text-muted-foreground">
                    Último acceso: hace 2 horas
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Revocar acceso
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}