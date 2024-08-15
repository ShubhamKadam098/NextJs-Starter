import PublicFooter from "@/components/footer/public-footer";
import PublicNavbar from "@/components/navbar/public-navbar";
import { Separator } from "@/components/ui/separator";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <PublicNavbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
      <Separator />
      <PublicFooter />
    </div>
  );
}
