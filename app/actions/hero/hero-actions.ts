"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { uploadImage } from "@/lib/upload";

const heroSchema = z.object({
  title: z.string().min(2, "Title is required"),
  motto: z.string().min(2, "Motto is required"),
  subtitle: z.string().min(5, "Subtitle is too short"),
  images: z.string().min(1, "Image is required"),
});

export async function updateHeroAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const motto = formData.get("motto") as string;
  const subtitle = formData.get("subtitle") as string;
  const imageFile = formData.get("imageFile") as File;

  // Find the single hero record
  const existingHero = await prisma.hero.findFirst();

  let imagePath = (existingHero?.images as string) || "/images/hero-office.jpg";

  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadImage(imageFile);
  }

  const validatedFields = heroSchema.safeParse({
    title,
    motto,
    subtitle,
    images: imagePath,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    if (existingHero) {
      await prisma.hero.update({
        where: { id: existingHero.id },
        data: validatedFields.data,
      });
    } else {
      await prisma.hero.create({
        data: validatedFields.data,
      });
    }

    revalidatePath("/");
    revalidatePath("/landingpage/hero");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update hero section" };
  }
}
