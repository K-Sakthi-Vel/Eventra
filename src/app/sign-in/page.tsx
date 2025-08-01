'use client';

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <ClerkProvider>
      <div
        className={`font-sans antialiased  antialiased min-h-screen bg-gray-100 h-full`}
      >
        <main className="h-[100vh] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </h1>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up"  fallbackRedirectUrl ="/" />
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}
