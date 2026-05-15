interface PageProps {
  params: Promise<{
    credentialId: string
  }>
}

import { requireAuth } from '@/lib/auth-utils';
import React from 'react';

const Page = async ({ params }: PageProps) => {

  await requireAuth();

  const { credentialId } = await params;

  return (
    <div>Credentials ID : {credentialId}</div>
  )
}

export default Page