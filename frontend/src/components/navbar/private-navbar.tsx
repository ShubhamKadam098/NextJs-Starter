"use client";
import Link from "next/link";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import Image from "next/image";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const PriavateNavbar = () => {
  const isDarkTheme = useIsDarkTheme();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image
            src={isDarkTheme ? "/logos/light-logo.svg" : "/logos/dark-logo.svg"}
            alt="TalentAQ Logo"
            height={32}
            width={32}
          />
          <span className="sr-only">TalentAQ</span>
          {/* <span className="text-xl tracking-wide">TalentAQ</span> */}
        </Link>
        <Link
          href="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/jobs"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Jobs
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Applied
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Messages
        </Link>
        <Link
          href="#"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Saved
        </Link>
        <Link
          href="/onboarding"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Onboarding
        </Link>
      </nav>
      <MobileSidebar />
      <div className="flex w-fit items-center gap-4 md:gap-2 lg:gap-4">
        <SignedIn>
          <UserButton
            appearance={isDarkTheme ? { baseTheme: dark } : undefined}
          />
        </SignedIn>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default PriavateNavbar;
