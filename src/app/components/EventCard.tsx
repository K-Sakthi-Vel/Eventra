type Event = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tier: string;
};

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Optional Image */}
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="p-5 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-bold mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400">{event.description}</p>
        <span className="mt-4 self-start text-xs px-2 py-1 bg-blue-800 text-blue-100 rounded-full uppercase tracking-wide">
          {event.tier} Tier
        </span>
      </div>
    </div>
  );
}
