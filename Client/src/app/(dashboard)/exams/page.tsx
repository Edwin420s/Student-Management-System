'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getExams, deleteExam } from '@/lib/api';
import { Plus, Trash2, Pencil } from 'lucide-react';

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const fetchExams = async () => { setExams(await getExams()); };
  useEffect(() => { fetchExams(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete exam?')) { await deleteExam(id); fetchExams(); }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between"><h1 className="text-2xl font-bold">Exams</h1><Link href="/exams/new"><Button><Plus className="mr-2 h-4 w-4" />Add Exam</Button></Link></div>
      <Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Term</TableHead><TableHead>Year</TableHead><TableHead>Type</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
      <TableBody>{exams.map((e: any) => (<TableRow key={e.id}><TableCell>{e.name}</TableCell><TableCell>{e.term}</TableCell><TableCell>{e.year}</TableCell><TableCell>{e.type}</TableCell><TableCell><Button variant="ghost" size="sm" onClick={() => handleDelete(e.id)}><Trash2 className="h-4 w-4" /></Button></TableCell></TableRow>))}</TableBody></Table>
    </div>
  );
}
