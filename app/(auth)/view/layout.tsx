'use client';
import LoadingTemplate from '@/app/loading';
import { ThemeSwitch } from '@/components/theme-switch';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthLink from '../authLinks';
import { addToast } from '@heroui/react';

// async function to verify token on the server
async function verifyTokenOnServer(token: string) {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Something went wrong');
    }
    return await response.json();
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    verifyTokenOnServer(token)
      .then((tokenStatus) => {
        if (!tokenStatus.valid) {
          addToast({
            title: 'Failed!',
            description: 'Your session has expired. Please log in again.',
            color: 'danger',
          });
          router.push('/login');
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        addToast({
          title: 'Failed!',
          description: 'Your session has expired. Please log in again.',
          color: 'danger',
        });
        router.push('/login');
      });
  }, [router]);
  if (isLoading) {
    return <LoadingTemplate />;
  }

  return (
    <div>
      <div className="flex fixed justify-between items-center w-full h-fit px-6 py-3 bg-default-100 z-20 shadow-md">
        <div className="flex justify-center gap-2">
          <img src="/main_logo.png" alt="logo" className="w-20" />
          <h2 className="text-2xl text-primary font-bold">IREPS</h2>
        </div>
        <div className="flex gap-4">
          <ThemeSwitch />
          <div className="font-black text-xl">Hi User!</div>
        </div>
      </div>

      <div className="flex">
        <AuthLink />

        {/* Main Content (Scrollable) */}
        <div className="relative flex-1 ml-64 mt-16 p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
