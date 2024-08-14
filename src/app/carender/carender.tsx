"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FC } from "react";

type Event = {
  id: number;
  title: string;
  start: string;
  end: string;
}[];

type CalendarProps = {
  events: Event;
};

export const Calendar: FC<CalendarProps> = ({ events }) => {
    const formattedEvents = events.map((event) => ({
      ...event,
      id: event.id.toString(),
    }));
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={formattedEvents}
    />
  );
};
