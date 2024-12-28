import { Info } from "../types/infoType";
import { differenceInDays, isAfter } from "date-fns";
import { InfoWithStatus, Status } from "../types/infoType";

export const updateStatus = (infos: Info[]): InfoWithStatus[] => {
  return infos.map((info) => {
    const currentDate = new Date();
    let status: Status;

    if (info.deadline) {
      const deadline = new Date(info.deadline!);
      const diff = differenceInDays(deadline, currentDate);
      if (isAfter(currentDate, deadline)) {
        status = "END";
      } else if (diff < 3) {
        status = "DEADLINE_APPROACHING";
      } else {
        status = "RECRUITING";
      }
    } else {
      status = "NULL";
    }

    return {
      ...info,
      status,
    };
  });
};
