import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { products } from "../app/lib/products";
import { benefits } from "../app/lib/benefits";
import { testimonials } from "../app/lib/testimonials";

async function main() {
  console.log("Environment loaded. Initializing database client...");
  
  // Dynamic import to ensure env is loaded before prisma init
  const { prisma } = await import("../lib/db");
  
  try {
    console.log("Start seeding...");

    // 1. Seed Categories first (extracted from products)
    const categoriesTemp = Array.from(new Set(products.map(p => p.category)));
    console.log(`Found ${categoriesTemp.length} unique categories:`, categoriesTemp);

    for (const catName of categoriesTemp) {
      const result = await prisma.category.upsert({
        where: { name: catName },
        update: {},
        create: { name: catName },
      });
      console.log(`Upserted category: ${catName} (ID: ${result.id})`);
    }

    const allCategories = await prisma.category.findMany();
    console.log(`Retrieved ${allCategories.length} categories from DB.`);
    
    // Map with lowercased names for case-insensitive lookup
    const categoryMap = new Map(allCategories.map(c => [c.name.toLowerCase(), c.id]));
    console.log("Category Map (keys lowercased):", Object.fromEntries(categoryMap));

    // 2. Seed Products
    console.log("Seeding products...");
    for (const p of products) {
      console.log(`Processing product: ${p.name} (Category icon: ${p.category})`);
      const categoryId = categoryMap.get(p.category.toLowerCase());
      
      if (!categoryId) {
        console.error(`Error: Category ID not found for category name: "${p.category}"`);
        console.log(`Available categories in map:`, Array.from(categoryMap.keys()));
        throw new Error(`Category ID not found for ${p.category}`);
      }

      await prisma.product.upsert({
        where: { name: p.name },
        update: {
          desc: p.desc,
          images: p.image,
          idcategory: categoryId,
        },
        create: {
          name: p.name,
          desc: p.desc,
          images: p.image,
          idcategory: categoryId,
        },
      });
    }

    // 3. Seed Benefits
    console.log("Seeding benefits...");
    for (const b of benefits) {
      await prisma.benefit.upsert({
        where: { title: b.title },
        update: {
          desc: b.desc,
          icon: b.icon,
        },
        create: {
          title: b.title,
          desc: b.desc,
          icon: b.icon,
        },
      });
    }

    // 4. Seed Testimonials
    console.log("Seeding testimonials...");
    for (const t of testimonials) {
      await prisma.testimonial.upsert({
        where: { name: t.name },
        update: {
          role: t.role,
          message: t.message,
        },
        create: {
          name: t.name,
          role: t.role,
          message: t.message,
        },
      });
    }

    // 5. Seed Hero
    console.log("Seeding hero section...");
    await prisma.hero.upsert({
      where: { title: "Sewa Tanaman untuk" },
      update: {
        motto: "Kantor yang Lebih Estetik",
        subtitle: "Ciptakan suasana kerja yang nyaman dan profesional tanpa ribet perawatan. Kami urus semuanya untuk Anda.",
        images: "/images/hero-office.jpg",
      },
      create: {
        title: "Sewa Tanaman untuk",
        motto: "Kantor yang Lebih Estetik",
        subtitle: "Ciptakan suasana kerja yang nyaman dan profesional tanpa ribet perawatan. Kami urus semuanya untuk Anda.",
        images: "/images/hero-office.jpg",
      },
    });

    console.log("Seeding finished.");
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  } finally {
    const { prisma } = await import("../lib/db");
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    process.exit(1);
  });
