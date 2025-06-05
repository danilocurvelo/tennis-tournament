import { PrismaClient } from '@prisma/client';

// Ensure the PrismaClient is instantiated only once in development to
// prevent exhausting database connections due to hot reloading.
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

