"use client"

import { useTRPC } from '@/trpc/client'
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'

export const Client = () => {

    const trpc = useTRPC();
    const {data : users} = useSuspenseQuery(trpc.getUsers.queryOptions())

  return (
    <div>client Component : {JSON.stringify(users)}</div>
  )
}