import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Calendar, Mail, Database, Cloud, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
  connected: boolean;
  status?: 'active' | 'pending' | 'error';
  features: string[];
}

const services: Service[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Recibe notificaciones y comparte documentos en tus canales',
    icon: MessageSquare,
    connected: false,
    features: [
      'Notificaciones en tiempo real',
      'Compartir documentos',
      'Comandos personalizados',
    ],
  },
  {
    id: 'google',
    name: 'Google Workspace',
    description: 'Sincroniza con Calendar, Drive y Gmail',
    icon: Calendar,
    connected: true,
    status: 'active',
    features: [
      'Sincronización de calendario',
      'Almacenamiento en Drive',
      'Integración con Gmail',
    ],
  },
  {
    id: 'outlook',
    name: 'Microsoft 365',
    description: 'Conecta con Outlook, Teams y OneDrive',
    icon: Mail,
    connected: false,
    features: [
      'Correo electrónico',
      'Almacenamiento en OneDrive',
      'Integración con Teams',
    ],
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Almacenamiento y sincronización de documentos',
    icon: Cloud,
    connected: true,
    status: 'error',
    features: [
      'Almacenamiento en la nube',
      'Sincronización automática',
      'Control de versiones',
    ],
  },
];

export function ExternalServices() {
  const [connectedServices, setConnectedServices] = useState(services);
  const { toast } = useToast();

  const handleConnection = (serviceId: string) => {
    setConnectedServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, connected: !service.connected }
          : service
      )
    );

    toast({
      title: 'Servicio actualizado',
      description: 'La conexión ha sido actualizada exitosamente.',
    });
  };

  const getStatusBadge = (status?: Service['status']) => {
    if (!status) return null;

    const styles = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    };

    return (
      <Badge variant="secondary" className={styles[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {connectedServices.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={service.connected}
                    onCheckedChange={() => handleConnection(service.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {service.connected && service.status && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estado</span>
                      {getStatusBadge(service.status)}
                    </div>
                  )}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Características</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Lock className="h-3 w-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {service.connected && (
                    <Button variant="outline" className="w-full">
                      Configurar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}