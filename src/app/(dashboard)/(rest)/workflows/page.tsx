import { WorkflowsContainer, WorkflowsList } from '@/features/workflows/components/workflows';
import { workflowsParamsLoader } from '@/features/workflows/server/params-loader';
import { prefetchlWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server';
import type { SearchParams } from 'nuqs';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';

type Props = {  
  searchParams : Promise<SearchParams>
}

const Page = async ( { searchParams } : Props ) => {

  await requireAuth();

  const params = await workflowsParamsLoader(searchParams)
  
  prefetchlWorkflows(params);

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