'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStreams, deleteStream } from '@/lib/api';
import { Plus, Trash2, Eye, Users, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react';

export default function StreamsPage() {
  const [streams, setStreams] = useState([]);
  const fetchStreams = async () => { setStreams(await getStreams()); };
  useEffect(() => { fetchStreams(); }, []);
  
  const handleDelete = async (id: string) => {
    if (confirm('Delete stream?')) { await deleteStream(id); fetchStreams(); }
  };

  const totalStudents = streams.reduce((sum: number, s: any) => sum + (s._count?.students || 0), 0);
  const avgStudents = streams.length > 0 ? Math.round(totalStudents / streams.length) : 0;

  return (
    <div className="space-y-section-gap">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Class Streams</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage academic sections, assigned teachers, and student distribution.</p>
        </div>
        <Link href="/streams/new">
          <Button className="flex items-center gap-sm">
            <Plus className="h-4 w-4" />
            Add Stream
          </Button>
        </Link>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <div className="bg-white p-lg rounded-xl border border-outline-variant">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">TOTAL STREAMS</p>
          <p className="font-display text-display text-primary">{streams.length}</p>
        </div>
        <div className="bg-white p-lg rounded-xl border border-outline-variant">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">TOTAL STUDENTS</p>
          <p className="font-display text-display text-on-surface">{totalStudents}</p>
        </div>
        <div className="bg-white p-lg rounded-xl border border-outline-variant">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">AVG CLASS SIZE</p>
          <p className="font-display text-display text-on-surface">{avgStudents}</p>
        </div>
        <div className="bg-white p-lg rounded-xl border border-outline-variant">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-base">ACTIVE TEACHERS</p>
          <p className="font-display text-display text-secondary">{streams.length}</p>
        </div>
      </div>

      {/* Streams Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {streams.map((stream: any) => (
          <div key={stream.id} className="bg-white border border-outline-variant rounded-xl p-lg flex flex-col hover:border-primary-container transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-md">
              <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-on-secondary-container" />
              </div>
              <span className="px-sm py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ACTIVE</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{stream.name}</h3>
            <div className="space-y-sm mb-lg flex-1">
              <div className="flex items-center gap-sm text-on-surface-variant">
                <Users className="h-4 w-4" />
                <span className="font-body-sm text-body-sm">Students: <span className="font-bold text-on-surface">{stream._count?.students || 0}</span></span>
              </div>
              <div className="flex items-center gap-sm text-on-surface-variant">
                <GraduationCap className="h-4 w-4" />
                <span className="font-body-sm text-body-sm">Capacity: <span className="font-bold text-on-surface">40</span></span>
              </div>
            </div>
            <div className="flex gap-sm border-t border-outline-variant pt-md">
              <Link href={`/streams/${stream.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Students
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(stream.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        
        {/* Add New Stream Card */}
        <Link href="/streams/new" className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center group hover:border-primary hover:bg-primary-container/5 transition-all">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-md group-hover:bg-primary group-hover:text-on-primary transition-all">
            <Plus className="h-6 w-6 text-primary group-hover:text-on-primary" />
          </div>
          <p className="font-headline-md text-headline-md text-on-surface-variant group-hover:text-primary">Create New Stream</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant opacity-60 text-center px-lg mt-xs">Define a new class section and assign its founding faculty.</p>
        </Link>
      </div>
    </div>
  );
}