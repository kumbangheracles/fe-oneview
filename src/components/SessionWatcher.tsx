"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !session?.user) {
      signOut({ callbackUrl: "/auth/login" });
    }
  }, [status, session]);

  return null;
}
