// import prisma client
import { PrismaClient } from "./generated/prisma/client";

// ensure only a single instance of prisma client is created
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// initialize prisma client
const url = (process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL) as string;
const isAccelerate = url?.startsWith("prisma://") || url?.startsWith("prisma+postgres://");

const prismaOptions: any = isAccelerate
  ? { accelerateUrl: url }
  : { datasourceUrl: url };

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
