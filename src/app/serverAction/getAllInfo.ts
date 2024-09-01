import { PrismaClient } from "@prisma/client";

export const getAllInfos = async () => {
  const prisma = new PrismaClient();
  try {
    const info = await prisma.info.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        dates: true
      }
    });
    console.log(info)
    return info;
  } catch (error: any) {
    console.error("Error:", error.message);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
