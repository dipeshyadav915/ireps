'use client';
import { useEffect, useState } from 'react';
import DashboardCard from './dashboardCard';

function formatIntl(num: number) {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
}
export default function Panel() {
  const [todayCount, setTodayCount] = useState(0);
  const [todayArchiveCount, setTodayArchiveCount] = useState(0);
  const [allCount, setAllCount] = useState<any>([]);

  const getLiveCount = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        fetch('/api/auth/getOnDateLiveTender', { credentials: 'omit' }),
        fetch('/api/auth/getOnDateArchiveTender', { credentials: 'omit' }),
        fetch('/api/auth/getCount', { credentials: 'omit' }),
      ]);

      if (!res1.ok && !res2.ok) {
        throw new Error('Failed to fetch data');
      }

      const result1 = await res1.json();
      const result2 = await res2.json();
      const result3 = await res3.json();

      setTodayCount(result1);
      setTodayArchiveCount(result2);
      setAllCount(result3);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getLiveCount();
  }, []);

  return (
    <>
      <DashboardCard count={formatIntl(todayCount)} name="today Live Tender" />
      <DashboardCard
        count={formatIntl(allCount.allTenderCount)}
        name="All Live Tender"
      />
      <DashboardCard
        count={formatIntl(allCount.basicSeoCount)}
        name="Basic Seo"
      />
      <DashboardCard
        count={formatIntl(allCount.advanceSeoCount)}
        name="Advance Seo"
      />
      <DashboardCard
        count={formatIntl(todayArchiveCount)}
        name="today archive tender"
      />
      <DashboardCard
        count={formatIntl(allCount.archiveCount)}
        name="Archive Tender"
      />
    </>
  );
}
