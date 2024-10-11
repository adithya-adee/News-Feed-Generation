"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/newsComp/navbar";
import Card from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { sendContent } from "../api/sendConent";

// const sampleArticles = [
//   {
//     title: "Sample Article 1",
//     description: "This is a description for sample article 1.",
//     url: "https://example.com/article1",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 2",
//     description: "This is a description for sample article 2.",
//     url: "https://example.com/article2",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 3",
//     description:
//       "This is a description for sample article 3.afs;jjlsjaljsldfjsjdaljf;ajfjlsajf;as;jdfjad;fjsd;",
//     url: "https://example.com/article3",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 4",
//     description: "This is a description for sample article 4.",
//     url: "https://example.com/article4",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
//   {
//     title: "Sample Article 5",
//     description: "This is a description for sample article 5.",
//     url: "https://example.com/article5",
//     urlToImage:
//       "https://media.cnn.com/api/v1/images/stellar/prod/2024-10-08t123501z-621383450-rc2agaayqjaj-rtrmadp-3-israel-palestinians-lebanon-20241010213710535.JPG?c=16x9&q=w_800,c_fill",
//   },
// ];

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
      const url =
        category === "everything"
          ? `https://newsapi.org/v2/everything?q=${query}&pageSize=20&language=en&sortBy=popularity&apiKey=${apiKey}`
          : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

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
      <div className="flex flex-wrap flex-grow py-4 justify-center gap-x-3 bg-gradient-to-b from-gray-300 to white">
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
        )}
      </div>
    </div>
  );
}
