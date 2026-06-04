import { z } from 'zod';
export const studentSchema = z.object({
  admissionNumber: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  gender: z.enum(['MALE', 'FEMALE']),
  dob: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  streamId: z.string().min(1),
});