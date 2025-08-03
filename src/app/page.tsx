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

  useEffect(() => {
    if (isLoaded && user?.publicMetadata?.tier) {
      const tier = (user.publicMetadata.tier as string).toLowerCase();
      if (['free', 'silver', 'gold', 'platinum'].includes(tier)) {
        setSelectedTier(tier as Tier);
      }
    }
  }, [isLoaded, user]);

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

  const filteredEvents = events.filter(
    (event) =>
      tierOrder.indexOf(event.tier.toLowerCase()) <=
      tierOrder.indexOf(selectedTier.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Tier-Based Event Showcase
        </h1>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
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
        <div className="bg-gray-900 p-5 rounded-xl border border-gray-700 mb-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-2">👤 User Info</h2>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Username:</span>{' '}
            {user.publicMetadata?.username?.toString() ?? 'N/A'}
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold">Tier:</span>{' '}
            {user.publicMetadata?.tier?.toString() ?? 'free'}
          </p>
        </div>
      ) : (
        <p className="text-gray-400">Loading user data...</p>
      )}

      {loading ? (
        <p className="text-gray-400 mt-6">Loading events...</p>
      ) : (
        <EventList events={filteredEvents} />
      )}
    </main>
  );
}
