import { prisma } from "@/lib/db";
import KatalogClient from "./KatalogClient";

export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return <KatalogClient initialProducts={products as any} categories={categories} />;
}
