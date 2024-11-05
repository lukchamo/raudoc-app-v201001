import { Button } from '@/components/ui/button';
import { AdvancedSearch } from '@/components/search/advanced-search';
import { NotificationsButton } from '@/components/notifications/notifications-button';

export function Header() {
  return (
    <header className="flex h-16 items-center border-b px-6">
      <div className="flex flex-1 items-center space-x-4">
        <AdvancedSearch />
      </div>
      <div className="flex items-center space-x-4">
        <NotificationsButton />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <span className="sr-only">Perfil</span>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Avatar"
            className="h-8 w-8 rounded-full"
          />
        </Button>
      </div>
    </header>
  );
}