export const BRAND = {
  name: 'Raudoc',
  tagline: 'Documentos Inteligentes',
  description: 'Transformando documentos en activos inteligentes',
};

export const THEME = {
  colors: {
    primary: 'hsl(210, 100%, 50%)',    // Azure principal
    secondary: 'hsl(160, 84%, 39%)',    // Verde complementario
    accent: 'hsl(245, 58%, 51%)',       // Púrpura acento
    neutral: 'hsl(214, 32%, 91%)',      // Gris claro
    surface: 'hsl(220, 20%, 97%)',      // Fondo claro
  },
};

export const NAVIGATION = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'LayoutDashboard',
  },
  {
    title: 'Documentos',
    href: '/documents',
    icon: 'Files',
  },
  {
    title: 'Procesamiento',
    href: '/document/DOC-2024-001/processed',
    icon: 'Brain',
    highlight: true,
  },
  {
    title: 'PQRD',
    href: '/pqrd',
    icon: 'MessageSquare',
    submenu: [
      {
        title: 'Listado PQRD',
        href: '/pqrd',
        icon: 'List',
      },
      {
        title: 'Nueva PQRD',
        href: '/pqrd/new',
        icon: 'Plus',
      },
      {
        title: 'Seguimiento',
        href: '/pqrd/track',
        icon: 'Clock',
      },
      {
        title: 'TRD',
        href: '/pqrd/trd',
        icon: 'FileText',
      },
      {
        title: 'Flujos de Trabajo',
        href: '/pqrd/workflows',
        icon: 'Workflow',
      }
    ]
  },
  {
    title: 'Automatizaciones',
    href: '/automations',
    icon: 'Workflow',
  },
  {
    title: 'Insights',
    href: '/insights',
    icon: 'Brain',
  },
  {
    title: 'Búsqueda Avanzada',
    href: '/search',
    icon: 'Search',
  },
  {
    title: 'Reportes',
    href: '/reports',
    icon: 'BarChart',
  },
  {
    title: 'Configuración',
    href: '/settings',
    icon: 'Settings',
  },
  {
    title: 'Centro de Ayuda',
    href: '/help',
    icon: 'HelpCircle',
  }
];