import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, MessageSquare, FileText } from 'lucide-react';

const MOCK_TRACKING = {
  id: 'PQRD-2024-001',
  subject: 'Problema con el servicio',
  status: 'in_progress',
  createdAt: '2024-03-15T10:00:00Z',
  deadline: '2024-03-22T10:00:00Z',
  history: [
    {
      date: '2024-03-15T10:00:00Z',
      action: 'created',
      description: 'PQRD radicada en el sistema',
      user: 'Cliente',
    },
    {
      date: '2024-03-15T10:30:00Z',
      action: 'assigned',
      description: 'Asignada al departamento de Soporte Técnico',
      user: 'Sistema',
    },
    {
      date: '2024-03-15T14:00:00Z',
      action: 'response',
      description: 'Primera respuesta enviada al cliente',
      user: 'Juan Pérez',
    },
  ],
};

export function PQRDTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [tracking, setTracking] = useState<typeof MOCK_TRACKING | null>(null);

  const handleSearch = () => {
    // Simulate API call
    if (trackingId.trim()) {
      setTracking(MOCK_TRACKING);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Seguimiento de PQRD</h2>
            <p className="text-sm text-muted-foreground">
              Ingrese el número de radicado para consultar el estado de su solicitud
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ingrese el número de radicado..."
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={handleSearch}>Consultar</Button>
          </div>
        </div>
      </Card>

      {tracking && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{tracking.subject}</h3>
                <p className="text-sm text-muted-foreground">
                  Radicado: {tracking.id}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                En Proceso
              </Badge>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Fecha Límite</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tracking.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Respuestas</p>
                  <p className="text-sm text-muted-foreground">
                    {tracking.history.filter(h => h.action === 'response').length}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Documentos</p>
                  <p className="text-sm text-muted-foreground">2</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Historial</h4>
              <div className="space-y-4">
                {tracking.history.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4"
                  >
                    <div className="min-w-24 pt-1">
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {event.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Por: {event.user}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}