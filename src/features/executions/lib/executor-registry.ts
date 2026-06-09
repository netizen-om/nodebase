import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";

export const executerRegistry : Record<NodeType, NodeExecutor> = {
    [NodeType.INITIAL] : manualTriggerExecutor,
    [NodeType.MANUAL_TRIGGER] : manualTriggerExecutor,
    [NodeType.HTTP_REQUEST] : httpRequestExecutor,
}

export const getExecuter = (type : NodeType) : NodeExecutor => {
    const executer = executerRegistry[type];

    if(!executer) {
        throw new Error(`No executor found for node type: ${type}`);
    }

    return executer
}
