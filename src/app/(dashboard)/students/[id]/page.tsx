'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStudent } from '@/lib/api';

export default function StudentDetailPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);
  useEffect(() => {
    getStudent(id as string).then(setStudent);
  }, [id]);
  if (!student) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Student Profile</h1>
      <Card>
        <CardHeader><CardTitle>{student.firstName} {student.lastName}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Admission No:</strong> {student.admissionNumber}</p>
          <p><strong>Class Stream:</strong> {student.stream?.name}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {student.dob?.split('T')[0]}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
        </CardContent>
      </Card>
    </div>
  );
}