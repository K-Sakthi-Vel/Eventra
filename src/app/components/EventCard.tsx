type Event = {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  tier: 'free' | 'silver' | 'gold' | 'platinum';
  event_date?: string;
};

const tierColors: Record<Event['tier'], string> = {
  free: 'bg-gray-700 text-gray-200',
  silver: 'bg-gray-300 text-gray-800',
  gold: 'bg-yellow-500 text-white',
  platinum: 'bg-purple-600 text-white',
};

export default function EventCard({ event }: { event: Event }) {
  const formattedDate = event.event_date
    ? new Date(event.event_date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Date TBD';

  const badgeColor = tierColors[event.tier] || 'bg-blue-800 text-blue-100';

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <img
        src={event.image_url || 'https://via.placeholder.com/400x160?text=No+Image'}
        alt={event.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-5 flex flex-col justify-between flex-1">
        <h3 className="text-xl font-semibold text-white mb-1">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-3">{event.description}</p>
        <p className="text-xs text-gray-500 mb-4">{formattedDate}</p>

        <span
          className={`self-start text-xs px-2 py-1 rounded-full uppercase tracking-wide font-medium ${badgeColor}`}
        >
          {event.tier} Tier
        </span>
      </div>
    </div>
  );
}
