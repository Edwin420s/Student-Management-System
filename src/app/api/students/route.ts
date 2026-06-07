import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { studentSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search') || '';
  const streamId = searchParams.get('streamId');

  const where: any = {};
  if (streamId) where.streamId = streamId;
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { admissionNumber: { contains: search, mode: 'insensitive' } },
    ];
  }

  const students = await prisma.student.findMany({
    where,
    include: { stream: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(students);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  try {
    const data = await req.json();
    const validatedData = studentSchema.parse(data);
    
    // Convert date string to Date object if provided
    const studentData = {
      ...validatedData,
      dob: validatedData.dob ? new Date(validatedData.dob) : null,
      email: validatedData.email || null,
      phone: validatedData.phone || null,
    };
    
    const student = await prisma.student.create({ data: studentData });
    return NextResponse.json(student);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    console.error('Student creation error:', error);
    return NextResponse.json({ error: 'Failed to create student', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}