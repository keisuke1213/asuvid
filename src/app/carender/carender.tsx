"use client";
import styles from "./CalendarPage.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FC } from "react";
import { useState } from "react";
import DetailModal from "./detailModal/DetailModal";

type Event = {
  id: string;
  infoId: number;
  title: string;
  content: string;
  deadline: string;
  url: string;
  start: string;
};

type CalenderProps = {
  event: Event[];
};

export const Calendar: FC<CalenderProps> = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<Event | null>(null);

  const handleClick = (clickInfo: any) => {
    clickInfo.jsEvent.preventDefault(); 
    setInfo(clickInfo.event.extendedProps as Event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setInfo(null);
  }

  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={event.map((e) => ({
          ...e,
          id: e.id,
          title: e.title,
          start: e.start,
          extendedProps: e, 
        }))}
        locale="ja"
        contentHeight="auto"
        eventClick={handleClick}
      />
      <DetailModal open={open} info={info} onClose={handleClose} />
    </div>
  );
};
