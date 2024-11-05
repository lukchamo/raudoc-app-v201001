import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NAVIGATION, BRAND } from '@/lib/constants';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Upload,
  Files,
  Workflow,
  Settings,
  ChevronLeft,
  Brain,
  CreditCard,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Search,
  BarChart,
  List,
  Plus,
  Clock,
  FileText,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const iconMap = {
  LayoutDashboard,
  Upload,
  Files,
  Workflow,
  Settings,
  Brain,
  CreditCard,
  Sparkles,
  HelpCircle,
  MessageSquare,
  Search,
  BarChart,
  List,
  Plus,
  Clock,
  FileText,
};

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setExpandedMenu(expandedMenu === title ? null : title);
  };

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-card transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!collapsed && (
          <h1 className="text-xl font-bold tracking-tight">{BRAND.name}</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn('ml-auto')}
          onClick={onToggle}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform',
              collapsed && 'rotate-180'
            )}
          />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {NAVIGATION.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location.pathname === item.href;
          const hasSubmenu = item.submenu && item.submenu.length > 0;

          return (
            <div key={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  collapsed ? 'px-2' : 'px-4',
                  item.highlight && 'bg-primary/10 hover:bg-primary/20'
                )}
                onClick={() => hasSubmenu ? toggleSubmenu(item.title) : null}
                asChild={!hasSubmenu}
              >
                {hasSubmenu ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {Icon && <Icon className="h-4 w-4 mr-2" />}
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expandedMenu === item.title && "rotate-180"
                        )}
                      />
                    )}
                  </div>
                ) : (
                  <Link to={item.href}>
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                )}
              </Button>

              {hasSubmenu && expandedMenu === item.title && !collapsed && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu.map((subitem) => {
                    const SubIcon = iconMap[subitem.icon as keyof typeof iconMap];
                    const isSubActive = location.pathname === subitem.href;

                    return (
                      <Button
                        key={subitem.href}
                        variant={isSubActive ? 'secondary' : 'ghost'}
                        className="w-full justify-start pl-6"
                        asChild
                      >
                        <Link to={subitem.href}>
                          {SubIcon && <SubIcon className="h-4 w-4 mr-2" />}
                          <span>{subitem.title}</span>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}