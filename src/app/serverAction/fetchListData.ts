import prisma from "../../../db";
import { updateStatus } from "../util/updateStatus";
import { InfoWithStatus } from "../types/infoType";

export const dynamic = "force-dynamic";

export const fetchListData = async (): Promise<InfoWithStatus[]> => {
  const currentDate = new Date();
  try {
    console.time("fetchListData");
    const infos = await prisma.info.findMany({
      where: {
        deadline: {
          gte: currentDate,
        },
      },
      include: {
        dates: true,
      },
    });
    console.timeEnd("fetchListData");

    return updateStatus(infos);
  } catch (error) {
    console.error("Error fetching list data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
