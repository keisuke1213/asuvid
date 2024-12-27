import prisma from "../../../db";
import { subMonths } from "date-fns";
import { Info } from "../types/infoType";
import { differenceInDays, isAfter } from "date-fns";

type Status = "RECRUITING" | "DEADLINE_APPROACHING" | "END";

export const fetchListData = async (): Promise<
  (Info & { status: Status })[]
> => {
  const lastMonth = subMonths(new Date(), 1);

  const infos = await prisma.info.findMany({
    where: {
      createdAt: {
        gte: lastMonth,
      },
      deadline: {
        not: null,
      },
    },
    include: {
      dates: true,
    },
  });

  const updatedInfos = infos.map((info) => {
    const currentDate = new Date();
    const deadline = new Date(info.deadline!);
    const diff = differenceInDays(deadline, currentDate);

    let status: Status;
    if (isAfter(currentDate, deadline)) {
      status = "END";
    } else if (diff <= 3) {
      status = "DEADLINE_APPROACHING";
    } else {
      status = "RECRUITING";
    }

    return {
      ...info,
      status,
    };
  });

  return updatedInfos;
};
