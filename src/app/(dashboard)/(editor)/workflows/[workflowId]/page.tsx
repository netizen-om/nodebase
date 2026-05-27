import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { HydrateClient } from '@/trpc/server';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react'
import { Editor, EditorError, EditorLoading } from '@/features/editor/components/editor';
import { EditorHeader } from '@/features/editor/components/editor-header';

interface PageProps {
  params: Promise<{
    workflowId: string
  }>
}

const Page = async ({ params }: PageProps) => {

  const { workflowId } = await params;

  prefetchWorkflows(workflowId);

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />} >
        <Suspense fallback={<EditorLoading />} >
          <EditorHeader workflowId={workflowId} />
          <main className='flex-1'>

            <Editor workflowId={workflowId} />
          </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default Page