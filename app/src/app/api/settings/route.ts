import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
  const settings = await prisma.schoolSettings.findFirst();
  if (!settings) {
    return NextResponse.json({
      schoolName: 'Ikonex Academy',
      academicYear: '2024',
      currentTerm: '1',
    });
  }
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

  const data = await req.json();
  const settings = await prisma.schoolSettings.upsert({
    where: { id: data.id || 'default' },
    update: data,
    create: data,
  });
  return NextResponse.json(settings);
}
