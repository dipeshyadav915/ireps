'use client';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { usePathname, useRouter } from 'next/navigation';
export default function Breadcurmb() {
  const breadcrumbMap = {
    items: [
      {
        label: 'All Tender',
        href: '/tender',
      },
      {
        label: 'About Content',
        href: '/aboutContent',
      },
      {
        label: 'Seo',
        href: '/seo',
      },
      {
        label: 'Contact Query',
        href: '/contact',
      },
    ],
  };
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Breadcrumbs className="pb-4">
      <BreadcrumbItem
        size="lg"
        onPress={() => {
          router.push('/view/dashboard');
        }}
      >
        Dashboard
      </BreadcrumbItem>
      {breadcrumbMap.items.map((item, index) => {
        if (pathname.includes(item.href)) {
          return (
            <BreadcrumbItem size="lg" key={index + item.href}>
              {item.label}
            </BreadcrumbItem>
          );
        }
      })}
    </Breadcrumbs>
  );
}
