const API_BASE = '/api';

async function fetcher(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, credentials: 'include' });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const login = (email: string, password: string) => fetcher('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }), headers: { 'Content-Type': 'application/json' } });
export const logout = () => fetcher('/auth/logout', { method: 'POST' });
export const getCurrentUser = () => fetcher('/auth/me');

// Students
export const getStudents = (search?: string) => fetcher(`/students${search ? `?search=${search}` : ''}`);
export const getStudent = (id: string) => fetcher(`/students/${id}`);
export const createStudent = (data: any) => fetcher('/students', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const updateStudent = (id: string, data: any) => fetcher(`/students/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const deleteStudent = (id: string) => fetcher(`/students/${id}`, { method: 'DELETE' });
export const getStudentsByStream = (streamId: string) => fetcher(`/students?streamId=${streamId}`);

// Streams
export const getStreams = () => fetcher('/streams');
export const getStream = (id: string) => fetcher(`/streams/${id}`);
export const createStream = (data: any) => fetcher('/streams', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const updateStream = (id: string, data: any) => fetcher(`/streams/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const deleteStream = (id: string) => fetcher(`/streams/${id}`, { method: 'DELETE' });

// Subjects
export const getSubjects = () => fetcher('/subjects');
export const getSubject = (id: string) => fetcher(`/subjects/${id}`);
export const createSubject = (data: any) => fetcher('/subjects', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const updateSubject = (id: string, data: any) => fetcher(`/subjects/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const deleteSubject = (id: string) => fetcher(`/subjects/${id}`, { method: 'DELETE' });
export const getSubjectsByStream = (streamId: string) => fetcher(`/subjects?streamId=${streamId}`);

// Exams
export const getExams = () => fetcher('/exams');
export const createExam = (data: any) => fetcher('/exams', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
export const deleteExam = (id: string) => fetcher(`/exams/${id}`, { method: 'DELETE' });

// Scores
export const bulkSaveScores = (entries: any[]) => fetcher('/scores', { method: 'POST', body: JSON.stringify({ entries }), headers: { 'Content-Type': 'application/json' } });

// Dashboard
export const getDashboardStats = () => fetcher('/dashboard/stats');