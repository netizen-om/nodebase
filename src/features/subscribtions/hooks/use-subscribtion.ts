import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export const useSubscribtion = () => {
    return useQuery({
        queryKey : ["subscribtion"],
        queryFn : async() => {
            const { data } = await authClient.customer.state();
            return data;
        }
    })
}

export const useHasActiveSubscribtion = () => {
    const { data: customerState, isLoading, ...rest } = useSubscribtion();

    const hasActiveSubscribtion = customerState?.activeSubscriptions && customerState.activeSubscriptions.length > 0;

    return {
        hasActiveSubscribtion,
        subscription : customerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest
    }
}