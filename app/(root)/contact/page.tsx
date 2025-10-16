export const dynamic = 'force-dynamic';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';
import ContactForm from '@/components/form';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata('contact us');
}

export default function Contact() {
  return (
    <>
      <div className="mt-[7rem] px-4 md:px-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-[7rem] gap-[3rem]">
          <div>
            <p className="md:text-4xl text-3xl font-bold">
              Get in <span className="text-primary ">Touch</span>
            </p>
            <p className="md:text-xl text-base py-4 text-default-700 ">
              We&rsquo;d love to hear from you! Whether you have a question,
              feedback, or just want to say hello, don&rsquo;t hesitate to reach
              out.
            </p>
            <div className="my-6">
              <p className="text-default-500">Email</p>

              <Link
                href="mailto:business@growthgrids.com"
                className="md:text-2xl text-xl font-semibold  hover:text-primary"
              >
                business@growthgrids.com
              </Link>
            </div>
            <hr className="border-primary" />
            <div className="my-6">
              <p className="text-default-500">Call Us</p>
              <p className="md:text-2xl text-xl font-semibold">
                +91-9773356001
              </p>
              <p className="md:text-2xl text-xl font-semibold">
                +91-9001823993
              </p>
            </div>
            <hr className="border-primary" />

            <div className="my-6">
              <p className=" text-default-500">Visit Us</p>
              <p className="md:text-2xl text-xl font-semibold">
                N 79-80 Adinath Nagar, JLN Marg Jaipur-302018, Rajasthan, India
              </p>
            </div>
          </div>
          <div className="shadow-xl shadow-default-200 dark:shadow-none rounded-2xl md:p-10 p-4 bg-default-100">
            <p className="md:text-4xl text-2xl font-bold text-center">
              Message Us
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
