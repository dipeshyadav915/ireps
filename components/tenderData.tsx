'use client';
import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import Link from 'next/link';
import Popup from '@/components/modal';
import ErrorTemplate from '@/app/error';
import LoadingTemplate from '@/app/loading';
import ShareModal from './shareModal';
import { timeStamp } from 'console';

export default function TenderData({ tenderId }: { tenderId: string }) {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openShareModal = () => setShareModal(true);
  const closeShareModal = () => setShareModal(false);

  const fetchTenderData = async () => {
    try {
      const response = await fetch(`/api/tenders/${tenderId}`, {
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tenderdata');
      }

      const data = await response.json();
      setTenders(data);

      setLoading(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTenderData();
    let tenderReqIds = JSON.parse(localStorage.getItem('tenderReq')) || {
      values: [],
      timeStamp: null,
    };

    if (tenderReqIds.timeStamp) {
      let now = new Date().getTime();
      let twentyFourHours = 24 * 60 * 60 * 1000;
      // let oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

      if (now - tenderReqIds.timeStamp > twentyFourHours) {
        localStorage.removeItem('tenderReq');
      }
    }

    if (!tenderReqIds.values.includes(tenderId)) {
      setTimeout(() => {
        openModal();
      }, 3000);
    }
  }, []);

  return (
    <>
      <Popup isOpen={isOpen} onClose={closeModal} tenderId={tenderId} />
      <ShareModal isOpen={shareModal} onClose={closeShareModal} />
      {tenders.length != 0 ? (
        tenders.map((tender: any) => (
          <div key={tender.fld_id}>
            <div className="relative">
              <div className="px-4 py-24 lg:px-24 lg:py-32  grid gap-10 bg-default-100">
                <p className="px-0 md:px-20 md:text-5xl text-xl font-bold leading-tight text-center capitalize">
                  {tender.tnd_title
                    ? tender.tnd_title.toLowerCase()
                    : '--Title--'}
                </p>
                <div className="relative">
                  <div className="md:max-h-[245px]  max-h-[120px] w-full overflow-y-auto custom_scrollbar p-0 md:p-4">
                    <p className="md:text-xl text-sm text-center capitalize">
                      {tender.tender_details
                        ? tender.tender_details.toLowerCase()
                        : '..Description..'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex md:gap-6 gap-3 mt-10 md:pb-20 pb-10">
                    <Link href="#basic-info" className="hidden md:block">
                      <Button className="md:text-lg text-base md:px-6 md:py-8 px-3 py-6 rounded-full bg-primary font-semibold align-baseline text-white">
                        Get Information
                      </Button>
                    </Link>
                    <div className="text-sm md:text-lg md:px-6 md:py-5 px-3 py-4 rounded-full bg-background hover:bg-default-200 font-semibold align-baseline">
                      <button onClick={openModal}>View Details</button>
                    </div>
                  </div>

                  <div className="md:text-xl text-base font-semibold">
                    <div className="flex md:gap-1">
                      {(tender.city || tender.states || tender.country) && (
                        <svg
                          className="md:size-6 size-5 text-primary"
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
                      <span>
                        {tender.city ? tender.city.city_name + ', ' : ''}
                      </span>
                      <span>
                        {tender.states ? tender.states.state_name + ', ' : ''}
                      </span>
                      <span>
                        {tender.country ? tender.country.country_name : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5 right-[2%] w-fit ">
                <button
                  className="p-3 bg-secondary/25 text-white rounded-full backdrop-blur-sm"
                  onClick={openShareModal}
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

              <div className="box-align md:-bottom-[80px] -bottom-[15vw] ">
                <div className="flex justify-evenly bg-background md:px-10 md:py-12 px-4 py-7 rounded-full shadow-lg shadow-default-200 dark:shadow-default-100 items-center">
                  <div className="grid text-center">
                    <div className="font-bold md:text-3xl text-base">
                      {tender.dates.tnd_published_date
                        ? tender.dates.tnd_published_date
                        : 'YYYY-MM-DD'}
                    </div>
                    <p className="md:text-base text-xs">Published At</p>
                  </div>
                  <hr className="hr-1 rotate-90 w-20" />
                  <div className="grid text-center">
                    <div className="font-bold md:text-3xl text-base">
                      {tender.submission_end_date
                        ? new Date(tender.submission_end_date)
                            .toISOString()
                            .split('T')[0]
                        : 'YYYY-MM-DD'}
                    </div>
                    <p className="md:text-base text-xs">Deadline</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="md:px-20 px-4 md:pt-40 pt-28 text-2xl "
              id="basic-info"
            >
              <div className=" my-8">
                <p className="heading">Basic Information</p>

                <div className="box relative">
                  <span className="absolute left-0 top-0 -translate-y-1/3 -translate-x-1/3 bg-primary text-white border-5 border-background md:text-base text-xs font-semibold px-2 py-1 rounded-full z-30">
                    {tender.otherInfo.tnd_type
                      ? tender.otherInfo.tnd_type
                      : 'Open'}
                  </span>

                  <div className="grid md:grid-cols-4 grid-cols-1 gap-4 justify-between items-baseline gap-">
                    <div className="md:col-span-3 grid gap-12  ">
                      <div>
                        <p className="font-bold text-primary text-xl lg:text-2xl">
                          {tender.tnd_title ? tender.tnd_title : '---'}
                        </p>
                      </div>
                      <div className="overflow-y-auto max-h-[140px] custom_scrollbar">
                        <p className="text-sm capitalize lg:text-xl">
                          {tender.tender_details.toLowerCase()}
                        </p>
                      </div>
                      <div className="md:flex grid grid-cols-1 items-center gap-4 md:text-xl text-base leading-tight">
                        <div className="flex gap-3">
                          <p className="text-sm md:text-xl">
                            Form Of Contract :
                          </p>
                          <span className="blur-sm unselectable">
                            <button
                              className="md:text-lg text-base"
                              onClick={openModal}
                            >
                              {tender.otherInfo.form_of_contract
                                ? tender.otherInfo.form_of_contract
                                : 'formOfContract'}
                            </button>
                          </span>
                        </div>
                        <hr className="hr-1 h-7 md:block hidden" />

                        <div className="flex gap-3">
                          <p className="text-sm md:text-xl">
                            Bidding Validity :
                          </p>
                          <span className="blur-sm unselectable">
                            <button
                              className="md:text-lg text-base"
                              onClick={openModal}
                            >
                              {tender.otherInfo.bid_validity
                                ? tender.otherInfo.bid_validity
                                : 'bid Validty'}
                            </button>
                          </span>
                        </div>
                        <hr className="hr-1 h-7 md:flex justify-center hidden " />
                        <div className="flex gap-3">
                          <p className="text-sm md:text-xl">
                            Bid opening palce :
                          </p>
                          <span className="blur-sm unselectable">
                            <button
                              className="md:text-lg text-base"
                              onClick={openModal}
                            >
                              {tender.otherInfo.bid_opening_place
                                ? tender.otherInfo.bid_opening_place
                                : 'bid Place'}
                            </button>
                          </span>
                        </div>
                        <hr className="hr-1 h-7 md:block hidden " />
                        <div className="flex gap-3">
                          <p className="text-sm md:text-xl">Period Of Work :</p>
                          <span className="blur-sm unselectable">
                            <button
                              className="md:text-lg text-base"
                              onClick={openModal}
                            >
                              {tender.otherInfo.period_of_work
                                ? tender.otherInfo.period_of_work
                                : '677'}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-1 grid md:grid-cols-1 grid-cols-2 gap-3 md:mt-0 mt-4">
                      <div>
                        <p className="subHeading">Tender Id</p>
                        <p className="subHeadingValue">
                          {tender.gg_tender_id
                            ? tender.gg_tender_id
                            : 'TENDERID'}
                        </p>
                      </div>
                      <div>
                        <p className="subHeading ">Government Tender Id</p>
                        <p className="subHeadingValue blur-sm unselectable">
                          <button
                            className="md:text-lg text-base"
                            onClick={openModal}
                          >
                            {tender.tender_gov_id
                              ? tender.tender_gov_id
                              : 'TENDERGI'}
                          </button>
                        </p>
                      </div>
                      <div>
                        <p className="subHeading ">Reference No.</p>
                        <p className="subHeadingValue blur-sm unselectable">
                          <button
                            className="md:text-lg text-base"
                            onClick={openModal}
                          >
                            {tender.tnd_ref_id
                              ? tender.tnd_ref_id
                              : 'TENDERRNO.'}
                          </button>
                        </p>
                      </div>
                      <div>
                        <p className="subHeading ">location & pincode</p>
                        <p className="subHeadingValue">
                          <span>
                            {tender.city ? tender.city.city_name + ', ' : ''}
                          </span>
                          <span>
                            {tender.states
                              ? tender.states.state_name + ', '
                              : ''}
                          </span>
                          <span>
                            {tender.country ? tender.country.country_name : ''}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="fee-details">
                <div className="w-full grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-4 pt-4">
                  <div>
                    <p className="heading">Authority Details</p>
                    <div className="box md:pb-0 relative">
                      <div className="grid grid-cols-2 justify-between items-baseline gap-12">
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">Authority Name</p>
                            <p className="subHeadingValue">
                              {tender.auth
                                ? tender.auth.name.toLowerCase()
                                : 'Auth Name'}
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />
                          <div>
                            <p className="subHeading ">
                              Tender Inviting Authority
                            </p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                refer to document
                              </button>
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">organization Chain</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                refer to document
                              </button>
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />
                          <div>
                            <p className="subHeading ">
                              Address of Tender inviting Authority
                            </p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.location ? tender.location : 'Location'}
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="heading">EMD Details</p>
                    <div className="box md:pb-0 relative">
                      <div className="grid grid-cols-2 justify-between items-baseline gap-12">
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">EMD Amount</p>
                            <p className="subHeadingValue">
                              {tender.tender_emd_amnt_val
                                ? `₹ ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.tender_emd_amnt_val)}`
                                : '0.00'}
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />
                          <div>
                            <p className="subHeading  ">
                              EMD through BG/ST or EMD exemption allowed
                            </p>

                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.emd
                                  .emd_through_BG_ST_orEMD_exemption_allowed
                                  ? tender.emd
                                      .emd_through_BG_ST_orEMD_exemption_allowed
                                  : 'EMD_E_A'}
                              </button>
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />
                          <div>
                            <p className="subHeading ">EMD Fee Type</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.emd.emd_fee_type
                                  ? tender.emd.emd_fee_type
                                  : 'EFT'}
                              </button>
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">EMD Percentage</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.emd.emd_percentage
                                  ? tender.emd.emd_percentage
                                  : '0%'}
                              </button>
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />

                          <div>
                            <p className="subHeading ">EMD Payable At</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.emd.emd_payable_at
                                  ? tender.emd.emd_payable_at
                                  : 'EPA'}
                              </button>
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />

                          <div>
                            <p className="subHeading ">EMD Payable To</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.emd.emd_payable_to
                                  ? tender.emd.emd_payable_to
                                  : 'EPT'}
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="heading">tender fee Details</p>
                    <div className="box md:pb-0 relative">
                      <div className="grid grid-cols-2 justify-between items-baseline gap-12">
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">Tender Fee</p>
                            <p className="subHeadingValue">
                              {tender.fees.tnd_fee
                                ? `₹ ${new Intl.NumberFormat('en-IN', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                  }).format(tender.fees.tnd_fee)}`
                                : '0.00'}
                            </p>
                          </div>
                          <hr className="hr-1 w-full  mx-auto" />
                          <div>
                            <p className="subHeading ">Fee Payable At</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.fees.fee_payable_at
                                  ? tender.fees.fee_payable_at
                                  : 'FPA'}
                              </button>
                            </p>
                          </div>
                        </div>
                        <div className="grid gap-6">
                          <div>
                            <p className="subHeading ">Fee Payable to</p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.fees.fee_payable_to
                                  ? tender.fees.fee_payable_to
                                  : 'FPT'}
                              </button>
                            </p>
                          </div>
                          <hr className="hr-1 w-full" />
                          <div>
                            <p className="subHeading ">
                              tender fee exemption allowed
                            </p>
                            <p className="subHeadingValue blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.fees.tnd_fee_exemption_allowed
                                  ? tender.fees.tnd_fee_exemption_allowed
                                  : 'FEA'}
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="heading md:mt-24 mt-7">critical dates</p>
              <div className="w-full flex gap-8">
                <div className="box overflow-x-auto relative">
                  <div className="flex gap-12 items-center min-w-max">
                    <div className="grid gap-3">
                      <h3 className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                        Document Download
                      </h3>
                      <div className="flex justify-between mt-1 gap-6">
                        <div>
                          <p className="md:text-base text-xs text-default-500">
                            Start Date & Time
                          </p>
                          <div className="text-lg font-medium flex gap-4">
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.doc_download_start_date
                                  ? tender.dates.doc_download_start_date
                                  : 'YYYY-MM-DD'}
                              </button>
                            </span>
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.doc_download_start_time
                                  ? tender.dates.doc_download_start_time
                                  : '00:00:00'}
                              </button>
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="md:text-base text-xs text-default-500 ">
                            End Date & Time
                          </p>
                          <div className="text-lg font-medium flex gap-4">
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.doc_download_end_date
                                  ? tender.dates.doc_download_end_date
                                  : 'YYYY-MM-DD'}
                              </button>
                            </span>
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.doc_download_end_time
                                  ? tender.dates.doc_download_end_time
                                  : '00:00:00'}
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-l-2 border-primary h-12 mx-auto" />
                    <div className="grid gap-3">
                      <h3 className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                        Clarification
                      </h3>
                      <div className="flex justify-between mt-1 gap-6">
                        <div>
                          <p className="md:text-base text-xs text-default-500">
                            Start Date & Time
                          </p>
                          <div className="text-lg font-medium flex gap-4">
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.clarification_start_date
                                  ? tender.dates.clarification_start_date
                                  : 'YYYY-MM-DD'}
                              </button>
                            </span>
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.clarification_start_time
                                  ? tender.dates.clarification_start_time
                                  : '00:00:00'}
                              </button>
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="md:text-base text-xs text-default-500">
                            End Date & Time
                          </p>
                          <div className="text-lg font-medium  flex gap-4">
                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.clarification_end_date
                                  ? tender.dates.clarification_end_date
                                  : 'YYYY-MM-DD'}
                              </button>
                            </span>

                            <span className="blur-sm unselectable">
                              <button onClick={openModal}>
                                {tender.dates.clarification_end_time
                                  ? tender.dates.clarification_end_time
                                  : '00:00:00'}
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="border-l-2 border-primary h-12 mx-auto" />
                    <div className="grid gap-3">
                      <h3 className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                        Bid submission time
                      </h3>
                      <div className="flex justify-between mt-1 gap-4">
                        <div>
                          <p className="md:text-base text-xs text-default-500">
                            Start at
                          </p>
                          <p className="text-lg font-medium blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.submission_start_time
                                ? tender.dates.submission_start_time
                                : '00:00:00'}
                            </button>
                          </p>
                        </div>
                        <div>
                          <p className="md:text-base text-xs text-default-500">
                            End at
                          </p>
                          <p className="text-lg font-medium blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.submission_end_time
                                ? tender.dates.submission_end_time
                                : '00:00:00'}
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="border-l-2 border-primary h-12 mx-auto" />
                    <div className="grid gap-3">
                      <div>
                        <p className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                          publishing date & time
                        </p>

                        <div className="md:text-lg text-base font-medium flex gap-4">
                          <span>
                            {tender.dates.tnd_published_date
                              ? tender.dates.tnd_published_date
                              : 'YYYY-MM-DD'}
                          </span>
                          <span>
                            {tender.dates.tnd_published_time
                              ? tender.dates.tnd_published_time
                              : '00:00:00'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="border-l-2 border-primary h-12 mx-auto" />
                    <div className="grid gap-3">
                      <div>
                        <p className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                          Pre bid meeting date & time
                        </p>
                        <div className="text-lg font-medium flex gap-4">
                          <span className="blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.pre_bid_meeting_date
                                ? tender.dates.pre_bid_meeting_date
                                : 'YYYY-MM-DD'}
                            </button>
                          </span>
                          <span className="blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.pre_bid_meeting_time
                                ? tender.dates.pre_bid_meeting_time
                                : '00:00:00'}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr className="border-l-2 border-primary h-12 mx-auto" />
                    <div className="grid gap-3">
                      <div>
                        <p className="md:text-2xl text-xl font-semibold text-default-700 capitalize">
                          Bid Opening
                        </p>
                        <div className="text-lg font-medium flex gap-4">
                          <span className="blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.bid_opening_date
                                ? tender.dates.bid_opening_date
                                : 'YYYY-MM-DD'}
                            </button>
                          </span>
                          <span className="blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.dates.bid_opening_time
                                ? tender.dates.bid_opening_time
                                : '00:00:00'}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="heading mt-8">other Information</p>
              <div className="box relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-baseline h-fit">
                  <div className="grid gap-6">
                    <div>
                      <p className="subHeading">withdraw allowed</p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.withdrawal_allowed &&
                          (tender.otherInfo.withdrawal_allowed == 'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.withdrawal_allowed
                              ? tender.otherInfo.withdrawal_allowed
                              : 'TOWA'}
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">
                        general technical evaluation allowed
                      </p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo
                          .general_technical_evaluation_allowed &&
                          (tender.otherInfo
                            .general_technical_evaluation_allowed == 'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}{' '}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo
                              .general_technical_evaluation_allowed
                              ? tender.otherInfo
                                  .general_technical_evaluation_allowed
                              : 'TOGTEA'}
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">
                        item wise technical evaluation allowed
                      </p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.item_wise_technical_value &&
                          (tender.otherInfo.item_wise_technical_value ==
                          'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}{' '}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.item_wise_technical_value
                              ? tender.otherInfo.item_wise_technical_value
                              : 'TOIWTV'}
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">
                        is multi currency allowed for BOQ
                      </p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.is_multicurrency_allowed_for_boq &&
                          (tender.otherInfo.is_multicurrency_allowed_for_boq ==
                          'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}{' '}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.is_multicurrency_allowed_for_boq
                              ? tender.otherInfo
                                  .is_multicurrency_allowed_for_boq
                              : 'TOIMAFBOQ'}
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <p className="subHeading">
                        is multi currency allowed for fee
                      </p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.is_multicurrency_allowed_for_fee &&
                          (tender.otherInfo.is_multicurrency_allowed_for_fee ==
                          'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}{' '}
                        <div className="flex gap-5 items-center">
                          <p className="subHeadingValue blur-sm unselectable">
                            <button onClick={openModal}>
                              {tender.otherInfo.is_multicurrency_allowed_for_fee
                                ? tender.otherInfo
                                    .is_multicurrency_allowed_for_fee
                                : 'TOIMAFF'}
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">should allow NDA tender</p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.should_allow_nda_tnd &&
                          (tender.otherInfo.should_allow_nda_tnd == 'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.should_allow_nda_tnd
                              ? tender.otherInfo.should_allow_nda_tnd
                              : 'TOSANDAT'}
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">allow preferential bidder</p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.allow_preferential_bidder &&
                          (tender.otherInfo.allow_preferential_bidder ==
                          'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.allow_preferential_bidder
                              ? tender.otherInfo.allow_preferential_bidder
                              : 'TOAPB'}
                            t
                          </button>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="subHeading">allow two stage bidding</p>
                      <div className="flex gap-5 items-center">
                        {tender.otherInfo.allowed_two_stage_bidding &&
                          (tender.otherInfo.allowed_two_stage_bidding ==
                          'yes' ? (
                            <div className="bg-green-500 rounded-full w-4 aspect-square" />
                          ) : (
                            <div className="bg-red-500 rounded-full w-4 aspect-square" />
                          ))}{' '}
                        <p className="subHeadingValue blur-sm unselectable">
                          <button onClick={openModal}>
                            {tender.otherInfo.allowed_two_stage_bidding
                              ? tender.otherInfo.allowed_two_stage_bidding
                              : 'TOATSB'}
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <div>
                      <p className="subHeading">funding agency</p>
                      <p className="subHeadingValue blur-sm unselectable">
                        <button onClick={openModal}>
                          {tender.otherInfo.funding_agency_id
                            ? tender.otherInfo.funding_agency_id
                            : 'TOFAI'}
                        </button>
                      </p>
                    </div>
                    <div>
                      <p className="subHeading">
                        independent external monitor / remarks
                      </p>
                      <p className="subHeadingValue blur-sm unselectable">
                        <button onClick={openModal}>
                          {tender.otherInfo.independent_external_monitor_remark
                            ? tender.otherInfo
                                .independent_external_monitor_remark
                            : 'TOIEMR'}
                        </button>
                      </p>
                    </div>
                    <div>
                      <p className="subHeading">NDA / pre qualification</p>
                      <p className="subHeadingValue blur-sm unselectable">
                        <button onClick={openModal}>
                          r
                          {tender.otherInfo.nda_pre_qualification
                            ? tender.otherInfo.nda_pre_qualification
                            : 'TONDAPQ'}
                        </button>
                      </p>
                    </div>
                    <div>
                      <p className="subHeading"> Payment Mode</p>
                      <p className="subHeadingValue blur-sm unselectable">
                        <button onClick={openModal}>
                          {tender.otherInfo.payment_mode
                            ? tender.otherInfo.payment_mode
                            : 'TOPM'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : loading == true ? (
        <LoadingTemplate />
      ) : (
        <div className="mt-40">
          <ErrorTemplate message="we couldn't find what you are looking for. Try again" />
        </div>
      )}
    </>
  );
}
