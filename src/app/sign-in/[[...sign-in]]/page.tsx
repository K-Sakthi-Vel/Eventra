'use client';
import Link from 'next/link';
import '../../globals.css';
import { ClerkProvider, SignIn, SignUpButton } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <ClerkProvider>
      <div className="font-sans antialiased min-h-screen bg-gray-100 h-full">
        <main className="h-[100vh] flex items-center justify-center px-4">
          <div className="flex flex-col items-center w-full max-w-md rounded-xl bg-white py-5">
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </h1>
            <div>
              <SignIn />

            </div>
            <div className="text-center mt-4">
              <span className="text-gray-600">Don’t have an account?</span>{' '}
              <Link href="/sign-up">
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}
