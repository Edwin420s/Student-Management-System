'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getDashboardStats } from '@/lib/api';

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [gradeDistribution, setGradeDistribution] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then(data => {
      setStats(data);
      // Simulate grade distribution data
      setGradeDistribution([
        { name: 'A', value: data.totalStudents * 0.24 },
        { name: 'B', value: data.totalStudents * 0.30 },
        { name: 'C', value: data.totalStudents * 0.28 },
        { name: 'D', value: data.totalStudents * 0.10 },
        { name: 'E', value: data.totalStudents * 0.08 },
      ]);
    });
  }, []);

  if (!stats) return <div>Loading...</div>;

  const subjectPerformance = [
    { subject: 'Mathematics', average: 75, passRate: 85 },
    { subject: 'English', average: 68, passRate: 78 },
    { subject: 'Science', average: 72, passRate: 82 },
    { subject: 'History', average: 65, passRate: 70 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Academic Analytics</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>Total Students</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.totalStudents}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Class Mean Score</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.averagePerformance || 72.5}%</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pass Rate</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-green-600">78%</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Streams</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{stats.totalStreams}</p></CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Subject Performance</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#2563EB" name="Average Score" />
                <Bar dataKey="passRate" fill="#22C55E" name="Pass Rate" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Grade Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Streams */}
      <Card>
        <CardHeader><CardTitle>Stream Ranking</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {['Form 1A', 'Form 1B', 'Form 1C'].map((stream, index) => (
              <div key={stream} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                  <span className="font-medium">{stream}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">{75 - index * 3}%</p>
                  <p className="text-sm text-gray-500">Mean Score</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
