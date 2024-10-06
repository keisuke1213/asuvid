"use server";
import { PrismaClient } from "@prisma/client";

export const fetchDataById = async (id: number) => {
  const prisma = new PrismaClient();
  try {
    const data = await prisma.info.findUnique({
      where: {
        id,
      },
      include: {
        dates: true,
      },
    });
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};
