"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const benefitSchema = z.object({
  title: z.string().min(2, "Title is required"),
  desc: z.string().min(5, "Description is too short"),
  icon: z.string().min(1, "Icon is required"),
});

export async function createBenefitAction(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const icon = formData.get("icon") as string;

  const validatedFields = benefitSchema.safeParse({ title, desc, icon });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.benefit.create({
      data: validatedFields.data,
    });

    revalidatePath("/benefits");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create benefit" };
  }
}

export async function updateBenefitAction(id: string, prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const icon = formData.get("icon") as string;

  const validatedFields = benefitSchema.safeParse({ title, desc, icon });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.benefit.update({
      where: { id },
      data: validatedFields.data,
    });

    revalidatePath("/benefits");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update benefit" };
  }
}

export async function deleteBenefitAction(id: string) {
  try {
    await prisma.benefit.delete({
      where: { id },
    });
    revalidatePath("/benefits");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete benefit" };
  }
}
