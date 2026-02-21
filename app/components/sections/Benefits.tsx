import { prisma } from "@/lib/db";
import BenefitsClient from "./BenefitsClient";

export default async function Benefits() {
  const benefits = await prisma.benefit.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  if (benefits.length === 0) return null;

  return <BenefitsClient benefits={benefits} />;
}
