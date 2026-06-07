'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, HelpCircle, Search } from 'lucide-react';
import { logout } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import { GlobalSearch } from '@/components/GlobalSearch';

export function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  return (
    <header className="fixed top-0 right-0 z-10 w-[calc(100%-280px)] border-b border-outline-variant dark:border-outline bg-surface dark:bg-inverse-surface flex justify-between items-center h-16 px-container-margin">
      <div className="flex items-center flex-1 max-w-xl">
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all text-on-surface-variant">
            <Bell className="h-5 w-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all text-on-surface-variant">
            <HelpCircle className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </div>
        <div className="h-8 w-px bg-outline-variant"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-label-caps text-label-caps font-bold text-on-surface leading-tight">Admin User</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Senior Registrar</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-fixed-dim border border-outline-variant overflow-hidden flex items-center justify-center text-on-primary font-bold">
            AU
          </div>
        </div>
      </div>
    </header>
  );
}