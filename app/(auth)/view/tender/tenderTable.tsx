'use client';
import {
  Button,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useEffect, useState } from 'react';
type SortDescriptor = {
  column: React.Key;
  direction: 'ascending' | 'descending';
};
export default function TenderTable() {
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [tenders, setTenders] = useState<any>([]);
  const [query, setQuery] = useState<any>('');
  const [count, setCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | null>(
    null,
  );
  const initialFormData = {
    page: 1,
    pageSize: 20,
    startDate: '',
    endDate: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const totalPages = Math.ceil(count / pageSize);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.endDate.trim()) {
      newErrors.endDate = 'Please select end date first';
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Please select start date first';
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTender = async () => {
    try {
      let url = `/api/auth/getAllLiveTender`;

      if (query) {
        url += `?search=${query}`;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setCount(result.count);
      setTenders(result.tender);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTender();
  }, [formData.page, query]);

  const handleSort = (column: React.Key) => {
    const direction =
      sortDescriptor?.column === column &&
      sortDescriptor.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSortDescriptor({ column, direction });
    const sortedQueries = [...tenders].sort((a, b) => {
      // @ts-ignore
      const first = a[column] || '';
      // @ts-ignore
      const second = b[column] || '';

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return direction === 'ascending' ? cmp : -cmp;
    });

    setTenders(sortedQueries);
  };
  const handlePagination = (value: number) => {
    setFormData({ ...formData, page: value });
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6 items-center">
        <Input
          className="col-span-4"
          size="lg"
          placeholder="Start Searching ..."
          value={query}
          endContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
          }
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {/* <Select label="Tender Type" defaultSelectedKeys={['live']}>
          <SelectItem key={'live'}>Live Tender</SelectItem>
          <SelectItem key={'Archive'}>Archive Tender</SelectItem>
        </Select> */}
        <Input
          label="Start Select Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          errorMessage={error.startDate}
          isInvalid={error.startDate ? true : false}
          max={
            formData.endDate
              ? formData.endDate
              : new Date().toISOString().split('T')[0]
          }
          onChange={handleChange}
        />

        <Input
          label="End Select Date"
          type="date"
          name="endDate"
          value={formData.endDate}
          errorMessage={error.endDate}
          isInvalid={error.endDate ? true : false}
          min={formData.startDate ? formData.startDate : ''}
          max={new Date().toISOString().split('T')[0]}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <Button
            onPress={() => {
              if (validateForm()) {
                getTender();
              }
            }}
            color="primary"
            size="lg"
          >
            Submit
          </Button>
          <Button
            type="reset"
            color="danger"
            size="lg"
            onPress={() => {
              setFormData(initialFormData);
              setError({});
              getTender();
            }}
          >
            Reset
          </Button>
        </div>
        {query && query.trim() && (
          <div className="col-span-4">
            <p>Search Results For '{query}'</p>
          </div>
        )}

        <Table
          className="w-full border-collapse col-span-4 "
          isStriped={true}
          bottomContent={
            totalPages > 0 && (
              <div className="flex w-full justify-start">
                <Pagination
                  isCompact
                  showShadow
                  color="primary"
                  total={totalPages}
                  onChange={(page) => {
                    handlePagination(page);
                  }}
                />
              </div>
            )
          }
        >
          <TableHeader className="bg-green-500">
            <TableColumn className="p-3 text-left text-base bg-primary text-white ">
              S.No.
            </TableColumn>
            <TableColumn className="p-3 text-left text-base bg-primary text-white  ">
              Title
            </TableColumn>
            <TableColumn className="p-3 text-left text-base bg-primary text-white   ">
              Description
            </TableColumn>
            <TableColumn
              className="p-3 text-left text-base bg-primary text-white  "
              onClick={() => handleSort('tender_amnt_val')}
            >
              Tender value
            </TableColumn>
            <TableColumn
              className="p-3 text-left text-base bg-primary text-white  "
              onClick={() => handleSort('submission_start_date')}
            >
              Submission Date
            </TableColumn>
            <TableColumn
              className="p-3 text-left text-base bg-primary text-white  "
              onClick={() => handleSort('submission_end_date')}
            >
              Ending Date
            </TableColumn>
            <TableColumn
              className="p-3 text-left text-base bg-primary text-white  "
              onClick={() => handleSort('entry_date')}
            >
              Entry Date
            </TableColumn>
          </TableHeader>
          <TableBody>
            {tenders?.length === 0 ? (
              <TableRow className=" text-blue-700">
                <TableCell
                  colSpan={7}
                  className="text-center text-lg font-bold"
                >
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              tenders?.map((item: any, index: number) => (
                <TableRow key={item.fld_id}>
                  <TableCell className="p-3 border-b border-background">
                    {index + 1}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-100">
                    {item.tnd_title?.length > 50
                      ? item.tnd_title.substring(0, 50) + '...'
                      : item.tnd_title}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-100">
                    {item.tender_details?.length > 50
                      ? item.tender_details.substring(0, 50) + '...'
                      : item.tender_details}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background text-base font-medium capitalize">
                    {item.tender_amnt_val || ''}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background font-semibold text-blue-700">
                    {item.submission_end_date?.split('T')[0]}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background font-semibold text-blue-700">
                    {item.submission_start_date?.split('T')[0]}
                  </TableCell>
                  <TableCell className="p-3 border-b border-background font-semibold text-blue-700">
                    {item.entry_date?.split('T')[0]}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <p className="text-lg font-normal ">
            Total Records Found :{' '}
            <span className=" text-xl font-bold"> {count}</span>
          </p>
        </div>
      </div>
    </>
  );
}
