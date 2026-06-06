import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const totalStudents = await prisma.student.count();
  const totalStreams = await prisma.classStream.count();
  const totalSubjects = await prisma.subject.count();

  // Average performance across all scores
  const avgPerformanceData = await prisma.score.aggregate({
    _avg: { score: true },
  });
  const avgPerformance = Math.round(avgPerformanceData._avg.score || 0);

  // Pass rate calculation (scores >= 50)
  const passRateData = await prisma.score.aggregate({
    _count: true,
    where: { score: { gte: 50 } },
  });
  const totalScores = await prisma.score.count();
  const passRate = totalScores > 0 ? Math.round((passRateData._count / totalScores) * 100) : 0;

  // Grade distribution from actual scores
  const scores = await prisma.score.findMany({ select: { score: true } });
  const gradeCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  scores.forEach((s: any) => {
    if (s.score >= 80) gradeCounts.A++;
    else if (s.score >= 70) gradeCounts.B++;
    else if (s.score >= 60) gradeCounts.C++;
    else if (s.score >= 50) gradeCounts.D++;
    else gradeCounts.E++;
  });
  const gradeDistribution = Object.entries(gradeCounts)
    .filter(([_, count]) => count > 0)
    .map(([grade, count]) => ({ grade, count }));

  // Subject performance from actual data
  const subjects = await prisma.subject.findMany({
    include: {
      scores: {
        include: { exam: true },
      },
    },
  });
  const subjectPerformance = subjects.map((subject: any) => {
    const subjectScores = subject.scores.map((s: any) => s.score);
    const average = subjectScores.length > 0 
      ? Math.round(subjectScores.reduce((a: number, b: number) => a + b, 0) / subjectScores.length) 
      : 0;
    const passCount = subjectScores.filter((s: number) => s >= 50).length;
    const passRate = subjectScores.length > 0 
      ? Math.round((passCount / subjectScores.length) * 100) 
      : 0;
    return { subject: subject.name, average, passRate };
  }).filter((s: any) => s.average > 0);

  // Stream ranking from actual data
  const streams = await prisma.classStream.findMany({
    include: {
      students: {
        include: { scores: true },
      },
    },
  });
  const streamRanking = streams
    .map((stream: any) => {
      const allScores = stream.students.flatMap((s: any) => s.scores.map((sc: any) => sc.score));
      const meanScore = allScores.length > 0 
        ? Math.round(allScores.reduce((a: number, b: number) => a + b, 0) / allScores.length) 
        : 0;
      return { stream: stream.name, meanScore };
    })
    .filter((s: any) => s.meanScore > 0)
    .sort((a: any, b: any) => b.meanScore - a.meanScore);

  return NextResponse.json({
    totalStudents,
    totalStreams,
    totalSubjects,
    avgPerformance,
    passRate,
    gradeDistribution,
    subjectPerformance,
    streamRanking,
  });
}