'use client';
import { useState } from 'react';
import BasicSeo from './basic_seo';
import AdvanceSeo from './advance_seo';
export default function TypeToggle() {
  const [selectedSEO, setSelectedSEO] = useState('basic_seo');
  return (
    <>
      <div className="flex flex-col mt-12">
        <div className="flex space-x-4">
          {/* Basic SEO Button */}
          <label
            className={`px-6 py-2 border rounded-lg cursor-pointer transition ${
              selectedSEO === 'basic_seo'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <input
              type="radio"
              name="seo_type"
              value="basic_seo"
              className="hidden"
              onChange={() => setSelectedSEO('basic_seo')}
            />
            Basic SEO
          </label>

          {/* Advanced SEO Button */}
          <label
            className={`px-6 py-2 border rounded-lg cursor-pointer transition ${
              selectedSEO === 'advance_seo'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <input
              type="radio"
              name="seo_type"
              value="advance_seo"
              className="hidden"
              onChange={() => setSelectedSEO('advance_seo')}
            />
            Advanced SEO
          </label>
        </div>
      </div>
      {selectedSEO === 'advance_seo' ? (
        <div className="w-full ">
          <AdvanceSeo />
        </div>
      ) : (
        <div className="w-full ">
          <BasicSeo />
        </div>
      )}
    </>
  );
}
