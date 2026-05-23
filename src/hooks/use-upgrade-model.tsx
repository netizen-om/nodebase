import { UpgradeModal } from "@/components/upgrade-model";
import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

export const useUpgradeModel = () => {
    const [open, setOpen] = useState(false);
    const handleError = (err : unknown) => {
        if(err instanceof TRPCClientError) {
            if(err.data?.code === "FORBIDDEN") {
                setOpen(true);
                return true;
            }
        }
        return false;
    };

    const model = <UpgradeModal open={open} onOpenChange={setOpen} />

    return {
        handleError,
        model
    }
}