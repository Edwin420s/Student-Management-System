'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, deleteStudent } from '@/lib/api';
import { Pencil, Trash2, Eye, Plus, TrendingUp, TrendingDown, Users, GraduationCap, CheckCircle } from 'lucide-react';

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

  const stats = {
    totalStudents: students.length,
    totalStreams: new Set(students.map((s: any) => s.stream?.name)).size,
    maleStudents: students.filter((s: any) => s.gender === 'Male').length,
    femaleStudents: students.filter((s: any) => s.gender === 'Female').length,
  };

  return (
    <div className="space-y-section-gap">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Students</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage student records, enrollment, and academic information.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => window.open('/api/export/students', '_blank')} className="flex items-center gap-2">
            Export Excel
          </Button>
          <Link href="/students/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Student
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-primary-container/10 text-primary rounded-lg">
              <Users className="h-5 w-5" />
            </span>
            <span className="text-secondary font-label-caps text-[10px] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +3.2%
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Total Students</p>
          <h3 className="font-display text-display mt-1">{stats.totalStudents}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-tertiary-fixed/30 text-tertiary rounded-lg">
              <GraduationCap className="h-5 w-5" />
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Total Streams</p>
          <h3 className="font-display text-display mt-1">{stats.totalStreams}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-secondary-fixed/30 text-secondary rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </span>
            <span className="text-secondary font-label-caps text-[10px] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +1.2%
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Male Students</p>
          <h3 className="font-display text-display mt-1">{stats.maleStudents}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-primary-container/10 text-primary rounded-lg">
              <CheckCircle className="h-5 w-5" />
            </span>
            <span className="text-secondary font-label-caps text-[10px] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.1%
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Female Students</p>
          <h3 className="font-display text-display mt-1">{stats.femaleStudents}</h3>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-outline-variant">
          <Input 
            placeholder="Search by name or admission number..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="max-w-md"
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-container-low">
                <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Admission No</TableHead>
                <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Name</TableHead>
                <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Class Stream</TableHead>
                <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Gender</TableHead>
                <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-outline-variant">
              {students.map((student: any) => (
                <TableRow key={student.id} className="hover:bg-surface-container-low transition-colors">
                  <TableCell className="font-mono-data text-body-sm">{student.admissionNumber}</TableCell>
                  <TableCell className="font-title-sm text-body-sm font-semibold text-primary">
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell className="font-body-md text-body-md">{student.stream?.name}</TableCell>
                  <TableCell className="font-body-md text-body-md">{student.gender}</TableCell>
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
              {students.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-on-surface-variant">
                    No students found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
