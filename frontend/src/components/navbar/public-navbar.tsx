"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const PublicNavbar = () => {
  const isDarkTheme = useIsDarkTheme();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={isDarkTheme ? "/logos/light-logo.svg" : "/logos/dark-logo.svg"}
            alt="TalentAQ Logo"
            height={32}
            width={32}
            className=""
          />
          <span className="sr-only">TalentAQ</span>
          <span className="text-xl font-semibold tracking-wide">TalentAQ</span>
        </Link>
      </nav>
      <div className="flex w-fit items-center gap-4 md:gap-2 lg:gap-4">
        <SignedOut>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Sign-Up</Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <>
            <Button
              size="sm"
              className="h-fit px-2 py-1 text-xs md:px-2 md:py-1 md:text-sm"
            >
              <Link href="/dashboard">Go To Dashboard</Link>
            </Button>
            <UserButton />
          </>
        </SignedIn>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default PublicNavbar;
