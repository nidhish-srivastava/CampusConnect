import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` to be used in the development environment
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate Prisma Client once
  prisma = new PrismaClient();
} else {
  // In development, use a global variable to avoid multiple instances
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
