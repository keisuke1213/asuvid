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
};