"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteCategoryAction(id: string) {
  try {
    // Check if category has products
    const productCount = await prisma.product.count({
        where: { idcategory: id }
    });

    if (productCount > 0) {
        return { 
            success: false, 
            message: "Cannot delete category that has products. Please remove or move the products first." 
        };
    }

    await prisma.category.delete({
      where: { id },
    });
    
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    console.error("Delete category error:", error);
    return { success: false, message: "Database error: Failed to delete category." };
  }
}
