import Tendertable from '@/components/tendertable';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata('all tenders');
}
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; sec?: string; auth?: string }>;
}) {
  const query = (await searchParams).query || undefined;
  return (
    <>
      <section className="mx-4 mt-24 md:mx-16 md:mt-28">
        <Tendertable query={query} />
      </section>
    </>
  );
}
