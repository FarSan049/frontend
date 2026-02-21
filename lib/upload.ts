import { writeFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";

export async function uploadImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define upload path
  const uploadDir = join(process.cwd(), "public", "images", "products");
  
  // Ensure directory exists
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Create unique filename
  const timestamp = Date.now();
  const originalName = file.name.replace(/\s+/g, "-");
  const filename = `${timestamp}-${originalName}`;
  const path = join(uploadDir, filename);

  // Write file
  await writeFile(path, buffer);

  // Return public URL
  return `/images/products/${filename}`;
}
