import { getQueryClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import { Client } from "./client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const page = async () => {
  const queryClient = getQueryClient();
 
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="">
      {/* {JSON.stringify(user)} */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading....</p>}>

        <Client/>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default page;
