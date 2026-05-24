"use client"

import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows"
import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useUpgradeModel } from "@/hooks/use-upgrade-model";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
    const workflows = useSuspenseWorkflows();

    return (
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
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

export const WorkflowsContainer = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <>
            <EntityContainer
                header={<WorkflowsHeaders />}
                search={<></>}
                pagination={<></>}
            >

                {children}
            </EntityContainer>
        </>
    )
}