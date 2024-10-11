"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = {
  "All News": "everything",
  "Top Headlines": "top-headlines",
};

const NavLink = ({ label, onClick }) => (
  <span
    className="relative font-sans text-lg font-semibold text-gray-900 hover:text-blue-600 
             before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] 
             before:bg-blue-600 before:scale-x-0 before:origin-left before:transition-transform 
             before:duration-300 hover:before:scale-x-100"
    onClick={onClick}
  >
    {label}
  </span>
);

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (category, extraQuery = "") => {
    let queryParam = searchQuery
      ? `${searchQuery} ${extraQuery}`.trim()
      : extraQuery;
    queryParam = encodeURIComponent(queryParam);
    router.push(`/news?category=${category}&query=${queryParam}`);
  };

  return (
    <nav className="m-0 p-0 bg-gray-200 w-full">
      <div className="flex flex-row lg:flex-row items-center justify-between py-4 shadow-lg shadow-gray-300">
        {/* News Feed Title */}
        <div className="text-2xl lg:ml-10 font-sans leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white ">
          News Feed
        </div>

        {/* Categories Section */}
        <div className="hidden md:inline">
          <div className="flex md:flex-row lg:space-x-6 space-y-2 lg:space-y-0 mt-3 lg:mt-0">
            {Object.entries(categories).map(([label, value]) => (
              <NavLink
                key={value}
                label={label}
                onClick={() => handleNavigation(value)}
              />
            ))}
          </div>
        </div>

        <div className="search flex flex-col lg:flex-row lg:space-x-3 space-y-2 lg:space-y-0 mt-3 lg:mt-0">
          <Input
            className="px-3 mx-2"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* <Button
            className="px-3 mx-2 lg:hidden" // Hidden on large screens, visible on small
            variant="outline1"
            onClick={() => handleNavigation("everything", "sports")}
          >
            Sports
          </Button>
          <Button
            className="px-3 mx-2 sm:hidden"
            variant="outline1"
            onClick={() => handleNavigation("everything", "business")}
          >
            Business
          </Button> */}

          <Button
            className="px-3 mx-2"
            variant="outline1"
            onClick={() => handleNavigation("everything")}
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}
