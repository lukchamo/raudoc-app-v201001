import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, Users, FileText } from 'lucide-react';

interface CorporateContactModalProps {
  onClose: () => void;
}

export function CorporateContactModal({ onClose }: CorporateContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Contacta con Ventas</DialogTitle>
          <DialogDescription>
            Cuéntanos sobre tu empresa y te contactaremos para discutir una solución personalizada
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico corporativo</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Cargo</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ceo">CEO / Director General</SelectItem>
                  <SelectItem value="cto">CTO / Director Técnico</SelectItem>
                  <SelectItem value="manager">Gerente / Manager</SelectItem>
                  <SelectItem value="other">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="teamSize">Tamaño del equipo</Label>
              <Select
                value={formData.teamSize}
                onValueChange={(value) =>
                  setFormData({ ...formData, teamSize: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tamaño del equipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-50">10-50 empleados</SelectItem>
                  <SelectItem value="51-200">51-200 empleados</SelectItem>
                  <SelectItem value="201-500">201-500 empleados</SelectItem>
                  <SelectItem value="500+">Más de 500 empleados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos sobre tus necesidades específicas..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <h4 className="font-medium">¿Por qué elegir el Plan Corporativo?</h4>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="text-sm">Implementación y soporte dedicado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">Gestión de equipos y permisos avanzada</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">Personalización de flujos documentales</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Enviar Solicitud</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}