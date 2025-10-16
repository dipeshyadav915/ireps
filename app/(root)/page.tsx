export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata('home');
}

export default function Home() {
  return (
    <>
      <div className="px-5 md:px-12 relative overflow-hidden md:min-h-screen md:max-h-fit h-fit">
        <div className="md:w-[29rem] w-[15rem] aspect-square rounded-full blur-3xl gradient absolute md:-right-[8%] -right-[30%] md:top-[35%] top-[18%] wiggle2 opacity-80 z-0 "></div>
        <div className="md:w-[34rem] w-[20rem] aspect-square rounded-full blur-3xl gradient absolute md:-right-[6%] -right-[40%] md:top-[5%] top-[3%] wiggle opacity-80 z-0"></div>

        <div className="relative z-10 md:px-8 mt-20 py-5 flex flex-col justify-center items-center md:items-start ">
          <h1 className="xl:text-9xl text-4xl lg:text-8xl leading-none font-bold text-center md:text-left">
            Shine with
            <span className="text-primary"> IREPS,</span> Where Opportunities
            Stem!
          </h1>
          <p className="text-base md:text-2xl md:w-2/3 w-full leading-tight md:my-16 my-12 text-default-500 text-center md:text-left">
            Your go-to platform for finding, tracking, and winning the most
            relevant tenders across various industries. From government to
            private sector tenders, we&rsquo;ve got you coveredorganizations
            unlock new opportunities and achieve sustainable growth.
          </p>
          <div className="flex gap-8">
            <Link href={'/tender'}>
              <button className="custom_button">Explore Tenders</button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex flex-col md:gap-12 gap-6 px-6 md:px-24 md:py-20 py-6 h-fit bg-default-100">
        <p className="md:text-7xl text-3xl font-bold text-inherit">
          How It Works
          <span className="md:text-8xl text-5xl font-bold text-primary">?</span>
        </p>

        <p className="text-base md:text-2xl leading-tight text-default-500 text-center md:text-left ">
          Our platform makes tendering easy and efficient. Browse tenders across
          industries using filters to find the best opportunities. Submit your
          proposal securely, track progress, and stay updated with real-time
          notifications on new tenders and deadlines. Never miss a chance to
          grow your business!
        </p>
        <div className="md:grid flex flex-col grid-cols-3 md:gap-10 gap-8 animated-div">
          <div className="working-div">
            <p className="text-3xl md:text-5xl font-black text-primary">01</p>
            <p className="text-2xl md:text-3xl font-bold text-default-700">
              Browse & Explore
            </p>
            <p className="text-base md:text-2xl">
              Access a wide range of tenders from multiple industries. Use
              filters to find the best opportunities for your business.
            </p>
          </div>
          <div className=" working-div">
            <p className="text-3xl md:text-5xl font-black text-primary">02</p>
            <p className="text-2xl md:text-3xl font-bold text-default-700">
              Submit Your Proposal
            </p>
            <p className="text-base md:text-2xl">
              Respond directly to tenders through our secure platform. Upload
              necessary documents and track the progress of your submissions.
            </p>
          </div>
          <div className=" working-div">
            <p className="text-3xl md:text-5xl font-black text-primary">03</p>
            <p className="text-2xl md:text-3xl font-bold text-default-700">
              Get Notified in Real-Time
            </p>
            <p className="text-base md:text-2xl">
              Stay updated with alerts for new tenders, deadlines, and changes,
              ensuring you never miss an opportunity.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:gap-16 gap-6 md:p-28 p-6 h-fit bg-background">
        <p className="text-3xl md:text-7xl font-bold text-inherit">
          What Our Users Are Saying
          <span className="md:text-8xl text-5xl font-bold text-primary">?</span>
        </p>

        <div className="flex flex-col md:gap-20 gap-12">
          <div className="lg:flex  md:gap-12 grid gap-8 justify-around items-center">
            <div className="flex justify-center items-center">
              <div className="w-24 md:w-40 aspect-square rounded-full overflow-hidden ">
                <img
                  src="/user-2.avif"
                  alt="user"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <hr className="lg:border border-l-1 lg:h-40 hidden lg:block" />
            <div className="flex flex-col gap-4">
              <p className="md:text-3xl text-xl md:font-bold font-semibold">
                Jane Smith, Marketing Director
              </p>
              <div className="flex md:gap-8 gap-3 ">
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
                <p className="md:text-2xl text-sm">
                  Working with this team has been one of the best decisions for
                  our company. They not only delivered excellent results but
                  also went above and beyond in providing insights and support.
                  The improvements to our business have been noticeable, and we
                  couldn’t be happier!
                </p>
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
              </div>
            </div>
          </div>
          <div className="lg:flex  md:gap-12 grid gap-8 justify-around items-center flex-row-reverse">
            <div className="flex justify-center items-center">
              <div className="w-24 md:w-40 aspect-square rounded-full overflow-hidden ">
                <img
                  src="/user-3.avif"
                  alt="user"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <hr className="lg:border border-l-1 lg:h-40 hidden lg:block" />
            <div className="flex flex-col gap-4">
              <p className="md:text-3xl text-xl md:font-bold font-semibold">
                David Brown, Senior Data Scientist
              </p>
              <div className="flex md:gap-8 gap-3 ">
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
                <p className="md:text-2xl text-sm">
                  I have been using this service for months now, and I can
                  honestly say it has exceeded my expectations in every way. The
                  team’s commitment to excellence and their customer-first
                  approach make all the difference. We’ve already seen a
                  significant increase in our client base!
                </p>
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
              </div>
            </div>
          </div>
          <div className="lg:flex  md:gap-12 grid gap-8 justify-around items-center">
            <div className="flex justify-center items-center">
              <div className="w-24 md:w-40 aspect-square rounded-full overflow-hidden ">
                <img
                  src="/user-1.avif"
                  alt="user"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <hr className="lg:border border-l-1 lg:h-40 hidden lg:block" />
            <div className="flex flex-col gap-4">
              <p className="md:text-3xl text-xl md:font-bold font-semibold">
                Emily Carter, Software Engineer
              </p>
              <div className="flex md:gap-8 gap-3 ">
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
                <p className="md:text-2xl text-sm">
                  This service has been a game-changer for our business. We’ve
                  seen exponential growth in both leads and customer
                  satisfaction. The team’s professionalism, support, and
                  dedication have helped us achieve outstanding results. Highly
                  recommended!
                </p>
                <span className="text-primary font-extrabold text-5xl font-serif -mt-3">
                  &quot;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-[85%] mx-auto" />

      <div className="my-10 md:mx-auto">
        <p className="text-3xl md:text-6xl font-bold text-inherit py-6 text-center">
          Start Winning <span className="font-bold text-primary">Tenders</span>{' '}
          Today
        </p>

        <div className="flex flex-col gap-8 items-center">
          <p className="w-2/3 md:text-xl text-base text-center">
            Start Exploring now and take your business to the next level.
          </p>
          <Link href={'/tender'}>
            <button className="custom_button">Start Now</button>
          </Link>
        </div>
      </div>
    </>
  );
}
