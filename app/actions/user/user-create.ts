"use server";

import { prisma } from "@/lib/db";
import { createUserSchema } from "@/schemas/user.schema";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUserAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = createUserSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedFields.data.email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already in use"],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);

  await prisma.user.create({
    data: {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: hashedPassword,
    },
  });

  revalidatePath("/users");
  redirect("/users");
}
