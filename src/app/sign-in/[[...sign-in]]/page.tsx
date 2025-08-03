'use client';
import '../../globals.css';
import { ClerkProvider, SignIn, SignUpButton } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <ClerkProvider>
      <div className="font-sans antialiased min-h-screen bg-gray-100 h-full">
        <main className="h-[100vh] flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md rounded-xl bg-white p-8">
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Welcome Back
            </h1>
            <SignIn/>
            <div className="text-center mt-4">
              <span className="text-gray-600">Don’t have an account?</span>{' '}
              <SignUpButton>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Sign up
                </span>
              </SignUpButton>
            </div>
          </div>
        </main>
      </div>
    </ClerkProvider>
  );
}
