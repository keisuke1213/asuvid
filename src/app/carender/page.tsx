import { callGetAllInfos } from "../serverAction/callGetAllInfo";
import { Calendar } from "./carender";

type Event = {
  id: number;
  title: string;
  start: string;
};

export default async function CalendarPage() {
  const infos = await callGetAllInfos();
  const event: Event[] = [];

  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;


  const events = infos.map((info) => {
    info.dates.forEach((date) => {
      const cleanedTitle = info.name.replace(emojiRegex, "");
      event.push({
        id: date.id,
        title: cleanedTitle,
        start: date.date.split("T")[0],
      });
    });
  });
  return <Calendar event={event} />;
}
