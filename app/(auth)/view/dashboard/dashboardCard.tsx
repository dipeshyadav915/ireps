export default function DashboardCard({
  count,
  name,
}: {
  count: string;
  name: string;
}) {
  return (
    <>
      <div className="bg-default-100 rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-2xl p-8 font-semibold text-gray-500 capitalize">
            {name}
          </h2>
          <span className="text-[100px] px-4 font-bold leading-tight text-right">
            {count}
          </span>
        </div>
      </div>
    </>
  );
}
