import { prisma } from './prisma';

export async function getSubjectRanking(streamId: string, subjectId: string, examId: string) {
  const scores = await prisma.score.findMany({
    where: { examId, subjectId, student: { streamId } },
    include: { student: true },
  });
  const sorted = scores.sort((a: any, b: any) => b.score - a.score);
  const ranking = new Map<string, number>();
  
  // Standard competition ranking (1, 1, 3, 4 for ties)
  let rank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].score !== sorted[i - 1].score) {
      rank = i + 1;
    }
    ranking.set(sorted[i].studentId, rank);
  }
  return ranking;
}

export async function getClassRanking(streamId: string, examId: string) {
  const students = await prisma.student.findMany({
    where: { streamId },
    include: { scores: { where: { examId }, include: { subject: true } } },
  });
  const averages = students.map((student: any) => {
    const total = student.scores.reduce((sum: number, s: any) => sum + s.score, 0);
    const avg = student.scores.length ? total / student.scores.length : 0;
    return { studentId: student.id, average: avg };
  });
  const sorted = averages.sort((a: any, b: any) => b.average - a.average);
  const ranking = new Map<string, number>();
  
  // Standard competition ranking (1, 1, 3, 4 for ties)
  let rank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].average !== sorted[i - 1].average) {
      rank = i + 1;
    }
    ranking.set(sorted[i].studentId, rank);
  }
  return ranking;
}

export async function getStudentTotalAndAverage(studentId: string, examId: string) {
  const scores = await prisma.score.findMany({ where: { studentId, examId } });
  const total = scores.reduce((sum: number, s: any) => sum + s.score, 0);
  const average = scores.length ? total / scores.length : 0;
  return { total, average };
}