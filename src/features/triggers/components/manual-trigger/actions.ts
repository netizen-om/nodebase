"use server"

import { manualTrigerChannel } from "@/inngest/channels/manual-trigger";
import { inngest } from "@/inngest/client"
import { type Realtime, getSubscriptionToken } from "@inngest/realtime"

export type ManualTriggerToken = Realtime.Token<
    typeof manualTrigerChannel,
    ["status"]
>;

export async function fetchManualTriggerTokenRealtimeToken() : Promise<ManualTriggerToken> {
    const token = await getSubscriptionToken(inngest , {
        channel : manualTrigerChannel(),
        topics : ["status"]
    })

    return token;
}