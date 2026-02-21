"use server";

import { prisma } from "@/lib/db";
import { productSchema } from "@/schemas/product.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/upload";

export async function updateProductAction(id: string, prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const desc = formData.get("desc") as string;
  const idcategory = formData.get("idcategory") as string;
  const imageFile = formData.get("imageFile") as File;

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  let imagePath = (existingProduct?.images as string) || "/images/placeholder.jpg";

  if (imageFile && imageFile.size > 0) {
    imagePath = await uploadImage(imageFile);
  }

  const validatedFields = productSchema.safeParse({
    name,
    desc,
    idcategory,
    images: imagePath,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: validatedFields.data.name,
      desc: validatedFields.data.desc,
      idcategory: validatedFields.data.idcategory,
      images: validatedFields.data.images,
    },
  });

  revalidatePath("/products");
  redirect("/products");
}
