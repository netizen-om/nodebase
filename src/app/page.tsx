// "use client";

import { requireAuth } from "@/lib/auth-utils";

// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";

const page = async() => {
  // const { data } = authClient.useSession();
  await requireAuth();

  return (
    <div>
      {/* ({JSON.stringify(data)})
      {data && <Button onClick={() => authClient.signOut()}>Logout</Button>} */}
      Protected server component
    </div>
  );
};

export default page;
