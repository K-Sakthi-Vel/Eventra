'use client';

import { ClerkProvider, SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
          <SignUp
            appearance={{ elements: { formButtonPrimary: 'bg-black' } }}
          />
      </div>
    </ClerkProvider>
  );
}
