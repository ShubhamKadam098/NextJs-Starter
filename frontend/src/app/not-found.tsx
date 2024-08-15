import Image from "next/image";
import Link from "next/link";
import PublicNavbar from "@/components/navbar/public-navbar";
import { GetServerSideProps } from "next";

interface NotFoundPageProps {
  referer: string | null;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ referer }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <PublicNavbar />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center justify-center gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="container mx-auto px-6 py-12 lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2">
            <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
              404 error
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn&apos;t exist.
            </p>

            <div className="mt-6 flex items-center gap-x-3">
              <Link
                href="/"
                className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
                aria-label="Go back to the homepage"
              >
                Take me home
              </Link>
            </div>
          </div>

          <div className="relative mt-12 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
            <Image
              className="w-full max-w-lg lg:mx-auto"
              src="/assets/404.svg"
              alt="404 illustration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<NotFoundPageProps> = async (
  context,
) => {
  const referer = context.req.headers.referer || null;
  return {
    props: {
      referer,
    },
  };
};

export default NotFoundPage;
