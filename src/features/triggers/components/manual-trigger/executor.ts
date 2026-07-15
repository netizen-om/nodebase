import type { NodeExecutor } from "@/features/executions/types";
import { manualTrigerChannel } from "@/inngest/channels/manual-trigger";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
    data,
    nodeId,
    context,
    step,
    publish
}) => {

    await publish(
        manualTrigerChannel().status({
            nodeId,
            status: "loading"
        })
    )

    const result = await step.run("manual-trigger", async () => context)

    await publish(
        manualTrigerChannel().status({
            nodeId,
            status: "success"
        })
    )

    return result
}