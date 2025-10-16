import Breadcurmb from '@/components/breadcurmb';
import TypeToggle from './type_toggle';

export default function page() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-5">Add Seo</h1>
        <Breadcurmb />
      </div>
      <TypeToggle />
    </>
  );
}
