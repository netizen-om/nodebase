interface PageProps {
  params: Promise<{
    executionId: string
  }>
}

import { requireAuth } from '@/lib/auth-utils';
import React from 'react';

const Page = async ({ params }: PageProps) => {

  await requireAuth();
  const { executionId } = await params;

  return (
    <div>Execution ID : {executionId}</div>
  )
}

export default Page