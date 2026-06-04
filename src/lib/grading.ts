import { prisma } from './prisma';

export async function getGradeAndRemark(score: number) {
  const scales = await prisma.gradingScale.findMany();
  const matched = scales.find(s => score >= s.minScore && score <= s.maxScore);
  if (!matched) return { grade: 'N/A', remark: 'Not graded' };
  return { grade: matched.grade, remark: matched.remark };
}