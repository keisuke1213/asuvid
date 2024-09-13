import { PrismaClient } from "@prisma/client";
import { differenceInDays, isAfter } from "date-fns";
import { Status } from "@prisma/client";

const updateStatus = async () => {
  const prisma = new PrismaClient();
  try {
    const infos = await prisma.info.findMany();

    for (const info of infos) {
      if (!info.deadline) continue;

      const currentDate = new Date();
      const deadline = new Date(info.deadline);

      const diff = differenceInDays(deadline, currentDate);

      const newStatus = isAfter(currentDate, deadline)
        ? Status.END
        : diff <= 3
        ? Status.DEADLINE_APPROACHING
        : Status.END;

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
