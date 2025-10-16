export const dynamic = 'force-dynamic';
import AllAuthority from '@/components/allAuthority';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return generateDynamicMetadata('Authorities');
}
export default function page() {
  return (
    <section className="mx-4 mt-24 md:mx-16 md:my-28  before: mb-5 ">
      <AllAuthority />
    </section>
  );
}
