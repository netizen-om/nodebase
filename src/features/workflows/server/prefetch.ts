import { prefetch, trpc } from "@/trpc/server"
import type { inferInput } from "@trpc/tanstack-react-query"

type Input = inferInput<typeof trpc.workflows.getMany>;

// Prefetch all workflows

export const prefetchlWorkflows = (params:Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}

/**
 * Prefetch single workflow
 */

export const prefetchWorkflows = (id : string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({ id }))
}