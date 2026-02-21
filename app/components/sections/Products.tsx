import { prisma } from "@/lib/db";
import ProductsClient from "./ProductsClient";

export default async function Products() {
  const products = await prisma.product.findMany({
    take: 12, // Show a good selection on homepage
    orderBy: {
      createdAt: "desc",
    },
  });

  if (products.length === 0) return null;

  return <ProductsClient products={products as any} />;
}