"use server";

import { prisma } from "@/lib/db";
import { updateUserSchema } from "@/schemas/user.schema";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserAction(id: string, prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const data: any = { name, email };
  if (password) data.password = password;

  const validatedFields = updateUserSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check if email already exists for another user
  const existingUser = await prisma.user.findFirst({
    where: { 
      email: validatedFields.data.email,
      NOT: { id }
    },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already in use by another account"],
      },
    };
  }

  const updateData: any = {
    name: validatedFields.data.name,
    email: validatedFields.data.email,
  };

  if (validatedFields.data.password) {
    updateData.password = await bcrypt.hash(validatedFields.data.password, 10);
  }

  await prisma.user.update({
    where: { id },
    data: updateData,
  });

  revalidatePath("/users");
  redirect("/users");
}
