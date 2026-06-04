import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { bulkScoresSchema } from '@/lib/validations';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const validatedData = bulkScoresSchema.parse(data);
    const { entries } = validatedData;

    // Perform all upserts in a single parallel transaction block
    const operations = entries.map((entry: any) => 
      prisma.score.upsert({
        where: {
          studentId_subjectId_examId: {
            studentId: entry.studentId,
            subjectId: entry.subjectId,
            examId: entry.examId,
          },
        },
        update: { score: entry.score },
        create: {
          studentId: entry.studentId,
          subjectId: entry.subjectId,
          examId: entry.examId,
          score: entry.score,
        },
      })
    );

    const results = await prisma.$transaction(operations);
    
    // Log this in Audit Logs automatically
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'BULK_SCORE_UPDATE',
        entity: 'Score',
        entityId: entries[0].examId,
        details: { count: entries.length }
      }
    });

    return NextResponse.json({ success: true, count: results.length });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to process scores' }, { status: 500 });
  }
}