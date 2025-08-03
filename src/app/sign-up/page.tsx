'use client';

import { ClerkProvider, SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
          <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Create your account
          </h1>
          <SignUp
            appearance={{ elements: { formButtonPrimary: 'bg-black' } }}
          />
        </div>
      </div>
    </ClerkProvider>
  );
}
