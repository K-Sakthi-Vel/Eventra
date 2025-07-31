// app/components/EventCard.tsx
type Event = {
  id: number;
  title: string;
  description: string;
  tier: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold">{event.title}</h3>
      <p className="text-sm text-gray-600">{event.description}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
        {event.tier} Tier
      </span>
    </div>
  );
}
