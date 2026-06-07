import { z } from 'zod';

// Student validation schemas
export const studentSchema = z.object({
  admissionNumber: z.string().min(1, 'Admission number is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['MALE', 'FEMALE', 'Male', 'Female'], { 
    errorMap: () => ({ message: 'Gender must be Male or Female' })
  }),
  dob: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phone: z.string().optional(),
  streamId: z.string().min(1, 'Stream ID is required'),
});

export const studentUpdateSchema = studentSchema.partial();

// Stream validation schemas
export const streamSchema = z.object({
  name: z.string().min(1, 'Stream name is required').max(100, 'Stream name too long'),
  description: z.string().optional(),
});

export const streamUpdateSchema = streamSchema.partial();

// Subject validation schemas
export const subjectSchema = z.object({
  code: z.string().min(1, 'Subject code is required').max(20, 'Subject code too long'),
  name: z.string().min(1, 'Subject name is required').max(100, 'Subject name too long'),
  description: z.string().optional(),
  streamIds: z.array(z.string()).optional(),
});

export const subjectUpdateSchema = subjectSchema.partial();

// Exam validation schemas
export const examSchema = z.object({
  name: z.string().min(1, 'Exam name is required').max(100, 'Exam name too long'),
  term: z.string().min(1, 'Term is required'),
  year: z.number().int().min(2020).max(2100, 'Invalid year'),
  type: z.enum(['CAT', 'MIDTERM', 'ENDTERM'], {
    errorMap: () => ({ message: 'Exam type must be CAT, MIDTERM, or ENDTERM' })
  }),
});

export const examUpdateSchema = examSchema.partial();

// Score validation schemas
export const scoreEntrySchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  subjectId: z.string().min(1, 'Subject ID is required'),
  examId: z.string().min(1, 'Exam ID is required'),
  score: z.number().min(0, 'Score must be at least 0').max(100, 'Score must not exceed 100'),
});

export const bulkScoresSchema = z.object({
  entries: z.array(scoreEntrySchema).min(1, 'At least one score entry is required'),
});

// Settings validation schemas
export const schoolSettingsSchema = z.object({
  schoolName: z.string().min(1, 'School name is required'),
  principalName: z.string().optional(),
  academicYear: z.string().min(1, 'Academic year is required'),
  currentTerm: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
});

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'TEACHER'], {
    errorMap: () => ({ message: 'Role must be ADMIN or TEACHER' })
  }),
});