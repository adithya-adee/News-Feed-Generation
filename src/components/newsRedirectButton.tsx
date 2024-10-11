"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface NewsRedirectButtonProps {
  userId: string;
  email: string;
  name: string;
}

export default function NewsRedirectButton({
  userId,
  email,
  name,
}: NewsRedirectButtonProps) {
  const router = useRouter();

  const handleRedirect = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:8080/createuser", {
        userId,
        email,
        name,
      });

      if (response.status !== 200) {
        throw new Error("Failed to create user");
      }

      console.log(response.data.message);
      router.push("/news");
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
