import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.png'],
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setError(`El archivo ${file.name} excede el tamaño máximo permitido`);
      return false;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`Tipo de archivo no permitido: ${file.name}`);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList) => {
    setError(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
        // Simulate upload progress
        simulateUpload(file.name);
      }
    });

    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({
        ...prev,
        [fileName]: progress,
      }));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 transition-colors',
          'flex flex-col items-center justify-center space-y-4',
          isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          'hover:border-primary hover:bg-primary/5'
        )}
      >
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Arrastra tus archivos aquí</p>
          <p className="text-sm text-muted-foreground">o</p>
          <Button
            variant="link"
            onClick={() => fileInputRef.current?.click()}
            className="mt-2"
          >
            Selecciona archivos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleFileInput}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Máximo {maxFiles} archivos • Tamaño máximo {maxSize / (1024 * 1024)}MB
          <br />
          Formatos permitidos: {acceptedTypes.join(', ')}
        </p>
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>{fileName}</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      ))}
    </div>
  );
}