"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NewsRedirectButton() {
  const router = useRouter();

  const handleRedirect = (): void => {
    router.push("/news");
  };

  return (
    <Button
      variant="outline"
      className="m-2 p-3 hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={handleRedirect}
    >
      Get Started With News Feed
    </Button>
  );
}
