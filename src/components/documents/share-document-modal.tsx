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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Users,
  Link,
  Copy,
  Mail,
  Clock,
  Shield,
  X,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareDocumentModalProps {
  documentId: string;
  documentName: string;
  onClose: () => void;
}

interface SharedUser {
  id: string;
  email: string;
  permission: 'view' | 'edit' | 'admin';
  status: 'pending' | 'accepted';
}

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export function ShareDocumentModal({
  documentId,
  documentName,
  onClose,
}: ShareDocumentModalProps) {
  const { toast } = useToast();
  const [shareLink, setShareLink] = useState('');
  const [linkPermission, setLinkPermission] = useState<'view' | 'edit'>('view');
  const [linkExpiration, setLinkExpiration] = useState('never');
  const [enableLink, setEnableLink] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit' | 'admin'>('view');
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([
    { id: '1', email: 'usuario1@empresa.com', permission: 'view', status: 'accepted' },
    { id: '2', email: 'usuario2@empresa.com', permission: 'edit', status: 'pending' },
  ]);

  const generateShareLink = () => {
    const uniqueId = Math.random().toString(36).substring(7);
    setShareLink(`https://raudoc.com/share/${documentId}/${uniqueId}`);
  };

  const handleEnableLinkToggle = (enabled: boolean) => {
    setEnableLink(enabled);
    if (enabled && !shareLink) {
      generateShareLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: "Enlace copiado",
        description: "El enlace ha sido copiado al portapapeles",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el enlace al portapapeles",
        variant: "destructive",
      });
    }
  };

  const handleInviteUser = () => {
    if (!email) {
      setEmailError('El correo electrónico es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido');
      return;
    }

    if (sharedUsers.some(user => user.email === email)) {
      setEmailError('Este usuario ya tiene acceso al documento');
      return;
    }

    const newUser: SharedUser = {
      id: Date.now().toString(),
      email,
      permission,
      status: 'pending',
    };

    setSharedUsers([...sharedUsers, newUser]);
    setEmail('');
    setEmailError('');
    
    toast({
      title: "Invitación enviada",
      description: `Se ha enviado una invitación a ${email}`,
    });
  };

  const handleRemoveUser = (userId: string) => {
    setSharedUsers(sharedUsers.filter(user => user.id !== userId));
    toast({
      title: "Usuario removido",
      description: "El usuario ya no tiene acceso al documento",
    });
  };

  const handleUpdatePermission = (userId: string, newPermission: 'view' | 'edit' | 'admin') => {
    setSharedUsers(sharedUsers.map(user =>
      user.id === userId ? { ...user, permission: newPermission } : user
    ));
    
    const user = sharedUsers.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Permisos actualizados",
        description: `Los permisos de ${user.email} han sido actualizados`,
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compartir Documento</DialogTitle>
          <DialogDescription className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>{documentName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Invite Users Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Invitar usuarios</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className={emailError ? 'border-red-500' : ''}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500 mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="w-32">
                  <Select
                    value={permission}
                    onValueChange={(value) => setPermission(value as 'view' | 'edit' | 'admin')}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">Ver</SelectItem>
                      <SelectItem value="edit">Editar</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleInviteUser}
                  disabled={!email}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Invitar
                </Button>
              </div>
            </div>

            {/* Shared Users List */}
            {sharedUsers.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Usuarios con acceso ({sharedUsers.length})
                </h3>
                {sharedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <span>{user.email}</span>
                        <Badge
                          variant={user.status === 'accepted' ? 'secondary' : 'outline'}
                          className="ml-2"
                        >
                          {user.status === 'accepted' ? 'Aceptado' : 'Pendiente'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={user.permission}
                        onValueChange={(value) =>
                          handleUpdatePermission(user.id, value as 'view' | 'edit' | 'admin')
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="view">Ver</SelectItem>
                          <SelectItem value="edit">Editar</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveUser(user.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Share Link Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link className="h-4 w-4" />
                <span className="font-medium">Enlace de compartir</span>
              </div>
              <Switch
                checked={enableLink}
                onCheckedChange={handleEnableLinkToggle}
              />
            </div>

            {enableLink && (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={shareLink}
                    readOnly
                    className="bg-muted font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={handleCopyLink}
                    className="space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copiar</span>
                  </Button>
                </div>

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label>Permisos del enlace</Label>
                    <Select
                      value={linkPermission}
                      onValueChange={(value) => setLinkPermission(value as 'view' | 'edit')}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">Solo lectura</SelectItem>
                        <SelectItem value="edit">Edición</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Label>Expiración</Label>
                    <Select
                      value={linkExpiration}
                      onValueChange={setLinkExpiration}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Nunca</SelectItem>
                        <SelectItem value="1day">1 día</SelectItem>
                        <SelectItem value="7days">7 días</SelectItem>
                        <SelectItem value="30days">30 días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Protegido</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {linkExpiration === 'never'
                        ? 'No expira'
                        : `Expira en ${linkExpiration}`}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}