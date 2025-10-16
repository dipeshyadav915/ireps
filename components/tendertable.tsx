'use client';
import { useState, useEffect } from 'react';
import { Pagination } from '@heroui/pagination';
import { Button } from '@heroui/button';
import { Spinner } from '@heroui/spinner';
import { useSearchParams, useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import ShareModal from './shareModal';

import {
  Arrowpagination,
  Infinitescrolling,
  Flexbox,
  Gridlayout,
} from '@/components/icons';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';

import Link from 'next/link';
import Search from '@/components/search';
import Btn from '@/components/sort';
import ScrollButton from './scrollbtn';
import ErrorTemplate from '@/app/error';
import LoadingTemplate from '@/app/loading';

export default function Tendertable({
  query,
  secSlugId,
  authSlugId,
}: {
  query?: string;
  secSlugId?: string;
  authSlugId?: string;
}) {
  const { ref, inView } = useInView({});
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  //useStates
  const [count, setCount] = useState(0);
  const [tenders, setTenders] = useState<any>([]);
  const [seo, setSeo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState(0);
  const [paginnationType, setPaginnationType] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [tenderId, setTenderId] = useState(0);

  //params value
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentPageSize = parseInt(searchParams.get('pageSize') || '25');
  const sortBy = searchParams.get('sort');

  //some constant
  const totalPages = Math.ceil(count / currentPageSize);
  const pageSizes = ['25', '50', '100', '250', '500'];

  //decode the slug
  const decodeSlug = (name: string) => {
    return name.replace(/-/g, ' ').replace(/%232/g, '-').trim();
  };

  //fetching tender
  const fetchTenders = async () => {
    let url;

    url = `/api/tenders?page=${currentPage}&pagesize=${currentPageSize}`;

    if (query) {
      url += `&search=${query}`;
    }
    if (secSlugId) {
      url += `&sec=${secSlugId}`;
    }
    if (authSlugId) {
      url += `&auth=${authSlugId}`;
    }
    if (sortBy) {
      url += `&sort=${sortBy}`;
    }

    try {
      const response = await fetch(url, { credentials: 'omit' });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();

      setCount(data.count);
      if (paginnationType) {
        setTenders((prevTender: any) => [...prevTender, ...data.tender]);
      } else {
        setTenders(data.tender);
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTenders();
  }, [searchParams]);

  //fetching seoData
  const fetchSeo = async () => {
    let url = `/api/seo`;

    if (secSlugId) {
      url += `/sector?&id=${secSlugId}`;
    }
    if (authSlugId) {
      url += `/authority?&id=${authSlugId}`;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setSeo(null);

        return;
      }
      const data = await response.json();

      setSeo(data);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (secSlugId || authSlugId) {
      fetchSeo();
    }
  }, []);

  //fetching More for infinite scrolling
  useEffect(() => {
    if (inView && totalPages >= currentPage + 1) {
      params.set('page', (currentPage + 1).toString());
      router.push(`?${params.toString()}`);
    }
  }, [inView]);

  // handling function
  const handlePageSize = (item: string) => {
    params.set('pageSize', item.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePagination = (newPage: number) => {
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const openShareModal = () => setShareModal(true);
  const closeShareModal = () => setShareModal(false);

  return (
    <>
      <ShareModal
        isOpen={shareModal}
        tenderId={tenderId}
        onClose={closeShareModal}
      />
      <ScrollButton />

      {/* searchbar and section  */}
      <div className="flex items-center md:gap-3 gap-2 pb-10">
        <Search query={query} />
        <Btn
          items={['value', 'emd value', 'published date', 'reset']}
          name={`${searchParams.get('sort') || 'Sort By'}`}
        />

        <div className="md:flex justify-center">
          {paginnationType == 0 ? (
            <button
              className="flex md:size-12 size-8 items-center"
              onClick={() => {
                setPaginnationType(1);
              }}
            >
              <Arrowpagination size={50} />
            </button>
          ) : (
            <button
              className="flex gap-0 items-center md:size-12 size-8"
              onClick={() => {
                setPaginnationType(0);
              }}
            >
              <Infinitescrolling size={50} />
            </button>
          )}
        </div>

        <div className=" hidden lg:block">
          {layout == 0 ? (
            <button
              onClick={() => {
                setLayout(1);
              }}
            >
              <Flexbox size={40} />
            </button>
          ) : (
            <button
              onClick={() => {
                setLayout(0);
              }}
            >
              <Gridlayout size={40} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        {/*  */}
        {tenders.length != 0 && (
          <div
            className={`pb-4 md:text-xl text-sm capitalize  ${
              query || secSlugId || authSlugId ? 'block' : 'hidden'
            }`}
          >
            Result for &quot;
            <span className="font-bold">
              {query
                ? decodeSlug(query)
                : secSlugId
                  ? decodeSlug(decodeURIComponent(secSlugId))
                  : authSlugId && decodeSlug(decodeURIComponent(authSlugId))}
            </span>
            &quot;
          </div>
        )}

        {loading == true ? (
          <LoadingTemplate />
        ) : tenders.length != 0 ? (
          <>
            {layout === 1 ? (
              // three grid

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
                {tenders.map((tender: any) => {
                  return (
                    <div key={tender.fld_id} className="card2 tender gap-10">
                      <div className="p-4">
                        <p className="mb-5 text-2xl font-bold capitalize">
                          {tender.tnd_title
                            ? tender.tnd_title.length > 70
                              ? tender.tnd_title.toLowerCase().slice(0, 70) +
                                '...'
                              : tender.tnd_title.toLowerCase()
                            : '----'}
                        </p>
                        <Link href={`/tender/${tender.fld_id}`}>
                          <p className="hover:text-primary text-md md:text-xl text-default-500 capitalize break-all">
                            {tender.tender_details.length > 400
                              ? tender.tender_details
                                  .toLowerCase()
                                  .slice(0, 400) + '...'
                              : tender.tender_details.toLowerCase()}
                          </p>
                        </Link>
                      </div>
                      <div className="flex justify-between items-end ">
                        <div className="grid gap-3">
                          <div className=" px-4 rounded-full ">
                            <p className="text-sm text-default-400 font-semibold">
                              Value
                            </p>
                            <p className="text-2xl font-black font-sans">
                              {tender.tender_amnt_val
                                ? `₹ ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.tender_amnt_val)}`
                                : '0.00'}
                            </p>
                          </div>
                          <div className=" px-4 rounded-full  ">
                            <p className="text-sm text-default-400 font-semibold">
                              EMD Value
                            </p>
                            <p className="text-2xl font-black font-sans">
                              {tender.tender_emd_amnt_val
                                ? `₹  ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.tender_emd_amnt_val)}  `
                                : '0.00'}
                            </p>
                          </div>
                          <div className="px-4 rounded-full">
                            <p className="text-sm text-default-400 font-semibold ">
                              Published Date
                            </p>
                            <p className="text-lg font-semibold ">
                              {tender.dates && tender.dates.tnd_published_date
                                ? new Date(
                                    tender.dates.tnd_published_date,
                                  ).toLocaleDateString()
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="">
                          <Link href={`/tender/${tender.fld_id}`}>
                            <Button
                              color="secondary"
                              className="text-lg md:p-8 p-7 rounded-full font-semibold align-baseline text-background hover:bg-primary hover:text-secondary"
                            >
                              Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-10">
                {tenders.map((tender: any) => {
                  return (
                    <div
                      className="card2 tender cursor-default"
                      key={tender.fld_id}
                    >
                      <div className="flex justify-between">
                        <p className="mb-4 md:text-2xl text-base font-bold capitalize">
                          {tender.tnd_title
                            ? tender.tnd_title.length > 70
                              ? tender.tnd_title.toLowerCase().slice(0, 70) +
                                '...'
                              : tender.tnd_title.toLowerCase()
                            : '----'}
                        </p>
                        <div className="flex md:gap-1">
                          {(tender.city || tender.states || tender.country) && (
                            <svg
                              className="md:size-6 size-4 text-primary"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={1.5}
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                              />
                            </svg>
                          )}
                          <span className="md:text-xl text-sm">
                            {tender.city ? tender.city.city_name + ', ' : ''}
                          </span>
                          <span className="md:text-xl text-sm">
                            {tender.states
                              ? tender.states.state_name + ', '
                              : ''}
                          </span>
                          <span className="md:text-xl text-sm">
                            {tender.country ? tender.country.country_name : ''}
                          </span>
                        </div>
                      </div>
                      <Link href={`/tender/${tender.fld_id}`}>
                        <p className="hover:text-primary text-sm  md:text-xl text-default-500 capitalize break-all">
                          {tender.tender_details.length > 400
                            ? tender.tender_details
                                .toLowerCase()
                                .slice(0, 400) + '...'
                            : tender.tender_details.toLowerCase()}
                        </p>
                      </Link>
                      <div className="flex justify-between items-end ">
                        <div className="grid lg:flex  grid-cols-2 gap-3">
                          <div className=" px-4 rounded-full ">
                            <p className="md:text-sm text-xs text-default-400 font-semibold">
                              Value
                            </p>
                            <p className="text-base font-black font-sans">
                              {tender.tender_amnt_val
                                ? `₹ ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.tender_amnt_val)}`
                                : '0.00'}
                            </p>
                          </div>
                          <div className=" px-4 rounded-full  ">
                            <p className="md:text-sm text-xs text-default-400 font-semibold">
                              EMD Value
                            </p>
                            <p className="text-base font-black font-sans text-nowrap">
                              {tender.tender_emd_amnt_val
                                ? `₹ ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.tender_emd_amnt_val)}`
                                : '0.00'}
                            </p>
                          </div>
                          <div className="px-4 rounded-full">
                            <p className="md:text-sm text-xs text-default-400 font-semibold">
                              Published Date
                            </p>
                            <p className="text-base font-semibold ">
                              {tender.dates && tender.dates.tnd_published_date
                                ? new Date(
                                    tender.dates.tnd_published_date,
                                  ).toLocaleDateString()
                                : 'N/A'}
                            </p>
                          </div>
                          <div className="px-4 rounded-full">
                            <p className="md:text-sm text-xs text-default-400 font-semibold">
                              Tender Id
                            </p>
                            <p className="text-base font-semibold ">
                              {tender.gg_tender_id
                                ? tender.gg_tender_id
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Link href={`/tender/${tender.fld_id}`}>
                            <Button
                              color="secondary"
                              className="md:text-lg text-sm md:px-8 md:py-8 px-2 py-4 rounded-full font-semibold align-baseline text-background hover:bg-primary hover:text-secondary !min-w-fit"
                            >
                              <span className="hidden md:block">Details</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 md:hidden block"
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
                            </Button>
                          </Link>
                          <div className="w-fit">
                            <button
                              className="md:p-5 p-3 bg-secondary text-background rounded-full backdrop-blur-sm hover:text-primary"
                              onClick={() => {
                                openShareModal();
                                setTenderId(tender.fld_id);
                              }}
                            >
                              <svg
                                className="md:size-6 size-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className=" text-primary mt-20">
              {paginnationType == 0 ? (
                //normal pagination
                <div className="flex justify-between">
                  <Pagination
                    color="primary"
                    siblings={0}
                    // size="lg"
                    initialPage={parseInt(searchParams.get('page') || '1')}
                    total={totalPages}
                    onChange={(newPage: any) => handlePagination(newPage)}
                  />
                  <div className="flex gap-4">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button className="md:text-lg text-sm md:p-8 p-3 rounded-full bg-primary text-white font-semibold capitalize">
                          Page size
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Dynamic Actions">
                        {pageSizes.map((item, index) => (
                          <DropdownItem
                            key={index}
                            onPress={() => {
                              handlePageSize(item);
                            }}
                            className="capitalize"
                          >
                            {item}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              ) : (
                //infinite scroling
                <div ref={ref}>
                  {inView ? (
                    !(totalPages >= currentPage + 1) ? (
                      <p className="font-semibold text-2xl text-center text-secondary px-7 py-5">
                        Look like you reach the end !
                      </p>
                    ) : (
                      <div className="flex justify-center">
                        <Spinner label="Loading..." color="primary" />
                      </div>
                    )
                  ) : (
                    <p className="font-semibold text-2xl text-white px-7 py-5 text-center">
                      Scroll down to load more
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          // incase of any error
          <ErrorTemplate
            message="We Couldn't Find Any Results.
           Try again! "
          />
        )}
      </div>

      {/* pagination */}

      {/* seo div */}
      {seo && (
        <div>
          <div className="box">
            <h1 className="mb-5 text-3xl font-bold capitalize">
              {seo.page_title}
            </h1>
            <div className="relative oes">
              <div className="max-h-[245px] w-full overflow-y-auto custom_scrollbar p-0 md:p-4 text-2xl font-serif">
                <div dangerouslySetInnerHTML={{ __html: seo.content }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
