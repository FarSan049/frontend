import cloudinary from "./cloudinary";

export async function uploadImage(file: File): Promise<string> {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64 for Cloudinary upload
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "wardhanaflower",
      resource_type: "auto",
    });

    // Return the secure URL from Cloudinary
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Gagal mengunggah gambar ke Cloudinary");
  }
}
