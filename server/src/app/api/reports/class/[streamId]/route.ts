import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { renderToBuffer } from '@react-pdf/renderer';
import { ClassReportPDF } from '@/lib/pdf/ClassReportPDF';

export async function GET(req: NextRequest, { params }: { params: Promise<{ streamId: string }> }) {
  const { streamId } = await params;
  const examId = req.nextUrl.searchParams.get('examId');
  
  if (!examId) return NextResponse.json({ error: 'examId required' }, { status: 400 });

  const stream = await prisma.classStream.findUnique({
    where: { id: streamId },
    include: { students: { include: { scores: { where: { examId }, include: { subject: true } } } } },
  });
  
  if (!stream) return NextResponse.json({ error: 'Stream not found' }, { status: 404 });

  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  
  // Calculate rankings and statistics
  const studentsWithStats = stream.students.map(student => {
    const total = student.scores.reduce((sum, s) => sum + s.score, 0);
    const average = student.scores.length ? total / student.scores.length : 0;
    return { ...student, total, average };
  });
  
  const sortedByAverage = [...studentsWithStats].sort((a, b) => b.average - a.average);
  const classMean = studentsWithStats.reduce((sum, s) => sum + s.average, 0) / studentsWithStats.length;
  
  const pdfBuffer = await renderToBuffer(ClassReportPDF({
    stream,
    exam,
    students: studentsWithStats,
    rankings: sortedByAverage,
    classMean,
  }));

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=class_report_${stream.name}.pdf`,
    },
  });
}
