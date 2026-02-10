import { caller } from '@/trpc/server'
import React from 'react'

const page = async() => {

  const user = await caller.getUsers();

  return (
    <div className=''>
        {JSON.stringify(user)}
    </div>
  )
}

export default page