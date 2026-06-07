'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createStudent, updateStudent, getStreams } from '@/lib/api';

export function StudentForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState([]);
  const [formData, setFormData] = useState({
    admissionNumber: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    streamId: '',
  });

  useEffect(() => {
    getStreams().then(setStreams);
    if (initialData) {
      setFormData({
        admissionNumber: initialData.admissionNumber || '',
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        gender: initialData.gender || '',
        dob: initialData.dob?.split('T')[0] || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        streamId: initialData.streamId || '',
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updateStudent(initialData.id, formData);
      } else {
        await createStudent(formData);
      }
      router.push('/students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">{initialData ? 'Edit Student' : 'Add Student'}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Admission Number</Label><Input required value={formData.admissionNumber} onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})} /></div>
        <div><Label>First Name</Label><Input required value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} /></div>
        <div><Label>Last Name</Label><Input required value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} /></div>
        <div><Label>Gender</Label><Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent></Select></div>
        <div><Label>Date of Birth</Label><Input type="date" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} /></div>
        <div><Label>Email</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
        <div><Label>Phone</Label><Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} /></div>
        <div><Label>Class Stream</Label><Select value={formData.streamId} onValueChange={(v) => setFormData({...formData, streamId: v})}><SelectTrigger><SelectValue placeholder="Select stream" /></SelectTrigger><SelectContent>{streams.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
    </form>
  );
}