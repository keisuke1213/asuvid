import { PrismaClient } from "@prisma/client";
import { differenceInDays, isAfter } from "date-fns";
import { Status } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("called!");
  const prisma = new PrismaClient();
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
      if (!info.deadline || info.status === Status.NULL || Status.END) continue;

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
