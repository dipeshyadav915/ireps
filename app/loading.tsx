'use client';

import { Spinner } from '@heroui/spinner';

export default function LoadingTemplate() {
  return (
    <div className="flex justify-center h-[75vh]">
      <Spinner label="Loading..." color="primary" />
    </div>
  );
}
