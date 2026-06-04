'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { getStudents, getStreams, getSubjects } from '@/lib/api';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const [students, streams, subjects] = await Promise.all([
      getStudents(q),
      getStreams().then((s: any[]) => s.filter((item: any) => item.name.toLowerCase().includes(q.toLowerCase()))),
      getSubjects().then((s: any[]) => s.filter((item: any) => item.name.toLowerCase().includes(q.toLowerCase()))),
    ]);

    setResults([
      ...students.slice(0, 3).map((s: any) => ({ type: 'student', id: s.id, name: `${s.firstName} ${s.lastName}`, subtitle: s.admissionNumber })),
      ...streams.slice(0, 3).map((s: any) => ({ type: 'stream', id: s.id, name: s.name, subtitle: 'Class Stream' })),
      ...subjects.slice(0, 3).map((s: any) => ({ type: 'subject', id: s.id, name: s.name, subtitle: s.code })),
    ]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search...</span>
          <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs font-mono rounded bg-gray-100 dark:bg-gray-800">⌘K</kbd>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <Input
            placeholder="Search students, streams, subjects..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
          <div className="space-y-2">
            {results.map((result) => (
              <div key={result.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                <p className="font-medium">{result.name}</p>
                <p className="text-sm text-gray-500">{result.subtitle}</p>
              </div>
            ))}
            {query.length >= 2 && results.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No results found</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
