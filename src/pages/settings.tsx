import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalServices } from '@/components/settings/external-services';
import { ProfileSettings } from '@/components/settings/profile-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';
import { SecuritySettings } from '@/components/settings/security-settings';

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tus preferencias y conexiones con servicios externos
        </p>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services">Servicios Externos</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ExternalServices />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}