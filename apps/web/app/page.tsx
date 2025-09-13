"use client";

import { SignInButton, UserButton } from "@clerk/nextjs";
import { useMutation, useQuery, Authenticated, Unauthenticated } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>apps/web</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add</Button>
          <div className="max-w-sm w-full mx-auto space-y-2">
            {users?.map((user) => (
              <div
                key={user._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow transition-shadow"
              >
                <h3 className="font-medium">{user.name || "Unnamed User"}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Created: {new Date(user._creationTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in!</p>
        <SignInButton>
          Sign In
        </SignInButton>
      </Unauthenticated>
    </>
  );
}
