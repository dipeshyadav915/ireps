'use client';
import { SearchIcon } from '@/components/icons';
import { Input } from '@heroui/input';
import { useSearchParams, useRouter } from 'next/navigation';

export default function Search({ query }: { query?: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const handleSubmission = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query')?.toString().trim();
    if (!query) {
      window.location.href = '/tender';
    } else {
      params.set('query', query.toString());
      router.push(`?${params.toString()}`);
    }
  };
  return (
    <>
      <form
        action="/tender"
        className="w-full"
        onSubmit={(e) => {
          handleSubmission(e);
        }}
      >
        <Input
          classNames={{
            inputWrapper: 'bg-default-100 md:px-7 md:py-7 py-4 px-2 ',
            input: 'md:text-lg text-base ',
          }}
          labelPlacement="outside"
          name="query"
          defaultValue={query}
          placeholder="Find Tender..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
      </form>
    </>
  );
}
