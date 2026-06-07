'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStudent } from '@/lib/api';

export default function StudentPerformancePage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    getStudent(id as string).then(setStudent);
  }, [id]);

  if (!student) return <div>Loading...</div>;

  // Simulated performance data over time
  const performanceData = [
    { term: 'Term 1', average: 72, position: 5 },
    { term: 'Term 2', average: 75, position: 4 },
    { term: 'Term 3', average: 78, position: 3 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Performance Trends</h1>
      <Card>
        <CardHeader><CardTitle>{student.firstName} {student.lastName}</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#2563EB" name="Average Score" />
              <Line type="monotone" dataKey="position" stroke="#22C55E" name="Class Position" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
