import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stream = await prisma.classStream.findUnique({
    where: { id },
    include: { students: true, subjects: { include: { subject: true } } },
  });
  if (!stream) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(stream);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  const { id } = await params;
  const { name, description } = await req.json();
  const stream = await prisma.classStream.update({ where: { id }, data: { name, description } });
  return NextResponse.json(stream);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  const { id } = await params;
  await prisma.classStream.delete({ where: { id } });
  return NextResponse.json({ success: true });
}