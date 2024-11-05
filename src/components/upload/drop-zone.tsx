import { useState, useCallback } from 'react';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DropZoneProps {
  onFileSelect: (files: File[]) => void;
}

export function DropZone({ onFileSelect }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress((prev) => ({
        ...prev,
        [file.name]: progress,
      }));
      if (progress >= 100) {
        clearInterval(interval);
        onFileSelect([file]);
      }
    }, 100);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles([droppedFiles[0]]);
      simulateUpload(droppedFiles[0]);
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFile = e.target.files[0];
      setFiles([selectedFile]);
      simulateUpload(selectedFile);
    }
  }, [onFileSelect]);

  const removeFile = useCallback((fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  }, []);

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
          <p className="text-lg font-medium">Arrastra tus documentos aquí</p>
          <p className="text-sm text-muted-foreground">o</p>
          <label htmlFor="file-upload">
            <Button variant="link" className="mt-2">
              Selecciona archivos
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          PDF, Word, Excel (max. 10MB)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center justify-between p-4 rounded-lg bg-muted"
            >
              <div className="flex items-center space-x-4">
                <File className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <Progress value={uploadProgress[file.name]} />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.name)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}