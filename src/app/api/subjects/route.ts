import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

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

  const { code, name, description, streamIds } = await req.json();
  const subject = await prisma.subject.create({
    data: {
      code,
      name,
      description,
      streams: streamIds ? { create: streamIds.map((streamId: string) => ({ streamId })) } : undefined,
    },
  });
  return NextResponse.json(subject);
}