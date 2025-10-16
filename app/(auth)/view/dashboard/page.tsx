import Breadcurmb from '@/components/breadcurmb';
import Panel from './panel';

export default function AdminDashboard() {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl mb-5">Dashboard</p>
        <Breadcurmb />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-fit">
        <Panel />
      </div>
    </>
  );
}
