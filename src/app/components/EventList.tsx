import EventCard from './EventCard';

type Event = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tier: string;
};

export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
