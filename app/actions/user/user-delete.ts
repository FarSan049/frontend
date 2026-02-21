"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(id: string) {
  try {
    // Basic protection: don't delete yourself? (Would need user session context)
    // For now, simple delete
    await prisma.user.delete({
      where: { id },
    });
    
    revalidatePath("/users");
    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { error: "Failed to delete user" };
  }
}
