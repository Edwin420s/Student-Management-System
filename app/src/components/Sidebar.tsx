'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Network, BookOpen, FileQuestion, Award, FileBarChart, FileText, Settings, Upload, HelpCircle, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Import Students', href: '/students/import', icon: Upload },
  { name: 'Class Streams', href: '/streams', icon: Network },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Exams', href: '/exams', icon: FileQuestion },
  { name: 'Scores', href: '/scores/bulk', icon: Award },
  { name: 'Analytics', href: '/analytics', icon: FileBarChart },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-[280px] bg-inverse-surface dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline flex flex-col py-container-margin">
      <div className="px-6 mb-8">
        <h1 className="font-display text-display font-bold text-on-primary">Ikonex Academy</h1>
        <p className="font-label-caps text-label-caps text-on-primary/70 tracking-widest mt-1 uppercase">Academic Management</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive 
                  ? 'bg-primary-container text-on-primary-container border-l-4 border-primary rounded-r-lg font-semibold' 
                  : 'text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-on-surface-variant/10 hover:text-on-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-body-md text-body-md">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 mt-auto pt-8 border-t border-white/10 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-on-surface-variant/10 hover:text-on-primary"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="font-body-md text-body-md">Help Center</span>
        </Link>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-on-surface-variant dark:text-on-secondary-fixed-variant hover:bg-on-surface-variant/10 hover:text-on-primary w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-body-md text-body-md">Logout</span>
        </button>
      </div>
    </aside>
  );
}