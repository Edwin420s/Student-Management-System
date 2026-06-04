'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStreams, deleteStream } from '@/lib/api';
import { Plus, Trash2, Eye } from 'lucide-react';

export default function StreamsPage() {
  const [streams, setStreams] = useState([]);
  const fetchStreams = async () => { setStreams(await getStreams()); };
  useEffect(() => { fetchStreams(); }, []);
  const handleDelete = async (id: string) => {
    if (confirm('Delete stream?')) { await deleteStream(id); fetchStreams(); }
  };
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Class Streams</h1><Link href="/streams/new"><Button><Plus className="mr-2 h-4 w-4" />Add Stream</Button></Link></div>
      <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Students</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
      <TableBody>{streams.map((s: any) => (<TableRow key={s.id}><TableCell>{s.name}</TableCell><TableCell>{s._count?.students || 0}</TableCell><TableCell><Link href={`/streams/${s.id}`}><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button></Link><Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>))}</TableBody></Table>
    </div>
  );
}