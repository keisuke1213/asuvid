type Info = {
  id: number;
  name: string;
  date: string;
  deadline: string;
  formUrl: string;
};

export const getInfos = async (): Promise<Info[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API URL is not defined");
  }
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json();
  return data;
};
