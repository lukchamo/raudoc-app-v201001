import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { NotificationsPanel } from './notifications-panel';

export function NotificationsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setOpen(true)}
      >
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
          3
        </span>
      </Button>
      <NotificationsPanel open={open} onOpenChange={setOpen} />
    </>
  );
}