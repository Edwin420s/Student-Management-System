'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getSubjects, deleteSubject, getStreams } from '@/lib/api';
import { Plus, Trash2, Pencil } from 'lucide-react';

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [streams, setStreams] = useState([]);
  const fetchSubjects = async () => { 
    const data = await getSubjects();
    setSubjects(data);
    setStreams(await getStreams());
  };
  useEffect(() => { fetchSubjects(); }, []);
  const handleDelete = async (id: string) => {
    if (confirm('Delete subject?')) { await deleteSubject(id); fetchSubjects(); }
  };
  
  const getStreamNames = (subject: any) => {
    if (!subject.streams || subject.streams.length === 0) return 'Not assigned';
    return subject.streams.map((ss: any) => ss.stream?.name || ss.name).join(', ');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Subjects</h1><Link href="/subjects/new"><Button><Plus className="mr-2 h-4 w-4" />Add Subject</Button></Link></div>
      <Table><TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Name</TableHead><TableHead>Assigned Streams</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
      <TableBody>{subjects.map((s: any) => (<TableRow key={s.id}><TableCell>{s.code}</TableCell><TableCell>{s.name}</TableCell><TableCell>{getStreamNames(s)}</TableCell><TableCell><Link href={`/subjects/${s.id}/edit`}><Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button></Link><Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>))}</TableBody></Table>
    </div>
  );
}