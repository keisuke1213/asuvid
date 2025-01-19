import prisma from "../../../db";
import { Info } from "../types/infoType";

export const dynamic = "force-dynamic";

export const fetchCalendarData = async (): Promise<Info[]> => {
  try {
    const infos = await prisma.info.findMany({
      where: {
        dates: {
          some: {},
        },
      },
      include: {
        dates: true,
      },
    });

    return infos;
  } catch (e: any) {
    console.error("Error:", e.message);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
