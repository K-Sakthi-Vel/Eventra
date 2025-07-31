// app/page.tsx
'use client';

import { useState } from 'react';
import EventFilter from './components/EventFilter';
import EventList from './components/EventList';

const allEvents = [
  { id: 1, title: 'Welcome Webinar', description: 'Kick-off for everyone', tier: 'Free' },
  { id: 2, title: 'Silver Strategy Talk', description: 'Insights for Silver users', tier: 'Silver' },
  { id: 3, title: 'Gold Growth Hacks', description: 'Advanced growth tactics', tier: 'Gold' },
  { id: 4, title: 'Platinum Private Session', description: '1:1 coaching', tier: 'Platinum' },
  { id: 5, title: 'Silver Social Night', description: 'Networking event', tier: 'Silver' },
];

export default function HomePage() {
  const [selectedTier, setSelectedTier] = useState<'Free' | 'Silver' | 'Gold' | 'Platinum'>('Free');

  const filteredEvents = allEvents.filter((event) =>
    ['Free', 'Silver', 'Gold', 'Platinum'].indexOf(event.tier) <=
    ['Free', 'Silver', 'Gold', 'Platinum'].indexOf(selectedTier)
  );

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tier-Based Event Showcase</h1>
      <EventFilter selectedTier={selectedTier} onSelect={setSelectedTier} />
      <EventList events={filteredEvents} />
    </main>
  );
}
