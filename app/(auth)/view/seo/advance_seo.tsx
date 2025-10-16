'use client';
import { Pagination } from '@heroui/pagination';
import {
  addToast,
  Button,
  Form,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from '@heroui/react';
import { useEffect, useState } from 'react';

export default function AdvanceSeo() {
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState({ type: '', text: '' });
  const [pages, setPages] = useState<any>([]);
  const [advanceSeo, setAdvanceSeo] = useState<any>([]);
  const [paginationPage, setPaginationPage] = useState<any>([1]);
  const [count, setCount] = useState<any>([]);
  const [sector, setSector] = useState<any>([]);
  const [authority, setAuthority] = useState<any>([]);
  const totalPages = Math.ceil(count / 50) || 1;

  const initialState = {
    page: '',
    pageType: '',
    auth_id: '',
    sector_id: '',
    metaKey: '',
    metaTitle: '',
    metaDescription: '',
    headerContent: '',
    content: '',
  };

  const [formData, setFormData] = useState(initialState);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/auth/getPages', {
        credentials: 'omit',
      });
      const data = await response.json();

      setPages(data);
    } catch (err) {
      console.error('something went wrong ', err);
    }
  };

  const fetchAdvanceSeo = async () => {
    try {
      const response = await fetch(
        `/api/auth/getAdvanceSeo?page=${paginationPage}`,
        {
          credentials: 'omit',
        },
      );
      const data = await response.json();

      setAdvanceSeo(data.metaData);
      setCount(data.count);
    } catch (err) {
      console.error('something went wrong ', err);
    }
  };

  useEffect(() => {
    fetchAdvanceSeo();
  }, [paginationPage]);

  const getSelectionData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch('/api/auth/authority', { credentials: 'omit' }),
        fetch('/api/auth/sector', { credentials: 'omit' }),
      ]);
      const data1 = await response1.json();
      const data2 = await response2.json();

      setAuthority(data1);
      setSector(data2);
    } catch (err) {
      console.error('something went wrong ', err);
    }
  };

  useEffect(() => {
    fetchData();
    getSelectionData();
  }, []);

  const addAdvanceSeo = async () => {
    try {
      const response = await fetch(`/api/auth/addSeo/advanceSeo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to Add Advance Seo');
      }
      const data = await response.json();
      fetchData();

      setFormData(initialState);

      addToast({
        title: 'Success',
        description: data.message,
        color: 'success',
      });
    } catch (error: any) {
      console.error(error);

      addToast({
        title: 'Failed',
        description: 'Something went wrong',
        color: 'danger',
      });
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdvanceSeo();
  };

  const handleEdit = (seoItem: any) => {
    // @ts-ignore
    setFormData({
      page: seoItem.page_id || '',
      pageType: seoItem.selectType || '',
      auth_id: seoItem.authority?.id || '',
      sector_id: seoItem.sector?.fld_id || '',
      metaKey: seoItem.meta_key || '',
      metaTitle: seoItem.page_title || '',
      metaDescription: seoItem.meta_desc || '',
      headerContent: seoItem.header_content || '',
      content: seoItem.content || '',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePagination = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPaginationPage(newPage);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-8 mt-10">
        <Form
          className="space-y-6 px-5 py-10 rounded-xl grid grid-cols-2 gap-4 items-center justify-center shadow-heroui-small"
          onSubmit={handleSubmit}
        >
          <Select
            isRequired
            name="page"
            id="page"
            label="Page"
            size="lg"
            labelPlacement="outside"
            selectedKeys={formData.page && String(formData.page)}
            value={formData.page}
            onChange={handleChange}
          >
            <SelectItem key={' '}>-- Select Page --</SelectItem>
            {pages?.length != 0 &&
              pages.map((page: any) => {
                return (
                  <SelectItem key={page.fld_id}>{page.menu_name}</SelectItem>
                );
              })}
          </Select>

          <div className="grid grid-cols-3">
            <RadioGroup
              className="col-span-1 "
              orientation="horizontal"
              name="pageType"
              value={formData.pageType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, pageType: value }))
              }
            >
              <Radio value="sector" checked={formData.pageType === 'sector'}>
                Sector
              </Radio>
              <Radio value="auth" checked={formData.pageType === 'auth'}>
                Authority
              </Radio>
            </RadioGroup>

            <Select
              className={`${formData.pageType === 'sector' ? 'block' : 'hidden'}  col-span-2`}
              name="sector_id"
              id="sector_id"
              defaultSelectedKeys={' '}
              selectedKeys={String(formData.sector_id) || ' '}
              onChange={handleChange}
            >
              <SelectItem key={' '}>-- Select Sector --</SelectItem>

              {sector?.length != 0 &&
                sector.map((data: any, index: number) => {
                  return <SelectItem key={index}>{data.sectName}</SelectItem>;
                })}
            </Select>
            <Select
              className={`col-span-2 ${
                formData.pageType === 'auth' ? 'block' : 'hidden'
              } `}
              defaultSelectedKeys={' '}
              selectedKeys={String(formData.auth_id) || ''}
              onChange={handleChange}
            >
              <SelectItem key={' '}>-- Select Authority --</SelectItem>

              {authority?.length != 0 &&
                authority.map((data: any, index: number) => {
                  return <SelectItem key={index}>{data.name}</SelectItem>;
                })}
            </Select>
          </div>

          {/* Meta title  */}

          <Input
            isRequired
            label="Meta Title"
            labelPlacement="outside"
            size="lg"
            type="text"
            name="metaTitle"
            placeholder="Meta Title"
            value={formData.metaTitle}
            onChange={handleChange}
          />

          <Input
            isRequired
            label="Meta Key"
            labelPlacement="outside"
            size="lg"
            placeholder="Meta Key"
            name="metaKey"
            value={formData.metaKey}
            onChange={handleChange}
          />

          {/* header content */}

          <Textarea
            isRequired
            label="Header Content"
            labelPlacement="outside"
            size="lg"
            name="headerContent"
            id="headerContent"
            placeholder="Header Content"
            rows={1}
            value={formData.headerContent}
            onChange={handleChange}
          ></Textarea>

          {/* Meta key  */}

          {/* Meta Description */}

          <Textarea
            isRequired
            label="Meta Description"
            labelPlacement="outside"
            size="lg"
            name="metaDescription"
            id="metaDescription"
            placeholder="Meta Description"
            rows={3}
            value={formData.metaDescription}
            onChange={handleChange}
          ></Textarea>

          <Textarea
            isRequired
            label="Content"
            labelPlacement="outside"
            size="lg"
            name="content"
            id="content"
            placeholder="Content"
            rows={3}
            value={formData.content}
            onChange={handleChange}
          ></Textarea>

          <div className="flex justify-end col-span-2">
            <Button type="submit" className="bg-primary text-white rounded-xl">
              Add Advance Seo
            </Button>
          </div>
        </Form>

        <Table
          isStriped={true}
          bottomContent={
            advanceSeo.length !== 0 && (
              <Pagination
                isCompact
                showShadow
                color="primary"
                total={totalPages}
                onChange={(newPage: any) => handlePagination(newPage)}
              />
            )
          }
        >
          <TableHeader>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Title
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              S.No.
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Meta Key
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Description
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Content
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Header Content
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Select Type
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Type Name
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Action
            </TableColumn>
          </TableHeader>
          <TableBody>
            {advanceSeo.map((item: any, index: number) => (
              <TableRow key={item.fld_id}>
                <TableCell className="p-3 border-b border-background">
                  {index + 1}
                </TableCell>
                <TableCell className="p-3 border-b border-background font-medium">
                  {item.page_title}
                </TableCell>
                <TableCell className="p-3 border-b border-background text-sm text-gray-700 dark:text-gray-200 ">
                  {item.meta_key}
                </TableCell>
                <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-100 ">
                  {item.meta_desc.length > 50
                    ? item.meta_desc.substring(0, 50) + '...'
                    : item.meta_desc}
                </TableCell>
                <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-200 ">
                  {item.content.length > 50
                    ? item.content.substring(0, 50) + '...'
                    : item.content}
                </TableCell>
                <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-200 ">
                  {item.header_content.length > 50
                    ? item.header_content.substring(0, 50) + '...'
                    : item.header_content}
                </TableCell>
                <TableCell className="p-3 border-b border-background font-semibold text-blue-700">
                  {item.selectType
                    ? item.selectType === 'sector'
                      ? 'Sector'
                      : 'Authority'
                    : 'N/A'}
                </TableCell>
                <TableCell className="p-3 border-b border-background text-sm text-gray-600 dark:text-gray-200 ">
                  {item.selectType === 'sector'
                    ? item.sector.sectName
                    : item.authority.name}
                </TableCell>

                <TableCell className="p-3 border-b border-background  font-semibold text-default-400 ">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 hover:text-primary"
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {advanceSeo.length == 0 && (
        <p className="flex justify-center text-default-600 font-semibold text-xl mt-8">
          No Data
        </p>
      )}
    </>
  );
}
