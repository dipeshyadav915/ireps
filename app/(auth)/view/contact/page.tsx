import Breadcurmb from '@/components/breadcurmb';
import QueryTable from './queryTable';

export default function page() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-5">Contact Query</h1>
        <Breadcurmb />
      </div>
      <QueryTable />
    </>
  );
}
