"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { categorySchema } from "@/schemas/category.schema";
import { CategoryActionState } from "./category-create";

export async function updateCategoryAction(
  id: string,
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
    const existing = await prisma.category.findFirst({
        where: { 
            name: validatedFields.data.name,
            NOT: { id }
        }
    });

    if (existing) {
        return {
            errors: { name: ["Another category with this name already exists"] },
            message: "Duplicate category name."
        };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name: validatedFields.data.name,
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to update category.",
    };
  }

  revalidatePath("/categories");
  redirect("/categories");
}
