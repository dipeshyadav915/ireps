'use client';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Btn({
  name,
  items,
}: {
  name: string;
  items: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortOrder, setSortOrder] = useState('');

  const handleClick = (item: string) => {
    if (item === 'reset') {
      setSortOrder('');
    } else {
      setSortOrder(item);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortOrder) {
      params.set('sort', sortOrder);
    } else {
      params.delete('sort');
    }
    router.push(`?${params.toString()}`);
  }, [sortOrder]);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button className="lg:w-44 md:text-base text-sm py-4 md:py-7 px-2 md:px-7  rounded-full bg-primary text-white font-semibold capitalize">
            {name}
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Dynamic Actions">
          {items.map((item, index) => (
            <DropdownItem
              className={`capitalize ${item === 'reset' && 'text-danger'}`}
              key={index}
              onPress={() => {
                handleClick(item);
              }}
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
