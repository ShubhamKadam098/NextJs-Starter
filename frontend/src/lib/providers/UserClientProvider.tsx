"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/userStore";
import LoadingScreen from "@/components/layout/loading-screen";

export default function UserClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const setUser = useUserStore((state) => state.setUser);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useEffect(() => {
    if (isLoaded && user) {
      setUser(user);
      setIsLoading(false);
    }
  }, [isLoaded, user, setUser, setIsLoading]);

  if (!user) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
