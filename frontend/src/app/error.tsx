"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const { signOut } = useClerk();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mx-auto grid h-screen place-items-center px-8 text-center">
        <div>
          <TriangleAlert className="mx-auto h-20 w-20" />
          <h1
            color="blue-gray"
            className="mt-10 !text-3xl !leading-snug md:!text-4xl"
          >
            It looks like something went wrong!
          </h1>
          <h5 className="mx-auto mb-14 mt-8 text-[18px] font-normal text-gray-500 md:max-w-sm">
            Don&apos;t worry, our team is already on it. Please try refreshing
            the page or come back later.
          </h5>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button
              variant={"ghost"}
              className="w-full px-4 md:w-[8rem]"
              onClick={() => signOut({ redirectUrl: "/" })}
              aria-label="Back Home"
            >
              Back Home
            </Button>

            <Button
              className="w-full px-4 md:w-[8rem]"
              onClick={() => reset()}
              aria-label="Try Again"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
