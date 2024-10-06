import { Carendar } from "./Carender";

type Event = {
  id: string;
  infoId: number;
  title: string;
  content: string;
  deadline: string;
  url: string;
  start: string;
};

type Info = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  formUrl: string;
  dates: Date[];
};

type Date = {
  id: number;
  date: string;
  infoId: number;
};

const fetchData = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL_CARENDER;
  if (!apiUrl) {
    console.log("API URL is not defined");
  }
  try {
    const res = await fetch(apiUrl!, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    return [];
  }
};

export default async function CalendarPage() {
  const infos: Info[] = await fetchData();
  const event: Event[] = [];

  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

  console.log(infos.map((info) => info.id));
  const events = infos.map((info) => {
    info.dates.forEach((date) => {
      const cleanedTitle = info.name.replace(emojiRegex, "");
      event.push({
        id: date.id.toString(),
        infoId: info.id,
        title: cleanedTitle,
        content: info.content,
        deadline: info.deadline,
        url: info.formUrl,
        start: date.date.split("T")[0],
      });
    });
  });
  return <Carendar event={event} />;
}
