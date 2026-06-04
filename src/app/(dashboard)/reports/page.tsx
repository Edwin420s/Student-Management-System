'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStudents, getExams, getStreams } from '@/lib/api';

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'student' | 'class'>('student');
  const [studentId, setStudentId] = useState('');
  const [examId, setExamId] = useState('');
  const [streamId, setStreamId] = useState('');
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    getStudents().then(setStudents);
    getExams().then(setExams);
    getStreams().then(setStreams);
  }, []);

  const generateReport = () => {
    if (reportType === 'student' && studentId && examId) {
      window.open(`/api/reports/student/${studentId}?examId=${examId}`, '_blank');
    } else if (reportType === 'class' && streamId && examId) {
      window.open(`/api/reports/class/${streamId}?examId=${examId}`, '_blank');
    }
  };

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Generate Reports</h1>
      <div>
        <label className="block text-sm font-medium mb-1">Report Type</label>
        <Select value={reportType} onValueChange={(v: any) => setReportType(v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student Report Card</SelectItem>
            <SelectItem value="class">Class Performance Report</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {reportType === 'student' && (
        <div><label>Student</label><Select onValueChange={setStudentId}><SelectTrigger><SelectValue placeholder="Select student" /></SelectTrigger><SelectContent>{students.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>)}</SelectContent></Select></div>
      )}
      {reportType === 'class' && (
        <div><label>Class Stream</label><Select onValueChange={setStreamId}><SelectTrigger><SelectValue placeholder="Select stream" /></SelectTrigger><SelectContent>{streams.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select></div>
      )}
      <div><label>Exam</label><Select onValueChange={setExamId}><SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger><SelectContent>{exams.map((e: any) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent></Select></div>
      <Button onClick={generateReport} disabled={!examId || (reportType === 'student' && !studentId) || (reportType === 'class' && !streamId)}>Generate PDF</Button>
    </div>
  );
}