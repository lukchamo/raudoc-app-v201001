import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Brain, Send, Sparkles } from 'lucide-react';

const AI_SUGGESTIONS = [
  {
    id: '1',
    content: 'Entiendo su preocupación. Nuestro equipo técnico está revisando el caso...',
    tone: 'empathetic',
    confidence: 0.92,
  },
  {
    id: '2',
    content: 'Hemos identificado la causa del problema y estamos trabajando en la solución...',
    tone: 'technical',
    confidence: 0.88,
  },
];

export function PQRDResponse() {
  const [response, setResponse] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const handleSendResponse = () => {
    // Implement send logic
    console.log('Sending response:', response);
  };

  const handleAISuggestion = (suggestion: typeof AI_SUGGESTIONS[0]) => {
    setResponse(suggestion.content);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Nueva Respuesta</h3>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Seleccionar plantilla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acknowledgment">Acuse de recibo</SelectItem>
              <SelectItem value="progress">Actualización de progreso</SelectItem>
              <SelectItem value="resolution">Resolución</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Textarea
            placeholder="Escriba su respuesta..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="min-h-[150px]"
          />

          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Sugerencias de IA</span>
              </div>
              <div className="space-y-2">
                {AI_SUGGESTIONS.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => handleAISuggestion(suggestion)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="space-x-1">
                        <Sparkles className="h-3 w-3" />
                        <span>{suggestion.tone}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {(suggestion.confidence * 100).toFixed(0)}% confianza
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSendResponse} className="space-x-2">
              <Send className="h-4 w-4" />
              <span>Enviar Respuesta</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}