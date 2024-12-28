import prisma from "../../../db";
import { updateStatus } from "../util/updateStatus";
import { Info, InfoWithStatus } from "../types/infoType";

export const fetchFilterdData = async (query: string) => {
  const searchByName = async (): Promise<InfoWithStatus[]> => {
    try {
      const infos = await prisma.info.findMany({
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

      return updateStatus(infos);
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  };

  const searchByType = async (): Promise<Info[]> => {
    try {
      const currentDate = new Date();
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
      return info;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  };

  const searchExpiredData = async (): Promise<InfoWithStatus[]> => {
    try {
      const infos = await prisma.info.findMany({
        orderBy: [
          {
            id: "desc",
          },
        ],
        where: {
          deadline: {
            lt: new Date(),
          },
        },
        include: {
          dates: true,
        },
      });
      return updateStatus(infos);
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      await prisma.$disconnect();
    }
  };

  switch (query) {
    case "お知らせ":
      return searchByType();
    case "終了":
      return searchExpiredData();
    default:
      return searchByName();
  }
};
