'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, deleteStudent } from '@/lib/api';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const data = await getStudents(search);
      setStudents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open('/api/export/students', '_blank')}>
            Export Excel
          </Button>
          <Link href="/students/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Search by name or admission number..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admission No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class Stream</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student: any) => (
              <TableRow key={student.id}>
                <TableCell>{student.admissionNumber}</TableCell>
                <TableCell>{student.firstName} {student.lastName}</TableCell>
                <TableCell>{student.stream?.name}</TableCell>
                <TableCell>{student.gender}</TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/students/${student.id}`}>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </Link>
                  <Link href={`/students/${student.id}/edit`}>
                    <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(student.id)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && <TableRow><TableCell colSpan={5} className="text-center">No students found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}