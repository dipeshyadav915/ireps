'use client';
import Link from 'next/link';

export default function ErrorTemplate({ message }: { message: string }) {
  return (
    <div className="text-center mx-auto  h-full">
      <div className="text-8xl font-black p-4">Opps!</div>
      <div className="text-2xl">{message}</div>
      <div className="flex gap-8 justify-center my-8">
        <Link href={'/'}>
          <button className="custom_button">
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
