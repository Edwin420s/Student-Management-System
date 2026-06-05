'use client';
import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/api';
import { Users, GraduationCap, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-section-gap">
      {/* Page Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Overview of your academic institution</p>
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
          <h3 className="font-display text-display mt-1">{stats?.totalStudents || 0}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-tertiary-fixed/30 text-tertiary rounded-lg">
              <GraduationCap className="h-5 w-5" />
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Total Streams</p>
          <h3 className="font-display text-display mt-1">{stats?.totalStreams || 0}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-secondary-fixed/30 text-secondary rounded-lg">
              <BookOpen className="h-5 w-5" />
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Total Subjects</p>
          <h3 className="font-display text-display mt-1">{stats?.totalSubjects || 0}</h3>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-primary-container/10 text-primary rounded-lg">
              <TrendingUp className="h-5 w-5" />
            </span>
          </div>
          <p className="text-on-surface-variant font-label-caps text-label-caps uppercase">Avg Performance</p>
          <h3 className="font-display text-display mt-1">{stats?.averagePerformance || 0}%</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <Link href="/students/new" className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Add New Student</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Register a new student to the system</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/exams/new" className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Create Exam</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Schedule a new examination period</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link href="/scores/bulk" className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Enter Scores</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Bulk enter student examination scores</p>
            </div>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}