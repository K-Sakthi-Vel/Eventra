// app/components/EventList.tsx
import EventCard from './EventCard';

type Event = {
  id: number;
  title: string;
  description: string;
  tier: string;
};

export default function EventList({
  events,
}: {
  events: Event[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
