import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const name = "fariz";
  const email = "farizikhsan049@gmail.com";
  const password = "12345678";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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

    return NextResponse.json({
      success: true,
      message: "User created/updated successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Seed user error:", error);
    return NextResponse.json({
      success: false,
      message: "Error seeding user",
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
