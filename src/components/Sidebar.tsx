'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Network, BookOpen, FileQuestion, Award, FileBarChart, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Class Streams', href: '/streams', icon: Network },
  { name: 'Subjects', href: '/subjects', icon: BookOpen },
  { name: 'Exams', href: '/exams', icon: FileQuestion },
  { name: 'Scores', href: '/scores/bulk', icon: Award },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 bg-white border-r">
      <div className="flex h-full flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-primary">Ikonex Academy</h1>
          <p className="text-xs text-gray-500">Academic Management</p>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}