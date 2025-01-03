export type Info = {
  id: number;
  name: string;
  content: string;
  deadline: string | null;
  formUrl: string | null;
  dates: DateType[] | null;
  status: string;
  type: string;
};

type DateType = {
  id: number;
  date: string;
  infoId: number;
};

export type InfoContainer = {
  info: Info;
  isSessionValid: boolean;
};

export type InfoWithStatus = Info & { status: Status };
export type Status = "RECRUITING" | "DEADLINE_APPROACHING" | "END" | "NULL";
