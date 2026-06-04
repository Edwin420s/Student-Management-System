'use client';
import { useParams } from 'next/navigation';
import { StudentForm } from '@/components/StudentForm';
import { useEffect, useState } from 'react';
import { getStudent } from '@/lib/api';

export default function EditStudentPage() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    getStudent(id as string).then(setStudent);
  }, [id]);
  if (!student) return <div>Loading...</div>;
  return <StudentForm initialData={student} />;
}