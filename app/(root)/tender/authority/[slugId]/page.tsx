import Tendertable from '@/components/tendertable';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { query?: string; slugId?: string };
}): Promise<Metadata> {
  const slugId = params.slugId || '';
  return generateDynamicMetadata('auth', slugId);
}
export default async function page({
  params,
}: {
  params: Promise<{ query?: string; slugId?: string }>;
}) {
  const query = (await params).query;
  const slugId = (await params).slugId;

  return (
    <>
      <section className="mx-4 mt-24 md:mx-16 md:my-28  before: mb-5">
        <Tendertable query={query} authSlugId={slugId} />
      </section>
    </>
  );
}
