import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { streamSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function GET() {
  const streams = await prisma.classStream.findMany({
    include: { _count: { select: { students: true } } },
  });
  return NextResponse.json(streams);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  try {
    const data = await req.json();
    const validatedData = streamSchema.parse(data);
    const stream = await prisma.classStream.create({ data: validatedData });
    return NextResponse.json(stream);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create stream' }, { status: 500 });
  }
}