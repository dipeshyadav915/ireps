import { NextResponse } from 'next/server';
import {
  ArchiveMainTender,
  MainTender,
  AppMenuMaster,
  AdvanceSeo,
} from '@/models/index';

export async function GET() {
  try {
    const [archiveCount, allTenderCount, basicSeoCount, advanceSeoCount] =
      await Promise.all([
        ArchiveMainTender.count(),
        MainTender.count(),
        AppMenuMaster.count(),
        AdvanceSeo.count(),
      ]);

    return NextResponse.json(
      {
        archiveCount,
        allTenderCount,
        basicSeoCount,
        advanceSeoCount,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching counts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
