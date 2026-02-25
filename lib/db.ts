// import prisma client
import { PrismaClient } from "./generated/prisma/client";

// ensure only a single instance of prisma client is created
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// initialize prisma client
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL as string,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
