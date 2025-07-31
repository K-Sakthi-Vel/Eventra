// components/SignOutSection.tsx
'use client';

import { SignOutButton, UserButton } from '@clerk/nextjs';

export default function SignOutSection() {
  return (
    <div className="mt-4 flex items-center gap-4">
      <UserButton />
      <SignOutButton redirectUrl='/sign-in'/>
    </div>
  );
}
