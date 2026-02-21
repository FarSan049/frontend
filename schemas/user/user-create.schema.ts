// import zod
import { z } from "zod";

/** 
 * Zod schema untuk validasi pembuatan user
 */
export const createUserSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
