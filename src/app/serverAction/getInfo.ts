"use server";
import { PrismaClient } from "@prisma/client";

export const getInfo = async (id: number) => {
  const prisma = new PrismaClient();
  console.log(id);

  try {
    const info = await prisma.info.findUnique({
      where: {
        id: id,
      },
      include: {
        dates: true,
      },
    });
    console.log(info);
    return info;
  } catch (error: any) {
    console.error("Error", error.message);
  } finally {
    await prisma.$disconnect();
  }
};
