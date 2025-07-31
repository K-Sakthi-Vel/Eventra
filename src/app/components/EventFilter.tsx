// app/components/EventFilter.tsx
type Tier = 'Free' | 'Silver' | 'Gold' | 'Platinum';

export default function EventFilter({
  selectedTier,
  onSelect,
}: {
  selectedTier: Tier;
  onSelect: (tier: Tier) => void;
}) {
  const tiers: Tier[] = ['Free', 'Silver', 'Gold', 'Platinum'];

  return (
    <div className="flex gap-2 flex-wrap">
      {tiers.map((tier) => (
        <button
          key={tier}
          onClick={() => onSelect(tier)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            selectedTier === tier
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {tier}
        </button>
      ))}
    </div>
  );
}
