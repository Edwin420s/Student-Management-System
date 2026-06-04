import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const exams = await prisma.exam.findMany({ orderBy: { year: 'desc' } });
  return NextResponse.json(exams);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.json();
  const exam = await prisma.exam.create({ data });
  return NextResponse.json(exam);
}