"use client";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  const isDarkTheme = useIsDarkTheme();
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <SignIn appearance={isDarkTheme ? { baseTheme: dark } : undefined} />
    </main>
  );
}
