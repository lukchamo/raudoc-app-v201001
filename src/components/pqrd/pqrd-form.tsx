import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileUploader } from './file-uploader';
import { FileText, Send, AlertCircle } from 'lucide-react';

interface PQRDFormProps {
  onSubmit: () => void;
}

export function PQRDForm({ onSubmit }: PQRDFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "PQRD Radicada",
        description: "Su solicitud ha sido registrada exitosamente.",
      });
      
      onSubmit();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo radicar la PQRD. Por favor intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Información General</h2>
            <p className="text-sm text-muted-foreground">
              Complete la información básica de su solicitud
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo de Solicitud</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petition">Petición</SelectItem>
                  <SelectItem value="complaint">Queja</SelectItem>
                  <SelectItem value="claim">Reclamo</SelectItem>
                  <SelectItem value="suggestion">Sugerencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Técnico</SelectItem>
                  <SelectItem value="administrative">Administrativo</SelectItem>
                  <SelectItem value="financial">Financiero</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Prioridad</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">TI</SelectItem>
                  <SelectItem value="hr">Recursos Humanos</SelectItem>
                  <SelectItem value="finance">Finanzas</SelectItem>
                  <SelectItem value="operations">Operaciones</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              placeholder="Escriba un título descriptivo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describa detalladamente su solicitud"
              className="min-h-[150px]"
              required
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Documentos de Soporte</h2>
            <p className="text-sm text-muted-foreground">
              Adjunte los documentos relevantes para su solicitud
            </p>
          </div>

          <FileUploader
            onFilesSelected={setFiles}
            maxFiles={5}
            maxSize={10 * 1024 * 1024} // 10MB
            acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.png']}
          />

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Archivos Adjuntos</Label>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{file.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setFiles(files.filter((_, i) => i !== index));
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold">Términos y Condiciones</h2>
              <p className="text-sm text-muted-foreground">
                Al radicar esta PQRD, usted acepta nuestros términos y condiciones
                de servicio.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onSubmit()}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="space-x-2">
              <Send className="h-4 w-4" />
              <span>Radicar PQRD</span>
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}