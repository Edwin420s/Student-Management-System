import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: { stream: true, scores: { include: { subject: true, exam: true } } },
  });
  if (!student) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(student);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { id } = await params;
  const data = await req.json();
  
  // Convert date string to Date object if provided
  const studentData = {
    ...data,
    dob: data.dob ? new Date(data.dob) : null,
  };
  
  const student = await prisma.student.update({ where: { id }, data: studentData });
  return NextResponse.json(student);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const { id } = await params;
  await prisma.student.delete({ where: { id } });
  return NextResponse.json({ success: true });
}