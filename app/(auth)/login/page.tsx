'use client';
import LoadingTemplate from '@/app/loading';
import AdminLogin from '@/components/login';
import { addToast } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    throw error;
  }
}

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      verifyTokenOnServer(token)
        .then((tokenStatus) => {
          if (!tokenStatus.valid) {
            setIsLoading(false);
          } else {
            router.push('/view/dashboard');
          }
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <LoadingTemplate />;
  }
  return (
    <>
      <div className="h-screen p-12">
        <div className="w-full h-full grid grid-cols-2 gap-12">
          <div className="flex justify-center items-center">
            <p className="text-2xl w-2/3">
              <span className="text-8xl font-semibold text-primary">A</span>
              ccess your admin dashboard securely and manage your data with
              ease. Stay updated with the latest reports, user activities, and
              settings. Log in now to take control of your administrative tasks
              efficiently.
            </p>
          </div>
          <div className="flex items-center p-12 ">
            <div className="p-12 grid items-center w-full h-fit shadow-lg rounded-xl bg-default-100 ">
              <p className="text-3xl font-bold text-center">Login</p>
              <AdminLogin />
              {/* <Link href={'/'} className="text-blue-600 ">
                Forgot Password
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
