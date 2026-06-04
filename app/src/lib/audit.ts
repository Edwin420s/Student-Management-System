import { prisma } from './prisma';

export async function createAuditLog(userId: string, action: string, entity: string, entityId: string, details?: any) {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      details: details as any,
    },
  });
}

export async function getAuditLogs(userId?: string, entity?: string) {
  const where: any = {};
  if (userId) where.userId = userId;
  if (entity) where.entity = entity;
  
  return prisma.auditLog.findMany({
    where,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
}
