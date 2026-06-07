import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { subjectSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const streamId = searchParams.get('streamId');
  if (streamId) {
    const subjects = await prisma.streamSubject.findMany({
      where: { streamId },
      include: { subject: true },
    });
    return NextResponse.json(subjects.map(ss => ss.subject));
  }
  const subjects = await prisma.subject.findMany();
  return NextResponse.json(subjects);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  try {
    const data = await req.json();
    const validatedData = subjectSchema.parse(data);
    const subject = await prisma.subject.create({
      data: {
        code: validatedData.code,
        name: validatedData.name,
        description: validatedData.description,
        streams: validatedData.streamIds ? { create: validatedData.streamIds.map((streamId: string) => ({ streamId })) } : undefined,
      },
    });
    return NextResponse.json(subject);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
  }
}