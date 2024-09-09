"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FC } from "react";

type Event = {
  id: number;
  title: string;
  start: string;
};

type CalenderProps = {
  event: Event[];
};

export const Calendar: FC<CalenderProps> = ({ event }) => {
  const formattedEvents = event.map((event) => ({
    ...event,
    id: event.id.toString(),
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
      locale="ja"
      contentHeight="auto"
    />
  );
};
