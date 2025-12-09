import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  codagamSitePrisma: PrismaClient | undefined;
};

export const codagamSitePrisma =
  globalForPrisma.codagamSitePrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production")
  globalForPrisma.codagamSitePrisma = codagamSitePrisma;

// Test connection on initialization
if (process.env.NODE_ENV === "development") {
  codagamSitePrisma.$connect().catch((error: unknown) => {
    console.error("Failed to connect to MongoDB:", error);
  });
}
