import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { examSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET() {
  const exams = await prisma.exam.findMany({ orderBy: { year: 'desc' } });
  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const validatedData = examSchema.parse(data);
    const exam = await prisma.exam.create({ data: validatedData });
    return NextResponse.json(exam);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create exam' }, { status: 500 });
  }
}