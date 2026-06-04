import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const streams = await prisma.classStream.findMany({
    include: { _count: { select: { students: true } } },
  });
  return NextResponse.json(streams);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { name, description } = await req.json();
  const stream = await prisma.classStream.create({ data: { name, description } });
  return NextResponse.json(stream);
}