import { prisma } from "./lib/db";
import bcrypt from "bcryptjs";

async function createUser() {
  const name = "fariz";
  const email = "farizikhsan049@gmail.com";
  const password = "12345678";

  console.log(`Hashing password for user ${name}...`);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    console.log(`Creating user in database...`);
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword,
      },
      create: {
        name,
        email,
        password: hashedPassword,
      },
    });

    console.log("Success! User created/updated:", {
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createUser();
