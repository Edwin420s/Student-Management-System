'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStream } from '@/lib/api';

export default function StreamDetailPage() {
  const { id } = useParams();
  const [stream, setStream] = useState<any>(null);
  useEffect(() => { getStream(id as string).then(setStream); }, [id]);
  if (!stream) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{stream.name}</h1>
      <Card><CardHeader><CardTitle>Students</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Admission No</TableHead><TableHead>Name</TableHead></TableRow></TableHeader><TableBody>{stream.students?.map((s: any) => (<TableRow key={s.id}><TableCell>{s.admissionNumber}</TableCell><TableCell>{s.firstName} {s.lastName}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
    </div>
  );
}