// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import SignOutSection from '../components/SignOutSection'; // Adjust path as needed

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        {userId ? `Welcome, user ${userId}` : 'Please sign in'}
      </h1>

      {userId && <SignOutSection />}
    </div>
  );
}
