import styles from "./CalendarPage.module.css";
import { getInfos } from "../serverAction/getInfo";
import { Calendar } from "./carender";

export default async function CalendarPage() {
  const infos = await getInfos();

  const events = infos.map((info) => ({
    id: info?.id,
    title: info.name,
    start: info.date, 
    end: info.deadline 
  }));
  return (
    <div className={styles.container}>
      <h1>カレンダー</h1>
      <Calendar events={events} />
    </div>
  );
}
