import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="m-0 p-0 bg-gray-200 space-y-0 ">
      <div className="flex flex-row items-center justify-evenly relative py-4 shadow-lg shadow-gray-300">
        <div className="items-center text-2xl font-sans leading-none tracking-tight text-gray-900 md:text-3xl lg:text-5xl dark:text-white ">
          News Feed
        </div>
        <div className="flex flex-row">
          <div className="px-3">
            <span className="text-xl font-thin font-serif">All News</span>
          </div>
          <div className="px-3">
            <span className="text-xl font-thin font-serif">Top Headlines</span>
          </div>
          <div className="px-3">
            <span className="text-xl font-thin font-serif">Sports</span>
          </div>
          <div className="px-3">
            <span className="text-xl font-thin font-serif">Business</span>
          </div>
        </div>
        <div className="search flex flex-row">
          <Input className="px-3 mx-2  " placeholder="Search" />
          <Button className="px-3 mx-2 " variant="outline1">
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
}
