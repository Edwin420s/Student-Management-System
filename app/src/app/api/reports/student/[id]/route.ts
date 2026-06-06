import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStudentTotalAndAverage, getClassRanking } from '@/lib/ranking';
import { getGradeAndRemark } from '@/lib/grading';
import { renderToBuffer } from '@react-pdf/renderer';
import { ReportCardPDF } from '@/lib/pdf/ReportCardPDF';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await prisma.student.findUnique({
    where: { id },
    include: { stream: true, scores: { include: { subject: true, exam: true } } },
  });
  if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });

  const examId = req.nextUrl.searchParams.get('examId');
  if (!examId) return NextResponse.json({ error: 'examId required' }, { status: 400 });

  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  const scoresForExam = student.scores.filter((s: any) => s.examId === examId);
  const { total, average } = await getStudentTotalAndAverage(student.id, examId);
  const rankingMap = await getClassRanking(student.streamId, examId);
  const position = rankingMap.get(student.id) || 0;

  const scoresWithGrade = await Promise.all(scoresForExam.map(async (s: any) => {
    const { grade, remark } = await getGradeAndRemark(s.score);
    return { ...s, grade, remark };
  }));

  const { grade, remark } = await getGradeAndRemark(average);

  const pdfBuffer = await renderToBuffer(ReportCardPDF({
    student,
    scores: scoresWithGrade,
    exam,
    ranking: position,
    total,
    average,
    grade,
    remark
  }));

  return new NextResponse(pdfBuffer as any, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=report_${student.admissionNumber}.pdf`,
    },
  });
}