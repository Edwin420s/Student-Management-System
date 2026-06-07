'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createStream } from '@/lib/api';

export default function NewStreamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createStream(formData);
      router.push('/streams');
    } catch (error) {
      alert('Failed to create stream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Add Stream</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Stream Name</Label>
          <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div>
          <Label>Description</Label>
          <Input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
        </div>
        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
      </form>
    </div>
  );
}
