"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categorySchema } from "@/schemas/category.schema";

export type CategoryActionState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function createCategoryAction(
  prevState: CategoryActionState,
  formData: FormData
): Promise<CategoryActionState> {
  const validatedFields = categorySchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form.",
    };
  }

  try {
    const existing = await prisma.category.findUnique({
        where: { name: validatedFields.data.name }
    });

    if (existing) {
        return {
            errors: { name: ["Category with this name already exists"] },
            message: "Duplicate category name."
        };
    }

    await prisma.category.create({
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to create category.",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
}
