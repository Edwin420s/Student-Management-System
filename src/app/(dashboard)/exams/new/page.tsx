'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createExam } from '@/lib/api';

export default function NewExamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    term: '',
    year: 2024,
    type: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createExam(formData);
      router.push('/exams');
    } catch (error) {
      alert('Failed to create exam');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Add Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Exam Name</Label>
          <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <Label>Term</Label>
          <Input required value={formData.term} onChange={(e) => setFormData({...formData, term: e.target.value})} />
        </div>
        <div>
          <Label>Year</Label>
          <Input type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} />
        </div>
        <div>
          <Label>Type</Label>
          <Select value={formData.type} onValueChange={(v) => setFormData({...formData, type: v})}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="CAT">CAT</SelectItem>
              <SelectItem value="MIDTERM">MIDTERM</SelectItem>
              <SelectItem value="ENDTERM">ENDTERM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </form>
    </div>
  );
}
