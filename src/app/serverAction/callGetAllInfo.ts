type Info = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  formUrl: string;
  dates: Date[];
}

type Date = {
  id: number;
  date: string;
  infoId: number;
}

export const callGetAllInfos = async (): Promise<Info[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.log("API URL is not defined");
  }
  try {
  const res = await fetch(apiUrl!, {cache: "no-store"});
  console.log(res);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const data = await res.json();
  console.log(data);
  return data
} catch (error: any) {
  console.error("Error:", error.message);
  return [];
}
};
