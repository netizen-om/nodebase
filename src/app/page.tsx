// "use client";

import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";
import LogoutButton from "./logout";

const page = async () => {
  // const { data } = authClient.useSession();
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div>
      <div>
        Protected server component
        {JSON.stringify(data)}
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default page;
