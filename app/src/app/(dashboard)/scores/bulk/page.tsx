'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStreams, getSubjectsByStream, getStudentsByStream, getExams, bulkSaveScores } from '@/lib/api';
import { ArrowLeft, Download, Save, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BulkScorePage() {
  const [streamId, setStreamId] = useState('');
  const [examId, setExamId] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [streams, setStreams] = useState([]);
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getStreams().then(setStreams);
    getExams().then(setExams);
  }, []);

  useEffect(() => {
    if (streamId) {
      getStudentsByStream(streamId).then(setStudents);
      getSubjectsByStream(streamId).then(setSubjects);
      setScores({});
      setErrors({});
    }
  }, [streamId]);

  const handleScoreChange = (studentId: string, subjectId: string, value: string) => {
    const num = parseFloat(value);
    const errorKey = `${studentId}-${subjectId}`;
    
    if (value === '') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
      setScores(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], [subjectId]: undefined }
      }));
      return;
    }
    
    if (isNaN(num)) return;
    
    if (num < 0 || num > 100) {
      setErrors(prev => ({ ...prev, [errorKey]: 'Score must be between 0 and 100' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
    
    setScores(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [subjectId]: num }
    }));
  };

  const getGrade = (score: number) => {
    if (score >= 80) return { grade: 'A', color: 'text-secondary' };
    if (score >= 70) return { grade: 'B', color: 'text-tertiary' };
    if (score >= 60) return { grade: 'C', color: 'text-primary' };
    if (score >= 50) return { grade: 'D', color: 'text-error' };
    return { grade: 'F', color: 'text-error' };
  };

  const handleSave = async () => {
    if (Object.keys(errors).length > 0) {
      alert('Please fix validation errors before saving');
      return;
    }
    
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

  const totalEntries = Object.keys(scores).length;
  const errorCount = Object.keys(errors).length;

  return (
    <div className="space-y-section-gap">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
        <div>
          <nav className="flex items-center gap-xs text-on-surface-variant mb-base">
            <span className="font-label-caps text-label-caps">ACADEMIC</span>
            <span className="text-[14px]">›</span>
            <span className="font-label-caps text-label-caps">SCORES</span>
            <span className="text-[14px]">›</span>
            <span className="font-label-caps text-label-caps text-primary">BULK ENTRY</span>
          </nav>
          <h2 className="font-display text-display">Bulk Score Entry</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Update student performance records for the current term.</p>
        </div>
        <div className="flex gap-md">
          <Button variant="outline" className="flex items-center gap-sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        <div className="bg-white p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
          <label className="font-body-sm font-bold text-on-surface-variant">Exam Type</label>
          <Select onValueChange={setExamId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((e: any) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
          <label className="font-body-sm font-bold text-on-surface-variant">Class Stream</label>
          <Select onValueChange={setStreamId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Stream" />
            </SelectTrigger>
            <SelectContent>
              {streams.map((s: any) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white p-lg rounded-xl border border-outline-variant flex flex-col gap-sm">
          <label className="font-body-sm font-bold text-on-surface-variant">Subject</label>
          <div className="font-body-md text-body-md text-on-surface-variant">
            {subjects.length > 0 ? `${subjects.length} subjects loaded` : 'Select a stream first'}
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {errorCount > 0 && (
        <div className="bg-error-container text-on-error-container px-container-margin py-3 flex items-center gap-3 animate-pulse">
          <AlertCircle className="h-5 w-5" />
          <p className="font-body-sm font-semibold">Validation errors detected. Please fix highlighted fields.</p>
        </div>
      )}

      {/* Spreadsheet Table */}
      {streamId && examId && subjects.length > 0 && (
        <div className="bg-white rounded-xl border border-outline-variant overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-container-low">
                  <TableHead className="font-label-caps text-label-caps text-on-surface-variant w-16">#</TableHead>
                  <TableHead className="font-label-caps text-label-caps text-on-surface-variant min-w-[240px]">Student Name</TableHead>
                  <TableHead className="font-label-caps text-label-caps text-on-surface-variant">Admission #</TableHead>
                  {subjects.map((sub: any) => (
                    <TableHead key={sub.id} className="font-label-caps text-label-caps text-on-surface-variant min-w-[120px]">
                      {sub.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-outline-variant">
                {students.map((student: any, idx: number) => (
                  <TableRow key={student.id} className="hover:bg-surface-container-low transition-colors group">
                    <TableCell className="font-mono-data text-body-sm text-on-surface-variant opacity-60">
                      {String(idx + 1).padStart(2, '0')}
                    </TableCell>
                    <TableCell className="font-title-sm text-body-sm font-semibold text-primary">
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell className="font-mono-data text-body-sm">
                      {student.admissionNumber}
                    </TableCell>
                    {subjects.map((subject: any) => {
                      const score = scores[student.id]?.[subject.id];
                      const errorKey = `${student.id}-${subject.id}`;
                      const hasError = errors[errorKey];
                      const gradeInfo = score !== undefined ? getGrade(score) : null;
                      
                      return (
                        <TableCell key={subject.id}>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              className={`w-20 px-3 py-1.5 bg-surface-container-low border rounded font-mono-data text-center focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                                hasError ? 'border-error border-2 text-error' : 'border-outline-variant'
                              }`}
                              value={score !== undefined ? score : ''}
                              onChange={(e) => handleScoreChange(student.id, subject.id, e.target.value)}
                              min="0"
                              max="100"
                            />
                            {gradeInfo && (
                              <span className={`font-body-md font-bold text-sm ${gradeInfo.color}`}>
                                {gradeInfo.grade}
                              </span>
                            )}
                          </div>
                          {hasError && (
                            <p className="text-[10px] text-error font-bold mt-1">{hasError}</p>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Footer Stats */}
          <div className="p-lg bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Saved: {totalEntries}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Errors: {errorCount}
                </span>
              </div>
            </div>
            <div className="flex gap-sm">
              <Link href="/scores">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Button onClick={handleSave} disabled={loading || errorCount > 0} className="flex items-center gap-sm">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save All Scores
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}