'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function SetMetadataPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const updateMetadata = async () => {
      if (user) {
        // @ts-ignore – Clerk allows this, but it's not in the types

        router.push('/'); // Redirect to home
      }
    };

    if (isLoaded) updateMetadata();
  }, [user, isLoaded, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Setting up your account...</p>
    </div>
  );
}
