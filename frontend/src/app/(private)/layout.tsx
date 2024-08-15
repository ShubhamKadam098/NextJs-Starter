import PriavateNavbar from "@/components/navbar/private-navbar";
import QueryProvider from "@/lib/providers/QueryProvider";
import UserClientProvider from "@/lib/providers/UserClientProvider";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserClientProvider>
      <QueryProvider>
        <div className="flex min-h-screen w-full flex-col">
          <PriavateNavbar />
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
      </QueryProvider>
    </UserClientProvider>
  );
}
