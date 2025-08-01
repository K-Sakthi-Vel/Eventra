'use client';

import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import EventList from './components/EventList';

type Tier = 'free' | 'silver' | 'gold' | 'platinum';

type Event = {
  id: number;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: Tier;
};

export default function HomePage() {
  const { user, isLoaded } = useUser();
  const [selectedTier, setSelectedTier] = useState<Tier>('free');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Set user tier from metadata
  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.tier) {
      const tier = (user.publicMetadata.tier as string).toLowerCase();
      if (['free', 'silver', 'gold', 'platinum'].includes(tier)) {
        setSelectedTier(tier.charAt(0).toUpperCase() + tier.slice(1) as Tier);
      }
    }
  }, [isLoaded, user]);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data as Event[]);
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const tierOrder = ['free', 'silver', 'gold', 'platinum'];

  const filteredEvents = events.filter((event) => {
    return (
      tierOrder.indexOf(event.tier.toLowerCase()) <=
      tierOrder.indexOf(selectedTier.toLowerCase())
    );
  });

  console.log("filer", filteredEvents)

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
            <SignOutButton redirectUrl="/sign-in" />
          </SignedIn>
        </div>
      </div>

      {isLoaded && user ? (
        <div className="mb-4 p-4 bg-black-100 rounded-md">
          <h2 className="text-xl font-semibold mb-2">User Metadata</h2>
          <p>
            <strong>Username:</strong> {user.publicMetadata?.username?.toString() ?? 'N/A'}
          </p>
          <p>
            <strong>User Tier:</strong>{' '}
            {user.publicMetadata?.tier?.toString() ?? 'free'}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading user data...</p>
      )}

      {loading ? (
        <p className="text-gray-500 mt-6">Loading events...</p>
      ) : (
        <EventList events={filteredEvents} />
      )}
    </main>
  );
}
