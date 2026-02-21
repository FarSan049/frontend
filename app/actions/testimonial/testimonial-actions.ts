"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  message: z.string().min(5, "Message is too short"),
});

export async function createTestimonialAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const message = formData.get("message") as string;

  const validatedFields = testimonialSchema.safeParse({ name, role, message });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.create({
      data: validatedFields.data,
    });

    revalidatePath("/testimonials");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create testimonial" };
  }
}

export async function updateTestimonialAction(id: string, prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const message = formData.get("message") as string;

  const validatedFields = testimonialSchema.safeParse({ name, role, message });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: validatedFields.data,
    });

    revalidatePath("/testimonials");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update testimonial" };
  }
}

export async function deleteTestimonialAction(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id },
    });
    revalidatePath("/testimonials");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete testimonial" };
  }
}
