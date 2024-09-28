import { PrismaClient } from "@prisma/client";

export const fetchFilterdData = async (query: string, currentPage: number) => {
  const prisma = new PrismaClient();
  console.log("query:", query);
  try {
    const info = await prisma.info.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            content: {
              contains: query,
            },
          },
        ],
      },
      include: {
        dates: true,
      },
    });
    info.sort((a, b) => {
      if (
        a.status === "DEADLINE_APPROACHING" &&
        b.status !== "DEADLINE_APPROACHING"
      ) {
        return -1;
      }
      if (
        a.status !== "DEADLINE_APPROACHING" &&
        b.status === "DEADLINE_APPROACHING"
      ) {
        return 1;
      }
      return 0;
    });
    console.log("info:", info);
    return info;
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
};
