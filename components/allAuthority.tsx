'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type auth = {
  id: number;
  name: string;
};

export default function AllAuthority() {
  const [seo, setSeo] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [authorities, setAuthority] = useState<auth[]>([]);

  const encodeSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s\-\(\),.&]/g, '')
      .replace(/-/g, `%232`)
      .replace(/\s+/g, '-')
      .trim();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/authority');
      const data = await response.json();
      setAuthority(data);
    } catch (err) {
      console.error('something went wrong ', err);
    }
  };

  const fetchSeo = async () => {
    let url = `/api/seo/authority`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setSeo(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchSeo();
  }, []);

  const filteredAuthorities = authorities.filter((authority) =>
    authority.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedAuthorities: { [key: string]: auth[] } = {};
  filteredAuthorities.forEach((authority: any) => {
    const firstLetter = authority.name.trim()[0]?.toUpperCase();
    const letterGroup = /^[A-Z]$/.test(firstLetter) ? firstLetter : '#';
    if (!groupedAuthorities[letterGroup]) groupedAuthorities[letterGroup] = [];
    groupedAuthorities[letterGroup].push(authority);
  });

  return (
    <>
      <div className="group flex items-center bg-primary fixed md:top-[10%] top-[15%] right-[3%] z-50 cursor-pointer transition-all duration-300 ease-in-out md:p-5 p-3 w-fit md:h-16 h-10 rounded-full">
        <input
          type="text"
          placeholder="Authority...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-primary text-white font-semibold md:h-10 h-7 outline-none transition-all duration-300 placeholder-white/70 w-0 opacity-0 group-hover:w-48 group-hover:opacity-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="md:size-6 size-4 transform transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">
        Authority Overview
      </h1>

      <div className="relative">
        <div className="fixed left-[2%] top-0 bottom-0 z-50 flex items-center">
          <div className="flex flex-col items-center overflow-y-auto max-h-screen">
            {Array.from('#ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
              <Link
                key={letter}
                href={`#${letter}`}
                className="text-secondary hover:text-primary text-sm font-bold p-1"
              >
                {letter}
              </Link>
            ))}
          </div>
        </div>

        {Object.keys(groupedAuthorities)
          .sort()
          .map((letterGroup) => (
            <div key={letterGroup} className="" id={letterGroup}>
              <h1 className="lg:mx-20 font-bold text-2xl text-primary p-6">
                {letterGroup}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-8">
                {groupedAuthorities[letterGroup].map((auth) => (
                  <div
                    key={auth.id}
                    className="relative bg-default-100 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
                  >
                    <Link
                      href={`/tender/authority/${encodeURIComponent(
                        encodeSlug(auth.name),
                      )}`}
                      key={auth.id}
                      className="flex gap-2 text-secondary md:text-xl text-sm"
                    >
                      <h2 className="text-xl md:text-2xl font-semibold text-secondary group-hover:underline">
                        {auth.name}
                      </h2>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {seo && (
        <div className="mt-16">
          <div className="box">
            <h1 className="mb-2 text-3xl font-bold capitalize">
              {seo.page_title}
            </h1>
            <div className="relative oes">
              <div className="font-serif max-h-[245px] w-full overflow-y-auto custom_scrollbar p-0 md:p-4 text-2xl">
                <div dangerouslySetInnerHTML={{ __html: seo.content }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
