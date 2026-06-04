import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { entries } = await req.json(); // entries: [{ studentId, subjectId, examId, score }]
  const results = [];
  for (const entry of entries) {
    try {
      const score = await prisma.score.upsert({
        where: {
          studentId_subjectId_examId: {
            studentId: entry.studentId,
            subjectId: entry.subjectId,
            examId: entry.examId,
          },
        },
        update: { score: entry.score },
        create: entry,
      });
      results.push(score);
    } catch (error) {
      results.push({ error: 'Duplicate or invalid', entry });
    }
  }
  return NextResponse.json(results);
}