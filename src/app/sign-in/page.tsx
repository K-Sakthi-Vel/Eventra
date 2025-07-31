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
        className={`font-sans antialiased  antialiased min-h-screen bg-gray-100`}
      >
        <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white shadow-sm">
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>

        <main className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </h1>
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}
