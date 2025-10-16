'use client';
import {
  Button,
  Form,
  Textarea,
  addToast,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Switch,
  Select,
  SelectItem,
} from '@heroui/react';
import { useEffect, useState } from 'react';

export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
export const XMark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-4"
    >
      <path
        fillRule="evenodd"
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default function Content() {
  const initialState = {
    fld_id: '',
    title: '',
    content: '',
    status: '',
  };
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [content, setContent] = useState<any>([]);
  const [formData, setFormData] = useState(initialState);

  const fetchAboutContent = async () => {
    try {
      const response = await fetch('/api/aboutContent', {
        method: 'GET',
        headers: {
          'user-role': 'admin',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const result = await response.json();
      setContent(result);
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const handleChange = (e?: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/auth/updateAbout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }
      const data = await response.json();
      fetchAboutContent();
      setOnEdit(false);
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

  const handleEdit = (index: number) => {
    const data = content[index];
    setFormData({
      fld_id: data.id || '',
      title: data.title || '',
      content: data.content || '',
      status: data.status || '',
    });
    setOnEdit(true);
  };

  const handleSwitch = async (fld_id: number, currentStatus: number) => {
    const status = currentStatus == 1 ? '2' : '1';
    try {
      const response = await fetch(`/api/auth/updateAbout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fld_id, status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }
      const data = await response.json();
      fetchAboutContent();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      {onEdit ? (
        <div className="flex flex-col justify-center gap-8 mt-6">
          <Form className="space-y-6 px-5 py-6 rounded-xl gap-4 items-start justify-start shadow-heroui-small">
            <Textarea
              label="Title"
              labelPlacement="outside"
              size="lg"
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              isReadOnly={!onEdit}
            />

            <Textarea
              isRequired
              label="Content"
              labelPlacement="outside"
              size="lg"
              type="text"
              name="content"
              placeholder="Title"
              value={formData.content}
              onChange={handleChange}
              isReadOnly={!onEdit}
            />
            <Select
              className="max-w-xs"
              label="Status"
              name="status"
              labelPlacement="outside"
              selectedKeys={[formData.status]}
              onChange={handleChange}
            >
              <SelectItem key="1">Active</SelectItem>
              <SelectItem key="2">Inactive</SelectItem>
            </Select>

            <div className="flex ml-auto mr-0 gap-4">
              <Button
                type="submit"
                className="bg-primary text-white rounded-xl font-semibold text-base"
                onClick={(e: React.FormEvent) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </Button>
              <Button
                className="bg-primary text-white rounded-xl font-semibold text-base"
                onPress={() => {
                  setOnEdit(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <Table className="w-full border-collapse" isStriped={true}>
          <TableHeader className="bg-green-500">
            <TableColumn className="p-3 text-left text-base bg-primary text-white ">
              S.No.
            </TableColumn>
            <TableColumn className="p-3 text-left text-base bg-primary text-white  ">
              Title
            </TableColumn>
            <TableColumn className="p-3 text-left text-base bg-primary text-white  ">
              Content
            </TableColumn>
            <TableColumn className="p-3 text-left text-base bg-primary text-white  ">
              Status
            </TableColumn>

            <TableColumn className="p-3 text-left text-base bg-primary text-white ">
              Action
            </TableColumn>
          </TableHeader>
          <TableBody>
            {content?.map((item: any, index: number) => (
              <TableRow key={item.id + index}>
                <TableCell className="p-3 border-b border-background">
                  {index + 1}
                </TableCell>

                <TableCell className="p-3 border-b font-semibold border-background text-md text-gray-700 dark:text-gray-200">
                  {item.title}
                </TableCell>
                <TableCell className="p-3 border-b  border-background text-sm text-gray-600 dark:text-gray-100">
                  {item.content?.length > 200
                    ? item.content.substring(0, 200) + '...'
                    : item.content}
                </TableCell>
                <TableCell className="p-3 border-b  border-background text-sm text-gray-600 dark:text-gray-100">
                  <Switch
                    isSelected={item.status == 1}
                    onChange={async () => {
                      await handleSwitch(item.id, item.status);
                    }}
                    // onValueChange={}
                  />
                </TableCell>
                <TableCell className="p-3 border-b  border-background font-semibold text-default-400 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                    onClick={() => {
                      handleEdit(index);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
