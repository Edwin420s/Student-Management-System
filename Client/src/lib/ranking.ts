import { prisma } from './prisma';

export async function getSubjectRanking(streamId: string, subjectId: string, examId: string) {
  const scores = await prisma.score.findMany({
    where: { examId, subjectId, student: { streamId } },
    include: { student: true },
  });
  const sorted = scores.sort((a, b) => b.score - a.score);
  const ranking = new Map<string, number>();
  sorted.forEach((s, idx) => ranking.set(s.studentId, idx + 1));
  return ranking;
}

export async function getClassRanking(streamId: string, examId: string) {
  const students = await prisma.student.findMany({
    where: { streamId },
    include: { scores: { where: { examId }, include: { subject: true } } },
  });
  const averages = students.map(student => {
    const total = student.scores.reduce((sum, s) => sum + s.score, 0);
    const avg = student.scores.length ? total / student.scores.length : 0;
    return { studentId: student.id, average: avg };
  });
  const sorted = averages.sort((a, b) => b.average - a.average);
  const ranking = new Map<string, number>();
  sorted.forEach((s, idx) => ranking.set(s.studentId, idx + 1));
  return ranking;
}

export async function getStudentTotalAndAverage(studentId: string, examId: string) {
  const scores = await prisma.score.findMany({ where: { studentId, examId } });
  const total = scores.reduce((sum, s) => sum + s.score, 0);
  const average = scores.length ? total / scores.length : 0;
  return { total, average };
}