"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = {
  "All News": "all",
  "Top Headlines": "top-headlines",
  Sports: "sports",
  Business: "business",
};

const NavLink = ({ label, onClick }) => (
  <span
    className="text-xl font-thin font-serif cursor-pointer hover:underline"
    onClick={onClick}
  >
    {label}
  </span>
);

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (category) => {
    const queryParam = searchQuery ? encodeURIComponent(searchQuery) : "";
    router.push(`/news?category=${category}&query=${queryParam}`);
  };

  return (
    <nav className="m-0 p-0 bg-gray-200 space-y-0 ">
      <div className="flex flex-row items-center justify-between py-4 shadow-lg shadow-gray-300">
        <div className="text-2xl font-sans leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white ">
          News Feed
        </div>
        <div className="flex space-x-3">
          {Object.entries(categories).map(([label, value]) => (
            <NavLink
              key={value}
              label={label}
              onClick={() => handleNavigation(value)}
            />
          ))}
        </div>
        <div className="search flex flex-row">
          <Input
            className="px-3 mx-2"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="px-3 mx-2"
            variant="outline1"
            onClick={() => handleNavigation("search")}
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}
