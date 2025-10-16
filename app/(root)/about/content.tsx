'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Content() {
  const [content, setContent] = useState<any>([]);

  const fetchAboutContent = async () => {
    const currentPath = window.location.pathname;

    try {
      const response = await fetch(`/api/aboutContent?url=${currentPath}`);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setContent(data);
    } catch (error: any) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchAboutContent();
  }, []);

  return (
    <>
      <div className="px-4 py-4 relative overflow-hidden md:min-h-screen md:max-h-fit h-fit ">
        <div className="lg:w-[29rem] w-[15rem] aspect-square rounded-full blur-2xl gradient absolute lg:-right-[8%] -right-[30%] lg:top-[35%] top-[18%] wiggle2 opacity-80"></div>
        <div className="lg:w-[34rem] w-[20rem] aspect-square rounded-full blur-2xl gradient absolute lg:-right-[6%] -right-[40%] lg:top-[5%] top-[3%] wiggle opacity-80"></div>

        <div className="lg:px-10 mt-20 py-4 relative z-20 flex flex-col justify-center items-center lg:items-start  ">
          <h1 className="text-4xl md:text-7xl leading-none lg:text-9xl font-bold text-center lg:text-left ">
            <p className="leading-none"> Powering Your Digital </p>
            <span className="text-primary">Transformation</span>
          </h1>
          <p className="text-base lg:text-2xl lg:w-2/3 md:w-3/4 w-full px-4 lg:my-16 my-10 text-default-500 leading-tight text-center lg:text-left">
            {content?.hero_content}
          </p>
          <div className="flex gap-8">
            <Link href="/contact">
              <button className="custom_button">Contact Us</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5 lg:p-28 h-fit ">
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-around items-center lg:gap-20 gap-12">
          <div>
            <p className="lg:text-7xl text-3xl font-bold text-inherit my-8">
              Who We Are
              <span className="lg:text-8xl text-5xl font-bold text-primary">
                ?
              </span>
            </p>
            <p className="text-base md:text-2xl">{content?.who_we_are}</p>
          </div>

          <div className="rounded-3xl overflow-hidden">
            <img
              src="/about_img.avif"
              alt="Team_image"
              className="object-cover w-full hover:scale-110 duration-700"
            />
          </div>
        </div>
      </div>

      {/* why we */}
      <div className="lg:p-28 p-5 h-fit bg-default-100">
        <p className="lg:text-7xl text-3xl font-bold leading-tight text-inherit">
          Why We
          <span className="lg:text-8xl text-5xl font-bold text-primary">?</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 my-8 text-center text-lg">
          <div className="p-5 md:p-10 bg-background flex flex-col items-center hover:shadow-xl shadow-inherit duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="md:size-12 size-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <div className="md:text-2xl text-xl font-semibold my-4">
              Targeted Keyword Lookup
            </div>
            <p className="text-base md:text-xl">
              {content?.targeted_keyword_lookup}
            </p>
          </div>

          <div className="p-5 md:p-10 bg-background flex flex-col items-center hover:shadow-xl shadow-inherit duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="md:size-12 size-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <div className="md:text-2xl text-xl font-semibold my-4">
              Structured Listing
            </div>
            <p className="text-base md:text-xl">
              {content?.structured_listing}
            </p>
          </div>
          <div className="p-5 md:p-10 bg-background flex flex-col items-center hover:shadow-xl shadow-inherit duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="md:size-12 size-10 text-primary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>

            <div className="text-xl md:text-2xl  font-semibold my-4">
              Advanced Filtering Options
            </div>
            <p className="text-base md:text-xl">
              {content?.advanced_filtering_options}
            </p>
          </div>
        </div>
      </div>
      {/* vision */}

      <div className="md:my-20 my-10 lg:px-48 px-4 md:px-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 md:gap-16 gap-8">
          <div className="bg-default-100 px-4 lg:px-24 lg:py-16 py-7 text-center hover:shadow-xl shadow-inherit duration-300 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-24 text-primary "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <p className="md:text-3xl text-sm font-bold"> Our vision</p>
            <p className="md:text-xl text-base p-3">{content?.our_vision}</p>
          </div>
          <div className="bg-default-100 px-4 lg:px-24 lg:py-16 py-7 text-center hover:shadow-xl shadow-inherit duration-300 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-24  text-primary "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
              />
            </svg>

            <p className="md:text-3xl text-sm font-bold">Our Mission</p>
            <p className="md:text-xl text-base p-3">{content?.our_mission}</p>
          </div>
        </div>
      </div>
    </>
  );
}
