import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { SearchBar } from '@/components/help/search-bar';
import { 
  Book, 
  FileQuestion, 
  Video, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight, 
  Mail, 
  Phone, 
  Globe 
} from 'lucide-react';

const guides = [
  {
    title: 'Primeros Pasos',
    description: 'Guía básica para comenzar a usar la plataforma',
    icon: Book,
    badge: 'Esencial',
  },
  {
    title: 'Procesamiento de Documentos',
    description: 'Aprende a procesar documentos con IA',
    icon: FileQuestion,
    badge: 'Popular',
  },
  {
    title: 'Automatizaciones',
    description: 'Configura flujos de trabajo automáticos',
    icon: Video,
  },
];

const faqs = [
  {
    question: '¿Qué tipos de documentos puedo procesar?',
    answer: 'Soportamos PDF, Word, Excel y más...',
  },
  {
    question: '¿Cómo funciona el procesamiento con IA?',
    answer: 'Nuestra IA analiza el contenido y estructura...',
  },
  {
    question: '¿Es seguro mi contenido?',
    answer: 'Utilizamos encriptación de nivel bancario...',
  },
];

const resources = [
  {
    title: 'Documentación API',
    description: 'Documentación técnica completa',
    icon: Book,
    link: '/docs/api',
  },
  {
    title: 'Video Tutoriales',
    description: 'Aprende con ejemplos prácticos',
    icon: Video,
    link: '/tutorials',
  },
  {
    title: 'Blog Técnico',
    description: 'Artículos y mejores prácticas',
    icon: Globe,
    link: '/blog',
  },
];

export function HelpPage() {
  const [currentTab, setCurrentTab] = useState('guides');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Centro de Ayuda</h1>
        <p className="text-muted-foreground mt-2">
          Encuentra respuestas, tutoriales y recursos de ayuda
        </p>
      </div>

      <SearchBar />

      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList>
          <TabsTrigger value="guides" className="space-x-2">
            <Book className="h-4 w-4" />
            <span>Guías</span>
          </TabsTrigger>
          <TabsTrigger value="faqs" className="space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="space-x-2">
            <FileQuestion className="h-4 w-4" />
            <span>Recursos</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="guides" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide, index) => {
                const Icon = guide.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {guide.badge && (
                          <Badge variant="secondary">{guide.badge}</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        <span>Leer más</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <Card>
              <CardContent className="divide-y">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-4 first:pt-6 last:pb-6">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="p-2 rounded-full bg-primary/10 w-fit">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="mt-4">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        <span>Acceder</span>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <Separator className="my-8" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>¿Necesitas más ayuda?</CardTitle>
            <CardDescription>
              Nuestro equipo de soporte está disponible 24/7
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <span>soporte@raudoc.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <span>+1 (555) 123-4567</span>
            </div>
            <Button className="w-full mt-4">
              Contactar Soporte
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comunidad</CardTitle>
            <CardDescription>
              Únete a nuestra comunidad de usuarios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Foro de la Comunidad</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat en Vivo</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}