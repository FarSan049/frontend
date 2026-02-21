import { prisma } from "./lib/db";

async function checkDates() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users dates:");
    users.forEach(u => {
      console.log(`User: ${u.email}, CreatedAt: ${u.createdAt}, UpdatedAt: ${u.updatedAt}`);
      try {
        u.createdAt.toISOString();
        u.updatedAt.toISOString();
      } catch (e) {
        console.error(`Invalid date for user ${u.email}:`, e);
      }
    });

    const sessions = await prisma.session.findMany();
    console.log("\nSessions dates:");
    sessions.forEach(s => {
      console.log(`Session: ${s.tokenHash.substring(0, 8)}, ExpiresAt: ${s.expiresAt}`);
      try {
        s.expiresAt.toISOString();
      } catch (e) {
        console.error(`Invalid date for session ${s.tokenHash}:`, e);
      }
    });
  } catch (err) {
    console.error("Database error:", err);
  }
}

checkDates();
