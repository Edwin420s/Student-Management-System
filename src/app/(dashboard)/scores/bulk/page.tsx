'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStreams, getSubjectsByStream, getStudentsByStream, getExams, bulkSaveScores } from '@/lib/api';

export default function BulkScorePage() {
  const [streamId, setStreamId] = useState('');
  const [examId, setExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [streams, setStreams] = useState([]);
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStreams().then(setStreams);
    getExams().then(setExams);
  }, []);

  useEffect(() => {
    if (streamId) {
      getStudentsByStream(streamId).then(setStudents);
      getSubjectsByStream(streamId).then(setSubjects);
      setScores({});
    }
  }, [streamId]);

  const handleScoreChange = (studentId: string, subjectId: string, value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setScores(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [subjectId]: num }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const entries = [];
    for (const student of students) {
      for (const subject of subjects) {
        const score = scores[student.id]?.[subject.id];
        if (score !== undefined && score !== null) {
          entries.push({ studentId: student.id, subjectId: subject.id, examId, score });
        }
      }
    }
    await bulkSaveScores(entries);
    alert('Scores saved successfully');
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bulk Score Entry</h1>
      <div className="flex gap-4">
        <Select onValueChange={setStreamId}><SelectTrigger className="w-48"><SelectValue placeholder="Select Stream" /></SelectTrigger><SelectContent>{streams.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
        <Select onValueChange={setExamId}><SelectTrigger className="w-48"><SelectValue placeholder="Select Exam" /></SelectTrigger><SelectContent>{exams.map((e: any) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent></Select>
      </div>
      {streamId && examId && subjects.length > 0 && (
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                {subjects.map((sub: any) => <TableHead key={sub.id}>{sub.name}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student: any) => (
                <TableRow key={student.id}>
                  <TableCell>{student.firstName} {student.lastName}</TableCell>
                  {subjects.map((subject: any) => (
                    <TableCell key={subject.id}>
                      <input
                        type="number"
                        className="w-20 p-1 border rounded"
                        value={scores[student.id]?.[subject.id] || ''}
                        onChange={(e) => handleScoreChange(student.id, subject.id, e.target.value)}
                        min="0"
                        max="100"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4"><Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save All Scores'}</Button></div>
        </div>
      )}
    </div>
  );
}