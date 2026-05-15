interface PageProps {
  params : Promise<{
    workflowId : string
  }>
}

import React from 'react'

const Page = async  ({ params } : PageProps) =>  {

  const { workflowId } = await params;

  return (
    <div>Workflow ID : {workflowId}</div>
  )
}

export default Page