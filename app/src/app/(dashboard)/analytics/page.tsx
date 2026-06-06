'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getDashboardStats } from '@/lib/api';

const COLORS = ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [gradeDistribution, setGradeDistribution] = useState<any[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<any[]>([]);
  const [streamRanking, setStreamRanking] = useState<any[]>([]);

  useEffect(() => {
    getDashboardStats().then(data => {
      setStats(data);
      setGradeDistribution(data.gradeDistribution || []);
      setSubjectPerformance(data.subjectPerformance || []);
      setStreamRanking(data.streamRanking || []);
    });
  }, []);

  if (!stats) return <div>Loading...</div>;

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
          <CardContent><p className="text-3xl font-bold">{stats.avgPerformance || 0}%</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pass Rate</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-green-600">{stats.passRate || 0}%</p></CardContent>
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
            {subjectPerformance.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No subject performance data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Grade Distribution</CardTitle></CardHeader>
          <CardContent>
            {gradeDistribution.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No grade distribution data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Streams */}
      <Card>
        <CardHeader><CardTitle>Stream Ranking</CardTitle></CardHeader>
        <CardContent>
          {streamRanking.length > 0 ? (
            <div className="space-y-4">
              {streamRanking.map((item: any, index: number) => (
                <div key={item.stream} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-blue-600">#{index + 1}</span>
                    <span className="font-medium">{item.stream}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.meanScore}%</p>
                    <p className="text-sm text-gray-500">Mean Score</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[100px] text-gray-500">
              No stream ranking data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
