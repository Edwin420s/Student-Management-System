'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function SchoolSettingsPage() {
  const [settings, setSettings] = useState({
    schoolName: 'Ikonex Academy',
    principalName: '',
    academicYear: '2024',
    currentTerm: '1',
    address: '',
    phone: '',
    email: '',
  });

  const handleSave = async () => {
    await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    alert('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">School Settings</h1>
      <Card>
        <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>School Name</Label>
            <Input value={settings.schoolName} onChange={(e) => setSettings({ ...settings, schoolName: e.target.value })} />
          </div>
          <div>
            <Label>Principal Name</Label>
            <Input value={settings.principalName} onChange={(e) => setSettings({ ...settings, principalName: e.target.value })} />
          </div>
          <div>
            <Label>Academic Year</Label>
            <Input value={settings.academicYear} onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })} />
          </div>
          <div>
            <Label>Current Term</Label>
            <Input value={settings.currentTerm} onChange={(e) => setSettings({ ...settings, currentTerm: e.target.value })} />
          </div>
          <div>
            <Label>Address</Label>
            <Input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
