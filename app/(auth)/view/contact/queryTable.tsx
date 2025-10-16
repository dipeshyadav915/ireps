'use client';
import {
  addToast,
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
export default function QueryTable() {
  const [queries, setQueries] = useState<any>();
  const [count, setCount] = useState<number>(0);
  // const [pageSize, setPageSize] = useState<number>(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | null>(
    null,
  );

  const initialFormData = {
    page: 1,
    pageSize: 15,
  };

  const [formData, setFormData] = useState(initialFormData);
  const totalPages = Math.ceil(count / formData.pageSize);

  const getOueries = async () => {
    try {
      const response = await fetch('/api/auth/getQueries', {
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

      setQueries(result.rows);
      setCount(result.count);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOueries();
  }, [formData.page]);

  const handleDelete = async (id: any) => {
    // const ids = 'someValue';
    try {
      const formData = new FormData();
      formData.append('queryId', id);

      const response = await fetch(`/api/auth/deleteQuery`, {
        method: 'POST',

        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to delete data');
      }

      const data = await response.json();
      getOueries();

      addToast({
        title: 'Success',
        description: data.message,
        color: 'success',
      });

      // setQueries(result.rows);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleSort = (column: React.Key) => {
    const direction =
      sortDescriptor?.column === column &&
      sortDescriptor.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSortDescriptor({ column, direction });
    const sortedQueries = [...queries].sort((a, b) => {
      // @ts-ignore
      const first = a[column] || '';
      // @ts-ignore
      const second = b[column] || '';

      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return direction === 'ascending' ? cmp : -cmp;
    });

    setQueries(sortedQueries);
  };
  const handlePagination = (value: number) => {
    setFormData({ ...formData, page: value });
  };

  return (
    <>
      <Table
        className="w-full border-collapse"
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
          <TableColumn
            className="p-3 text-left text-base bg-primary text-white  "
            onClick={() => handleSort('name')}
          >
            Name
          </TableColumn>
          <TableColumn
            className="p-3 text-left text-base bg-primary text-white  "
            onClick={() => handleSort('email')}
          >
            Email
          </TableColumn>
          <TableColumn
            className="p-3 text-left text-base bg-primary text-white  "
            onClick={() => handleSort('mobile_number')}
          >
            Mobile Number
          </TableColumn>
          <TableColumn
            className="p-3 text-left text-base bg-primary text-white  "
            onClick={() => handleSort('message')}
          >
            Message
          </TableColumn>
          <TableColumn className="p-3 text-left text-base bg-primary text-white ">
            Action
          </TableColumn>
        </TableHeader>
        <TableBody>
          {queries?.map((item: any, index: number) => (
            <TableRow key={item.fld_id}>
              <TableCell className="p-3 border-b border-background">
                {index + 1}
              </TableCell>
              <TableCell className="p-3 border-b border-background text-base font-medium capitalize">
                {item.name}
              </TableCell>
              <TableCell className="p-3 border-b  border-background text-sm text-gray-700 dark:text-gray-200 ">
                {item.email}
              </TableCell>
              <TableCell className="p-3 border-b  border-background font-semibold text-blue-700 ">
                {item.mobile_number}
              </TableCell>
              <TableCell className="p-3 border-b  border-background text-sm text-gray-600 dark:text-gray-100">
                {item.message?.length > 50
                  ? item.message.substring(0, 50) + '...'
                  : item.message}
              </TableCell>

              <TableCell className="p-3 border-b  border-background font-semibold text-default-400 ">
                <div className="flex gap-3">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6  hover:text-primary"
                    onClick={() => {
                      window.location.href = `mailto:${item.email}`;
                      // handleEdit(item);
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg> */}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor "
                    className="size-6  hover:text-primary"
                    onClick={() => {
                      if (
                        confirm('Are you sure you want to delete this query?')
                      ) {
                        handleDelete(item.fld_id);
                      }
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {queries?.length == 0 && (
        <p className="flex justify-center text-default-600 font-semibold text-xl mt-8">
          No Data
        </p>
      )}
    </>
  );
}
