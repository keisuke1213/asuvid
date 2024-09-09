import styles from "./CalendarPage.module.css";
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

  const events = infos.map((info) => {
    info.dates.forEach((date) => {
       event.push({
        id: date.id,
        title: info.name,
        start: date.date.split("T")[0],
      });
    })
  });
  return (
    <div className={styles.container}>
      <Calendar event={event} />
    </div>
  );
}
