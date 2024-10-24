import { PrismaClient } from "@prisma/client";
import { differenceInDays, isAfter } from "date-fns";
import { Status } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const infos = await prisma.info.findMany({
      where: {
        deadline: {
          not: null,
        },
        status: {
          not: {
            in: ["END", "NULL"],
          },
        },
      },
    });

    for (const info of infos) {
      const currentDate = new Date();
      const deadline = new Date(info.deadline);

      const diff = differenceInDays(deadline, currentDate);

      const newStatus = isAfter(currentDate, deadline)
        ? Status.END
        : diff <= 3
        ? Status.DEADLINE_APPROACHING
        : Status.RECRUITING;

      if (info.status !== newStatus) {
        await prisma.info.update({
          where: { id: info.id },
          data: { status: newStatus },
        });
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

export default updateStatus;
