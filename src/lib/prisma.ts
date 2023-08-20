import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    //log: ["query", "info", "warn", "error"],
    log: ['error', 'query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const states = {
  success: {
    code: 200,
    msg: 'Sucessfull',
  },
  error: {
    code: 500,
    msg: 'Error',
  },
} as const
