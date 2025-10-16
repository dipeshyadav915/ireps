import Breadcurmb from '@/components/breadcurmb';
import Content from './addingForm';

export default function page() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-5">About Content</h1>
        <Breadcurmb />
      </div>
      <Content />
    </>
  );
}
