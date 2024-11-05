import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PQRDForm } from '@/components/pqrd/pqrd-form';
import { PQRDList } from '@/components/pqrd/pqrd-list';
import { PQRDStats } from '@/components/pqrd/pqrd-stats';
import { PQRDTracker } from '@/components/pqrd/pqrd-tracker';
import { Plus, FileText, Clock, Search } from 'lucide-react';

export function PQRDPage() {
  const [currentTab, setCurrentTab] = useState('list');

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de PQRD
          </h1>
          <p className="text-muted-foreground mt-2">
            Sistema de Gestión de Peticiones, Quejas, Reclamos y Denuncias
          </p>
        </div>
        <Button onClick={() => setCurrentTab('new')} className="space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nueva PQRD</span>
        </Button>
      </div>

      <PQRDStats />

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="list" className="space-x-2">
            <FileText className="h-4 w-4" />
            <span>Listado</span>
          </TabsTrigger>
          <TabsTrigger value="new" className="space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nueva PQRD</span>
          </TabsTrigger>
          <TabsTrigger value="track" className="space-x-2">
            <Clock className="h-4 w-4" />
            <span>Seguimiento</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-6">
          <PQRDList />
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <PQRDForm onSubmit={() => setCurrentTab('list')} />
        </TabsContent>

        <TabsContent value="track" className="mt-6">
          <PQRDTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
}