'use client';

import { useUser, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs';
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
  const { user, isLoaded } = useUser(); // 👈 Clerk user hook

  const filteredEvents = allEvents.filter((event) =>
    ['Free', 'Silver', 'Gold', 'Platinum'].indexOf(event.tier) <=
    ['Free', 'Silver', 'Gold', 'Platinum'].indexOf(selectedTier)
  );

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tier-Based Event Showcase</h1>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton />
            <SignOutButton />
          </SignedIn>
        </div>
      </div>

      {/* Show user metadata if signed in and loaded */}
      {isLoaded && user? (
        <div className="mb-4 p-4 bg-black-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">User Metadata</h2>
          <p><strong>Username:</strong> {JSON.parse(JSON.stringify(user.publicMetadata)).username || 'N/A'}</p>
          <p><strong>User Tier:</strong> {JSON.parse(JSON.stringify(user.publicMetadata)).tier || 'N/A'}</p>
        </div>
      ):"Loading"}

      <EventFilter selectedTier={selectedTier} onSelect={setSelectedTier} />
      <EventList events={filteredEvents} />
    </main>
  );
}
