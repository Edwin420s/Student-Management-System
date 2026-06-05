'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createSubject, getStreams } from '@/lib/api';

export default function NewSubjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState([]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    streamIds: [] as string[],
  });

  useEffect(() => {
    getStreams().then(setStreams);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSubject(formData);
      router.push('/subjects');
    } catch (error) {
      alert('Failed to create subject');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Add Subject</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Subject Code</Label>
          <Input required value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} />
        </div>
        <div>
          <Label>Subject Name</Label>
          <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <div>
          <Label>Assign to Streams (Optional)</Label>
          <Select onValueChange={(v) => setFormData({...formData, streamIds: [...formData.streamIds, v]})}>
            <SelectTrigger><SelectValue placeholder="Select streams" /></SelectTrigger>
            <SelectContent>
              {streams.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </form>
    </div>
  );
}
