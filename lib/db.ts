import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

// ensure only a single instance of prisma client is created
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// initialize prisma client with pg driver adapter (Prisma v7 direct connection)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
