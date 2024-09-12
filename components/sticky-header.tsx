"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Boxes, LogOutIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function StickyHeader() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const getUser = async () => {
    const response = await fetch(
      "https://intern-task-api.bravo68web.workers.dev/api/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/sign-in");
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <Boxes className="h-6 w-6" />
          <span className="text-lg font-semibold">Engineer's Cradle</span>
        </div>
        {token && user && (
          <>
            <div className="flex items-center space-x-2 mr-5">
              <div className="h-6 w-px bg-border/50" aria-hidden="true" />
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.user.sub[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium mr-6">{user.user.sub}</span>
              <Button
              onClick={logout}
              >
                <LogOutIcon className="h-5 w-5" />
              </Button>
            </div>
            {/* add a logout button */}
          </>
        )}
      </div>
    </header>
  );
}
