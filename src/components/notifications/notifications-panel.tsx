import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Calendar, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Documento procesado exitosamente',
    description: 'Contrato de Servicios 2024 ha sido procesado y está listo para revisión.',
    type: 'success',
    timestamp: '2024-03-15T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Documento próximo a vencer',
    description: 'El contrato CON-2024-001 vence en 30 días. Se requiere acción.',
    type: 'warning',
    timestamp: '2024-03-15T09:30:00Z',
    read: false,
  },
  {
    id: '3',
    title: 'Nuevo insight detectado',
    description: 'Se ha detectado una cláusula importante en el documento recién procesado.',
    type: 'info',
    timestamp: '2024-03-15T09:00:00Z',
    read: true,
  },
];

const typeStyles = {
  info: {
    icon: FileText,
    className: 'bg-blue-100 text-blue-800',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-100 text-yellow-800',
  },
  success: {
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800',
  },
  error: {
    icon: AlertTriangle,
    className: 'bg-red-100 text-red-800',
  },
};

interface NotificationsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsPanel({ open, onOpenChange }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notificaciones</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount} nuevas
                </Badge>
              )}
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como leídas
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-4">
            {notifications.map((notification) => {
              const { icon: Icon, className } = typeStyles[notification.type];
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 rounded-lg transition-colors',
                    notification.read ? 'bg-muted/50' : 'bg-muted'
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn('p-2 rounded-full', className)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}