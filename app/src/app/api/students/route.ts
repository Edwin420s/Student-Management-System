import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

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

  const data = await req.json();
  const student = await prisma.student.create({ data });
  return NextResponse.json(student);
}