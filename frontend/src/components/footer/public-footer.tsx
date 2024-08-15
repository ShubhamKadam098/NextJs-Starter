import Link from "next/link";
import { Button } from "@/components/ui/button";

const PublicFooter = () => {
  return (
    <footer className="w-full px-2 lg:px-5 py-5 ">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full">
        <Link
          href="https://braveailab.com/"
          target="_blank"
          className="text-left text-sm"
        >
          &copy; Designed by Brave AI Labs
        </Link>

        <div className="flex flex-row items-start justify-start space-x-4">
          <Button size="sm" variant="link" asChild className="text-xs">
            <Link href="/terms-service">Terms of Service</Link>
          </Button>
          <Button size="sm" variant="link" asChild className="text-xs">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
