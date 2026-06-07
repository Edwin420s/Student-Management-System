import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = await params;
  
  const verification = await prisma.reportVerification.findUnique({
    where: { reportId },
    include: {
      student: {
        include: { stream: true },
      },
      exam: true,
    },
  });

  if (!verification) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }

  return NextResponse.json({
    verified: true,
    verifiedAt: verification.verifiedAt,
    student: {
      name: `${verification.student.firstName} ${verification.student.lastName}`,
      admissionNumber: verification.student.admissionNumber,
      stream: verification.student.stream.name,
    },
    exam: {
      name: verification.exam.name,
      term: verification.exam.term,
      year: verification.exam.year,
    },
  });
}
