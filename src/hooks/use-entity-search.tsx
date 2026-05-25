import { PAGINATION } from "@/config/constants";
import { useEffect, useState } from "react";

interface UseEntitySearchProps<T extends {
    search: string;
    page: number
}> {
    params: T;
    setParams: (params: Partial<Pick<T, "search" | "page">>) => void;
    debounceMs?: number;
}

export function useEntitySearch<T extends{
    search: string;
    page: number
}>({
    params,
    setParams,
    debounceMs = 500
} : UseEntitySearchProps<T>){

    const [localSearch, setLocalSearch] = useState(params.search)

    useEffect(() => {
        if(localSearch === "" && params.search !== "") {
            setParams({
                search : "",
                page : PAGINATION.DEFAULT_PAGE,
            })

            return;
        }

        const timer = setTimeout(() => {
            if(localSearch !== params.search) {
                setParams({
                    search : localSearch,
                    page : PAGINATION.DEFAULT_PAGE,
                })
            }
        }, debounceMs)

        return () => clearTimeout(timer)

    }, [localSearch, params.search, setParams, debounceMs])


    useEffect(() => {
        setLocalSearch(params.search)
    }, [params.search])

    return {
        searchValue : localSearch,
        onSearchChange: setLocalSearch,
    }

}