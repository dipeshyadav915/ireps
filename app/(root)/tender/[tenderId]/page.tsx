import TenderData from '@/components/tenderData';
import { generateDynamicMetadata } from '@/components/dynamicMetaData';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tenderId: string }>;
}): Promise<Metadata> {
  const tenderId = (await params).tenderId;
  return generateDynamicMetadata('tenderdetails', tenderId);
}

export default async function Page({
  params,
}: {
  params: Promise<{ tenderId: string }>;
}) {
  const tenderId = (await params).tenderId;

  return <TenderData tenderId={tenderId} />;
}
