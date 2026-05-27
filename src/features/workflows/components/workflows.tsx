"use client"

import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";
import { useWorkflowParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { formatDistanceToNow } from "date-fns";
import type { workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";

export const WorkflowsSearch = () => {

    const [params, setParams] = useWorkflowParams()

    const { searchValue, onSearchChange } = useEntitySearch({
        params,
        setParams,
    })

    return (
        <EntitySearch 
            value={searchValue}
            onChange={onSearchChange}
            placeHolder={"Search workflows"}
        />
    )
}

export const WorkflowsList = () => {

    const workflows = useSuspenseWorkflows();

    return (
        <EntityList 
            items={workflows.data.items}
            getKey={(workflow) => workflow.id}
            renderItem={(workflow) => <WorkflowItem data={workflow} /> }
            emptyView={<WorkflowsEmpty />}
        />
    )
    
}

export const WorkflowsHeaders = ({ disabled }: { disabled?: boolean }) => {

    const router = useRouter();

    const createWorkflow = useCreateWorkflow();
    const { handleError, model } = useUpgradeModel()

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onSuccess : (data) => {
                router.push(`/workflows/${data.id}`);
            },
            onError : (err) => {
                handleError(err);
                console.log(err);
            }
        })
    }

    return (
        <>
            {model}
            <EntityHeader
                title="Workflows"
                description="Create and Manage your workflows"
                onNew={handleCreate}
                newButtonLabel="New workflow"
                disabled={disabled}
                isCreating={createWorkflow.isPending}
            ></EntityHeader>
        </>
    )
}

export const WorkflowsPagination = () => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowParams();

    return (
        <EntityPagination 
            disabled={workflows.isFetching}
            totalPages={workflows.data.totalPages}
            page={workflows.data.page}
            onPageChange={(page) => setParams({
                ...params,
                page
            })}
        />
    )
}

export const WorkflowsContainer = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <>
            <EntityContainer
                header={<WorkflowsHeaders />}
                search={<WorkflowsSearch />}
                pagination={<WorkflowsPagination />}
            >

                {children}
            </EntityContainer>
        </>
    )
}

export const WorkflowsLoading = () => {
    return <LoadingView message="Loading workflows..." />
}

export const WorkflowsError = () => {
    return <ErrorView message="Error loading workflows" />
}



export const WorkflowsEmpty = () => {

    const createWorkflow = useCreateWorkflow();
    const { handleError, model } = useUpgradeModel()

    const router = useRouter();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError : (err) => {
                handleError(err)
            },
            onSuccess : (data) => {
                router.push(`/workflows/${data.id}`)
            }
        })
    }

    return (
        <>
            {model}
            <EmptyView 
                message="No workflows found. Get started by creating a workflow"
                onNew={handleCreate}
            />
        </>
    )
}

export const WorkflowItem = (
    { data } : {data : workflow}
) => {

    const removeWorkflow = useRemoveWorkflow();

    const handleRomve = () => {
        removeWorkflow.mutate({
            id : data.id
        })
    }   

    return (
        <EntityItem 
            href={`/workflows/${data.id}`}
            title={data.name}
            subtitle={
                <>
                    Updated {formatDistanceToNow(data.updatedAt, { addSuffix:true })}{" "}
                    &bull; 
                    Created {formatDistanceToNow(data.createdAt, { addSuffix:true })}{" "}
                    
                </>
            }
            image={
                <div className="size-8 flex justify-center items-center">
                    <WorkflowIcon className="size-5 text-muted-foreground" />
                </div>
            }
            onRemove={handleRomve}
            isRemoving={removeWorkflow.isPending}
        />
    )
}
