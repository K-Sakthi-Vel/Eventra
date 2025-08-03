'use client';

import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import EventList from './components/EventList';
import Image from 'next/image';
import Logo from '../assets/Icon.webp';
type Tier = 'free' | 'silver' | 'gold' | 'platinum';

const tierColors: Record<Event['tier'], string> = {
  free: 'bg-gray-700 text-gray-200',
  silver: 'bg-gray-300 text-gray-800',
  gold: 'bg-yellow-500 text-white',
  platinum: 'bg-purple-600 text-white',
};

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
   const tier = user?.publicMetadata?.tier?.toString()?.toLowerCase();

const badgeColor =
  tier && ['free', 'silver', 'gold', 'platinum'].includes(tier)
    ? tierColors[tier as Tier]
    : 'bg-blue-800 text-blue-100';


  return (
    <main className="min-h-screen bg-black text-white md:px-10">
      <div className="flex px-5 md:px-0 items-center justify-between mb-6 sticky top-0 z-50 bg-inherit shadow">
        <div className="flex items-center h-[100px] gap-2 ">
          <Image src={Logo} alt='logo' className='h-[50px] w-[50px]' />
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Eventra
          </h1>
        </div>

        <div className="flex items-center gap-3 md:mt-0">

          <div className={`px-3 py-1 mr-2 mt-0.5 ${badgeColor} rounded-full`}>
            {(user?.publicMetadata?.tier?.toString() ?? 'free')
              .charAt(0)
              .toUpperCase() + (user?.publicMetadata?.tier?.toString() ?? 'free').slice(1)}
          </div>
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'custom-user-avatar',
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <EventList events={filteredEvents} />
      )}
    </main>
  );
}
