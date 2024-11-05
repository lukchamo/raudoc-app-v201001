import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

export function ProfileSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>
            Actualiza tu información de perfil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm" className="space-x-2">
              <Camera className="h-4 w-4" />
              <span>Cambiar foto</span>
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" defaultValue="Carlos Pérez" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" defaultValue="carlos@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Empresa</Label>
              <Input id="company" defaultValue="Acme Inc." />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Guardar cambios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}