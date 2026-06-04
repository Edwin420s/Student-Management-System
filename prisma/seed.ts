import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@ikonex.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ikonex.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const gradingScales = [
    { grade: 'A', minScore: 80, maxScore: 100, remark: 'Excellent' },
    { grade: 'B', minScore: 70, maxScore: 79, remark: 'Very Good' },
    { grade: 'C', minScore: 60, maxScore: 69, remark: 'Good' },
    { grade: 'D', minScore: 50, maxScore: 59, remark: 'Pass' },
    { grade: 'E', minScore: 0, maxScore: 49, remark: 'Fail' },
  ];

  for (const scale of gradingScales) {
    await prisma.gradingScale.upsert({
      where: { id: scale.grade },
      update: {},
      create: { id: scale.grade, ...scale },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());