import Link from 'next/link';

export default function ErrorTemplate() {
  return (
    <div className="text-center mx-auto mt-32 h-full">
      <div className="text-8xl font-black p-4">404 - Page Not Found</div>
      <div className="text-2xl">
        Sorry, we couldn&lsquo;t find what you were looking for.
      </div>
      <div className="flex gap-8 justify-center my-8">
        <Link href={'/tender'}>
          <button className="custom_button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
