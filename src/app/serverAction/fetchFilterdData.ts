import { PrismaClient } from "@prisma/client";

export const fetchFilterdData = async (query: string, currentPage: number) => {
  const prisma = new PrismaClient();
  console.log("query:", query);

  const searchByName = async () => {
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

  const searchByType = async () => {
    try {
      const info = await prisma.info.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        where: {
          type: "CONTACT",
        },
        include: {
          dates: true,
        },
      });
      console.log("info:", info);
      return info;
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }
  };

  const searchByStatus = async () => {
    try {
      const info = await prisma.info.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        where: {
          status: "END",
        },
        include: {
          dates: true,
        },
      });
      console.log("info:", info);
      return info;
    } catch (e) {
      console.error(e);
    } finally {
      await prisma.$disconnect();
    }
  };

  switch (query) {
    case "お知らせ":
      return searchByType();
    case "終了":
      return searchByStatus();
    default:
      return searchByName();
  }
};
