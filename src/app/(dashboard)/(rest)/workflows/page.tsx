import { WorkflowsContainer, WorkflowsList } from '@/features/workflows/components/workflows';
import { prefetchlWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

const Page = async () => {

  await requireAuth();

  prefetchlWorkflows();

  return (
    <WorkflowsContainer>
      <div>
        <HydrateClient>
          <ErrorBoundary fallback={<p>Error !!!</p>}>
            <Suspense fallback={<p>Loading...</p>}>
              <WorkflowsList />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </div>
    </WorkflowsContainer>
  )
}

export default Page