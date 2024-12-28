import prisma from "../../../db";
import { subMonths } from "date-fns";
import { Info } from "../types/infoType";
import { differenceInDays, isAfter } from "date-fns";

type Status = "RECRUITING" | "DEADLINE_APPROACHING";

export const dynamic = "force-dynamic";

export const fetchListData = async (): Promise<
  (Info & { status: Status })[]
> => {
  const currentDate = new Date();
  const infos = await prisma.info.findMany({
    where: {
      deadline: {
        gt: currentDate,
      },
    },
    include: {
      dates: true,
    },
  });

  const updatedInfos = infos.map((info) => {
    const deadline = new Date(info.deadline!);
    const diff = differenceInDays(deadline, currentDate);

    let status: Status;
    if (diff < 3) {
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
