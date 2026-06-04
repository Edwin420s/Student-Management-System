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

  // Grade distribution (example)
  const gradeDistribution = [
    { grade: 'A', count: 12 },
    { grade: 'B', count: 24 },
    { grade: 'C', count: 18 },
    { grade: 'D', count: 8 },
    { grade: 'E', count: 4 },
  ];

  // Performance trend (last 6 months)
  const performanceTrend = [
    { month: 'Jan', average: 68 },
    { month: 'Feb', average: 72 },
    { month: 'Mar', average: 70 },
    { month: 'Apr', average: 74 },
    { month: 'May', average: 78 },
    { month: 'Jun', average: 76 },
  ];

  return NextResponse.json({
    totalStudents,
    totalStreams,
    totalSubjects,
    avgPerformance,
    gradeDistribution,
    performanceTrend,
  });
}