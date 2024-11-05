import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { Sidebar } from './sidebar';

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}