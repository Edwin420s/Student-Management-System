'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function ImportStudentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleImport = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/students/import', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Import Students</h1>
      <Card>
        <CardHeader><CardTitle>Upload CSV File</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">Click to upload CSV file</p>
              <p className="text-xs text-gray-500 mt-2">Format: admissionNumber, firstName, lastName, gender, dob, email, phone, stream</p>
            </label>
          </div>
          {file && <p className="text-sm">Selected: {file.name}</p>}
          <Button onClick={handleImport} disabled={!file}>Import Students</Button>
          {result && (
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-700">{result.message}</p>
              {result.errors.length > 0 && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium">View Errors ({result.errors.length})</summary>
                  <pre className="mt-2 text-xs">{JSON.stringify(result.errors, null, 2)}</pre>
                </details>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
