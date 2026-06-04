'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { logout } from '@/lib/api';

export function Header() {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  return (
    <header className="fixed right-0 top-0 z-10 h-16 w-[calc(100%-16rem)] bg-white border-b px-6 flex items-center justify-end">
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}