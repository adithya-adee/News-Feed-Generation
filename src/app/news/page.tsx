"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/newsComp/navbar";
import Card from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { sendContent } from "../api/sendConent";

export default function News({
  searchParams,
}: {
  searchParams?: {
    category?: string;
    query?: string;
  };
}) {
  const { user } = useUser();
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("everything");
  const [query, setQuery] = useState<string>("all");
  const userId = localStorage.getItem("userId");

  const handleUserCheck = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/keyword?userId=${userId}`
      );
      const keywords = response.data ?? [];

      let searchQuery = "";
      if (keywords.length > 0) {
        const sp = keywords.slice(-2);
        searchQuery = sp.join(" ");
      } else {
        searchQuery = query;
        console.log(searchQuery);
      }

      // const apiKey = process.env.NEXT_PUBLIC_NEWS_API;
      const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&language=en&sortBy=popularity&apiKey=${apiKey}`;

      const newsResponse = await axios.get(url);
      setArticles(newsResponse.data.articles);
    } catch (err) {
      setError("Failed to fetch news articles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setQuery(searchParams?.query || "all");
    setCategory(searchParams?.category || "everything");
  }, [searchParams]);

  useEffect(() => {
    console.log(category);
    console.log(query);

    if (user) {
      localStorage.setItem("userId", user.id);
      handleUserCheck();
    }
  }, [user, category, query]);

  return (
    <div className="space-y-0">
      <Navbar />
      <div className="flex flex-wrap py-4 justify-center gap-x-3 bg-gradient-to-b from-gray-200 to white">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading articles...</p>
        ) : articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2">
              <Card
                imageUrl={article.urlToImage}
                title={article.title}
                description={article.description || "No description available"}
                link={article.url}
                onClick={() => sendContent(userId, article.description)}
              />
            </div>
          ))
        ) : (
          <p>No articles to display</p>
        )}
      </div>
    </div>
  );
}
