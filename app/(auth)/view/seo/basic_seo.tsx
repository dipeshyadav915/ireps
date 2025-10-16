'use client';
import {
  addToast,
  Button,
  Form,
  Input,
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

export default function BasicSeo() {
  const [pages, setPages] = useState<any>([]);
  const [basicSeo, setBasicSeo] = useState<any>([]);

  const [formData, setFormData] = useState({
    page: '',
    metaKey: '',
    metaTitle: '',
    metaDescription: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchData = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch('/api/auth/getPages', { credentials: 'omit' }),
        fetch('/api/auth/getBasicSeo', { credentials: 'omit' }),
      ]);
      const data1 = await response1.json();
      const data2 = await response2.json();
      setPages(data1);
      setBasicSeo(data2.rows);
    } catch (err) {
      console.error('something went wrong ', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addSeo = async () => {
    try {
      const response = await fetch(`/api/auth/addSeo/basicSeo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to Add Basic Seo');
      }
      const data = await response.json();
      fetchData();
      addToast({
        title: 'success',
        description: data.message,
        color: 'success',
      });
      setFormData({
        metaDescription: '',
        metaKey: '',
        metaTitle: '',
        page: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addSeo();
  };

  const handleEdit = (seoItem: any) => {
    setFormData({
      page: seoItem.page_id || '',
      metaKey: seoItem.meta_key || '',
      metaTitle: seoItem.page_title || '',
      metaDescription: seoItem.meta_desc || '',
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="flex flex-col gap-8 mt-10">
        <Form
          className="space-y-3 rounded-xl grid grid-cols-3 px-5 py-10 shadow-heroui-small"
          onSubmit={handleSubmit}
        >
          <Select
            isRequired
            size="lg"
            name="page"
            id="page"
            label="Page"
            className="!mt-3"
            labelPlacement="outside"
            selectedKeys={formData.page && String(formData.page)}
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

          {/* Meta title */}

          <Input
            isRequired
            size="lg"
            type="text"
            label="Meta Title"
            labelPlacement="outside"
            placeholder="Type Meta Title"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
          />

          {/* Meta key*/}

          <Input
            isRequired
            size="lg"
            label="Meta Key"
            labelPlacement="outside"
            placeholder="Type Meta Key"
            name="metaKey"
            value={formData.metaKey}
            onChange={handleChange}
          />

          {/* Meta Description */}

          <Textarea
            isRequired
            className="col-span-3"
            size="lg"
            name="metaDescription"
            label="Description"
            labelPlacement="outside"
            placeholder="Start Describing Seo ..."
            id="metaDescription"
            rows={3}
            value={formData.metaDescription}
            onChange={handleChange}
          ></Textarea>

          <div className="flex justify-end col-span-3">
            <Button type="submit" className=" bg-primary text-white  ">
              Add Basic Seo
            </Button>
          </div>
        </Form>
        {/* basicSeo table */}

        <Table className="w-full border-collapse" isStriped={true}>
          <TableHeader>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              S.No.
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Title
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Meta Key
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Description
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Menu Name
            </TableColumn>
            <TableColumn className="p-3 text-left bg-primary text-white text-base">
              Action
            </TableColumn>
          </TableHeader>
          <TableBody>
            {basicSeo.map((item: any, index: number) => (
              <TableRow key={item.fld_id}>
                <TableCell className="p-3 border-b border-background">
                  {index + 1}
                </TableCell>
                <TableCell className="p-3 border-b border-background font-medium">
                  {item.page_title}
                </TableCell>
                <TableCell className="p-3 border-b  border-background text-sm text-gray-700 dark:text-gray-200 ">
                  {item.meta_key}
                </TableCell>
                <TableCell className="p-3 border-b  border-background text-sm text-gray-600 dark:text-gray-100">
                  {item.meta_desc.length > 50
                    ? item.meta_desc.substring(0, 50) + '...'
                    : item.meta_desc}
                </TableCell>
                <TableCell className="p-3 border-b  border-background font-semibold text-blue-700 ">
                  {item.menuMaster?.menu_name || 'N/A'}
                </TableCell>
                <TableCell className="p-3 border-b  border-background font-semibold text-default-400 ">
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

      {basicSeo.length == 0 && (
        <p className="flex justify-center text-default-600 font-semibold text-xl mt-8">
          No Data
        </p>
      )}
    </>
  );
}
