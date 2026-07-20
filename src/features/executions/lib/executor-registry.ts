import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { GeminiExecutor } from "../components/gemini/executor";

export const executerRegistry : Record<NodeType, NodeExecutor> = {
    [NodeType.INITIAL] : manualTriggerExecutor,
    [NodeType.MANUAL_TRIGGER] : manualTriggerExecutor,
    [NodeType.HTTP_REQUEST] : httpRequestExecutor,
    [NodeType.GOOGLE_FORM_TRIGGER] : googleFormTriggerExecutor,
    [NodeType.STRIPE_TRIGGER] : stripeTriggerExecutor,
    [NodeType.GEMINI] : GeminiExecutor,
    [NodeType.ANTHROPIC] : GeminiExecutor, // TODO : FIX LATER
    [NodeType.OPENAI] : GeminiExecutor, // TODO : FIX LATER
}

export const getExecuter = (type : NodeType) : NodeExecutor => {
    const executer = executerRegistry[type];

    if(!executer) {
        throw new Error(`No executor found for node type: ${type}`);
    }

    return executer
}
