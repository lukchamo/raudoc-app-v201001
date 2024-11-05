import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropZone } from '@/components/upload/drop-zone';
import { EmailUpload } from '@/components/upload/email-upload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Mail } from 'lucide-react';
import { ProcessingView } from '@/components/processing/processing-view';

export function UploadPage() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setUploadedFile(files[0]);
      setIsProcessing(true);
      // Simulate processing completion after 8 seconds
      setTimeout(() => {
        navigate('/processing');
      }, 8000);
    }
  };

  if (isProcessing && uploadedFile) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Procesando Documento
          </h1>
          <p className="text-muted-foreground mt-2">
            Convirtiendo tu documento en un activo inteligente
          </p>
        </div>

        <ProcessingView
          fileName={uploadedFile.name}
          fileSize={`${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Subir Documentos
        </h1>
        <p className="text-muted-foreground mt-2">
          Sube tus documentos para convertirlos en activos inteligentes
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload" className="space-x-2">
            <Upload className="h-4 w-4" />
            <span>Subir Archivos</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="space-x-2">
            <Mail className="h-4 w-4" />
            <span>Por Correo</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-6">
          <DropZone onFileSelect={handleFileSelect} />
        </TabsContent>
        <TabsContent value="email" className="mt-6">
          <EmailUpload />
        </TabsContent>
      </Tabs>
    </div>
  );
}