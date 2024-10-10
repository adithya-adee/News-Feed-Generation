"use client";
import Navbar from "@/components/newsComp/navbar";
import Card from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

export default function News() {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const resData = {
    status: "ok",
    totalResults: 426,
    articles: [
      {
        source: {
          id: "espn",
          name: "ESPN",
        },
        author: "ESPN",
        title:
          "Weekend Review: Pulisic lights up Milan derby, Haaland reaches 100 goals",
        description:
          "Christian Pulisic scored again for Milan, this time in a Derby della Madonnina win, while Erling Haaland broke new ground. That and more in our Weekend Review.",
        url: "https://www.espn.com/soccer/story/_/id/41386621/european-soccer-weekend-review-premier-league-laliga-bundesliga-highlights-analysis",
        urlToImage:
          "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F0923%2Fr1390515_1296x729_16%2D9.jpg",
        publishedAt: "2024-09-23T02:25:11Z",
        content:
          "Sep 22, 2024, 10:16 PM ET\r\nAnother topsy-turvy weekend of European football action is in the books, with Christian Pulisic instrumental as AC Milan pipped Internazionale2-1 in the Derby della Madonni… [+12804 chars]",
      },
      {
        source: {
          id: null,
          name: "CNET",
        },
        author: "Sean Jackson",
        title:
          "How to Pick the Best Glasses for Your Face Shape and Skin Color",
        description:
          "Finding the perfect pair of glasses is difficult, but here's how to do so while considering your face shape, skin tone, lifestyle and personality.",
        url: "https://www.cnet.com/health/personal-care/how-to-pick-the-best-glasses-for-your-face-shape-and-skin-color/",
        urlToImage:
          "https://www.cnet.com/a/img/resize/920305a87d6e5ad164a0897d07882726d288b71a/hub/2024/08/19/e7cd3a67-26db-4c53-8b4b-3aeea193b780/person-trying-on-glasses.jpg?auto=webp&fit=crop&height=675&width=1200",
        publishedAt: "2024-09-19T15:00:04Z",
        content:
          "A new pair of glasses can completely transform your look. And you get multiple chances to show off the new you, too: glasses prescription expires every one to two years, so if you want to change thin… [+7077 chars]",
      },
      {
        source: {
          id: null,
          name: "HYPEBEAST",
        },
        author: "info@hypebeast.com (Hypebeast)",
        title: "The Endrick Era Is Fast Approaching",
        description:
          "For the average teenager, it’s an accomplishment to just play sports for their school or rec team. For Endrick, the Brazilian wonderkid had already signed for São Paulo’s Palmeiras by age 16, lighting up the Campeonato Brasileiro, playing 100 matches in the p…",
        url: "https://hypebeast.com/2024/9/endrick-gen-ea-sports-ambassador-program-interview",
        urlToImage:
          "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F09%2F26%2Fendrick-gen-ea-sports-ambassador-program-interview-tw.jpg?w=1080&cbr=1&q=90&fit=max",
        publishedAt: "2024-09-26T22:01:54Z",
        content:
          "For the average teenager, its an accomplishment to just play sports for their school or rec team. For Endrick, the Brazilian wonderkid had already signed for São Paulos Palmeiras by age 16, lighting … [+7387 chars]",
      },
      {
        source: {
          id: null,
          name: "PetaPixel",
        },
        author: "Pesala Bandara",
        title: "Study Reveals The Most Deepfaked People of 2024",
        description:
          "Donald Trump and Taylor Swift are some of the most deepfaked people of 2024, according to a study.\n[Read More]",
        url: "https://petapixel.com/2024/10/04/study-reveals-donald-trump-taylor-swift-elon-musk-the-most-deepfaked-people-celebrities-of-2024/",
        urlToImage:
          "https://petapixel.com/assets/uploads/2024/10/donald-trump-taylor-swift-most-deepfaked-celebrities-2024.jpg",
        publishedAt: "2024-10-04T14:00:36Z",
        content:
          "Donald Trump and Taylor Swift are some of the most deepfaked people of 2024, according to a study.\r\nIn new research, online image and video editing tool Kapwing set out to identify the influential pu… [+2539 chars]",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "Watch: Republic of Ireland lacking confidence - Hallgrimsson",
        description:
          'Republic of Ireland manager Heimir Hallgrimsson says the "jersey is a bit too heavy" for some of his players after the 2-0 defeat by Greece in the Nations League.',
        url: "https://www.bbc.com/sport/football/videos/crmwgvpkjn1o",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/0559/live/d4428d30-6fc0-11ef-b02d-c5f3b724a1ea.jpg",
        publishedAt: "2024-09-10T22:15:04Z",
        content:
          "'Ronaldo is not a footballer, he's a celebrity' Video, 00:03:20'Ronaldo is not a footballer, he's a celebrity'",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "This derby is bigger for Arsenal than Tottenham – Fabregas",
        description:
          "Former Arsenal midfielder Cesc Fabregas feels this weekend's North London derby is more important for the Gunners than it is for Tottenham.",
        url: "https://www.bbc.com/sport/football/videos/cpvyvkjk044o",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/bf89/live/76a63040-7106-11ef-b282-4535eb84fe4b.jpg",
        publishedAt: "2024-09-12T13:51:39Z",
        content:
          "'Ronaldo is not a footballer, he's a celebrity' Video, 00:03:20'Ronaldo is not a footballer, he's a celebrity'",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: "Ben Collins",
        title: "Why 'face of baseball' is on cusp of global stardom",
        description:
          "As Shohei Ohtani prepares for his MLB play-off debut, BBC Sport looks at how he has become one of the world's highest-paid athletes.",
        url: "https://www.bbc.com/sport/baseball/articles/cm29lvze0gyo",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_sport/18bc/live/07d83630-8241-11ef-83dd-fbf1b9732cf0.png",
        publishedAt: "2024-10-04T12:33:56Z",
        content:
          "Ohtani joined the Angels before the 2018 season and was named the American League's Rookie of the Year.\r\nAfter a couple of seasons disrupted by injury, Ohtani was named the AL's Most Valuable Player … [+1411 chars]",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: "George O'Neill",
        title: "Where did it go wrong for Naismith & what's next for Hearts?",
        description:
          "BBC Sport Scotland analyses the reasons behind Steven Naismith's sacking and considers what might come next for Heart of Midlothian.",
        url: "https://www.bbc.com/sport/football/articles/cr4x69w1nvgo",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_sport/644c/live/ceb11830-7864-11ef-8c1a-df523ba43a9a.jpg",
        publishedAt: "2024-09-23T07:00:03Z",
        content:
          "There has also been criticism of Hearts' transfer business over the summer.\r\nLeft-back James Penrice and midfield duo Blair Spittal and Yan Dhanda arrived on free transfers from fellow Premiership cl… [+1698 chars]",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: "BBC Sport",
        title: "Ronaldo wants De Bruyne at Al-Nassr - Sunday's gossip",
        description:
          "Cristiano Ronaldo want Man City's Kevin de Bruyne at Al-Nassr, Man Utd interested in Bayer Leverkusen boss Xabi Alonso, Robert Lewandowski has option to extend Barcelona deal.",
        url: "https://www.bbc.com/sport/football/articles/c3rl73ywj0jo",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_sport/32a8/live/b880dc10-835b-11ef-ad45-893aa022fcbc.png",
        publishedAt: "2024-10-05T21:41:27Z",
        content:
          "Cristiano Ronaldo wants Manchester City's Kevin de Bruyne at Al-Nassr, Manchester Utd interested in Bayer Leverkusen boss Xabi Alonso and Robert Lewandowski has option to extend Barcelona deal.\r\nAl-N… [+1409 chars]",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "'Ronaldo is not a footballer, he's a celebrity'",
        description:
          'The Monday Night Club\'s Chris Sutton and Rory Smith look at why Cristiano Ronaldo is "holding Portugal back" despite scoring in back-to-back Nations League games.',
        url: "https://www.bbc.com/sport/football/videos/c3w6gqd906lo",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/d5b7/live/2a204210-6f62-11ef-8c1a-df523ba43a9a.jpg",
        publishedAt: "2024-09-10T11:24:40Z",
        content:
          "'Ronaldo is not a footballer, he's a celebrity' Video, 00:03:20'Ronaldo is not a footballer, he's a celebrity'",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "'No-one knows the players better than Carsley'",
        description:
          "The Monday Night Club's Rory Smith and Conor Coady look at why Lee Carsley is in pole position for the England job, while Chris Sutton thinks Eddie Howe should get a chance.",
        url: "https://www.bbc.com/sport/football/videos/cq5dv28275no",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/0bcd/live/2f2e8cc0-6f63-11ef-b02d-c5f3b724a1ea.jpg",
        publishedAt: "2024-09-10T11:32:14Z",
        content:
          "'Ronaldo is not a footballer, he's a celebrity' Video, 00:03:20'Ronaldo is not a footballer, he's a celebrity'",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "Hill admits error but remains critical of Miami police",
        description:
          'Miami Dolphins star player Tyreek Hill says he could have handled the incident with the Miami Police better but says the officers involved "beat the dog" out of him.',
        url: "https://www.bbc.com/sport/american-football/videos/ckg5g2ng594o",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/c049/live/ae362590-70f4-11ef-8c1a-df523ba43a9a.jpg",
        publishedAt: "2024-09-12T11:01:49Z",
        content:
          "'Ronaldo is not a footballer, he's a celebrity' Video, 00:03:20'Ronaldo is not a footballer, he's a celebrity'",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "Ronaldo inspires me to play for as long as possible - Kane",
        description:
          'England captain Harry Kane says Cristiano Ronaldo, who scored his 901st career goal at the age of 39 against Scotland on Sunday, "inspires me to play for as long as possible".\nKane is set to earn his 100th international cap on Tuesday against Finland.',
        url: "https://www.bbc.com/sport/football/videos/ce81rw6268eo",
        urlToImage:
          "https://ichef.bbci.co.uk/ace/standard/1024/cpsprodpb/629c/live/fb684480-6ec2-11ef-8c1a-df523ba43a9a.jpg",
        publishedAt: "2024-09-09T15:59:55Z",
        content:
          'England captain Harry Kane says Cristiano Ronaldo, who scored his 901st career goal at the age of 39 against Scotland on Sunday, "inspires me to play for as long as possible".\r\nKane, 31, is set to ea… [+121 chars]',
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: null,
        title: "Cristiano Ronaldo hits 1bn social media followers",
        description:
          "The huge figure makes the footballer easily the most followed celebrity on the planet.",
        url: "https://www.bbc.com/news/articles/cn5r5nk4ry6o",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_news/4b33/live/12edab40-71c0-11ef-a237-49738a978907.jpg",
        publishedAt: "2024-09-13T12:00:49Z",
        content:
          "Cristiano Ronaldo has hit 1bn total followers across his various social media accounts - making him the first person to reach that mind-boggling figure.\r\nThe number is calculated by combining his tot… [+2468 chars]",
      },
      {
        source: {
          id: "al-jazeera-english",
          name: "Al Jazeera English",
        },
        author: "Al Jazeera",
        title:
          "Ronaldo becomes first individual with one billion social media followers",
        description:
          "Ronaldo surpasses 639 million followers on Instagram, 170 million on Facebook, 60 million on YouTube, 113 million on X.",
        url: "https://www.aljazeera.com/sports/2024/9/13/ronaldo-becomes-first-individual-with-one-billion-social-media-followers",
        urlToImage:
          "https://www.aljazeera.com/wp-content/uploads/2024/09/2024-08-29T153734Z_1462001497_UP1EK8T17ELMB_RTRMADP_3_SOCCER-CHAMPIONS-DRAW-1726237016.jpg?resize=1880%2C1080",
        publishedAt: "2024-09-13T14:37:53Z",
        content:
          "Portugal football icon Cristiano Ronaldo has attracted more than one billion followers across his social media accounts, aided by his newly launched YouTube channel, which has generated more than 60 … [+2989 chars]",
      },
      {
        source: {
          id: "al-jazeera-english",
          name: "Al Jazeera English",
        },
        author: "Al Jazeera",
        title:
          "Ronaldo urges Manchester United to ‘rebuild everything from the bottom’",
        description:
          "Former United star says manager Eric ten Hag must not be negative and say that the club can't win the Premier League.",
        url: "https://www.aljazeera.com/sports/2024/9/12/ronaldo-urges-manchester-united-to-rebuild-everything-from-the-bottom",
        urlToImage:
          "https://www.aljazeera.com/wp-content/uploads/2024/09/2022-11-06T151709Z_1670840470_UP1EIB616GKLL_RTRMADP_3_SOCCER-ENGLAND-AVA-MUN-REPORT-1726121964.jpg?resize=1813%2C1080",
        publishedAt: "2024-09-12T06:48:09Z",
        content:
          "Cristiano Ronaldo says his former club Manchester United must rebuild everything from the bottom up if they are to compete for the top football titles again.\r\nThe 39-year-old Portugal forward won thr… [+3574 chars]",
      },
      {
        source: {
          id: "al-jazeera-english",
          name: "Al Jazeera English",
        },
        author: "Al Jazeera",
        title:
          "I’m used to breaking records, I no longer look for them: Ronaldo",
        description:
          "Portugal and Al Nassr star forward says he's focused on enjoying football and winning games for his team.",
        url: "https://www.aljazeera.com/sports/2024/10/1/im-used-to-breaking-records-i-no-longer-look-for-them-ronaldo",
        urlToImage:
          "https://www.aljazeera.com/wp-content/uploads/2024/10/2024-10-01T094659Z_1187227323_RC29BAAVDS96_RTRMADP_3_SOCCER-SAUDI-RONALDO-1727788961.jpg?resize=1920%2C1440",
        publishedAt: "2024-10-01T13:37:24Z",
        content:
          "Cristiano Ronaldo insists he is focused on being the perfect team member at his Saudi Pro League club Al Nassr rather than collecting more individual accolades in the twilight of his career.\r\nThe 39-… [+2230 chars]",
      },
      {
        source: {
          id: "al-jazeera-english",
          name: "Al Jazeera English",
        },
        author: "Al Jazeera",
        title:
          "Ronaldo’s Saudi Pro League club Al Nassr parts ways with coach Luis Castro",
        description:
          "Portuguese coach Castro leaves after failing to land the league title during his first year in charge of the Saudi club.",
        url: "https://www.aljazeera.com/sports/2024/9/18/ronaldos-saudi-pro-league-club-al-nassr-parts-ways-with-coach-luis-castro",
        urlToImage:
          "https://www.aljazeera.com/wp-content/uploads/2024/09/2024-09-17T161627Z_2026357468_RC2JO9AYBNH0_RTRMADP_3_SOCCER-SAUDI-ANA-1726648666.jpg?resize=1200%2C630",
        publishedAt: "2024-09-18T09:35:28Z",
        content:
          "Saudi Pro League club Al Nassr have announced the departure of their Portuguese coach Luis Castro a day after starting their AFC Champions League Elite campaign with a disappointing draw.\r\nCastro lea… [+1859 chars]",
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: "Alex Brotherton",
        title: "Individual records not important anymore - Ronaldo",
        description:
          "Cristiano Ronaldo says it is not important whether or not he is the best player in the world and that he just wants to work for his team-mates.",
        url: "https://www.bbc.com/sport/articles/cgq843d881xo",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_sport/eff9/live/ef6138b0-7fe1-11ef-83dd-fbf1b9732cf0.jpg",
        publishedAt: "2024-10-01T11:44:46Z",
        content:
          'Cristiano Ronaldo says he "no longer cares" about being the best player in the world and is focused on helping his team-mates.\r\nRonaldo, 39, joined Saudi Pro League side Al-Nassr in January 2023 afte… [+1354 chars]',
      },
      {
        source: {
          id: null,
          name: "BBC News",
        },
        author: "BBC Sport",
        title:
          "Ronaldo criticises Ten Hag & says Man Utd must 'rebuild everything'",
        description:
          'Cristiano Ronaldo says Manchester United must "rebuild everything" in order to compete for the biggest prizes in club football again.',
        url: "https://www.bbc.com/sport/football/articles/czxlv57v707o",
        urlToImage:
          "https://ichef.bbci.co.uk/news/1024/branded_sport/fa5c/live/1ed38d10-7050-11ef-8724-35406148d765.jpg",
        publishedAt: "2024-09-11T16:41:20Z",
        content:
          '"What I wish for Manchester [United], it\'s what I wish for me - [to be] the best team they can.\r\n"I love that club... I\'m not that kind of guy that forgot the past."\r\nIn his six-year first spell at U… [+2352 chars]',
      },
    ],
  };

  useEffect(() => {
    const fetchArticles = () => {
      // Simulating an API call with a hardcoded response
      if (resData.status === "ok") {
        setArticles(resData.articles); // Set articles directly from the mock data
      } else {
        setError("Failed to fetch articles");
      }
    };

    fetchArticles();
  }, []);

  // useEffect(() => {

  //   // Fetch the news articles based on the query
  //   const fetchNews = async () => {
  //     let query = "ronaldo";
  //     const apiKey = process.env.NEXT_PUBLIC_NEWS_API;
  //     const url = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&language=en&sortBy=popularity&apiKey=${apiKey}`;

  //     try {
  //       // const response = await axios.get(url);
  //       // setArticles(response.data.articles);
  //       // console.log(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch news articles");
  //       console.error(err);
  //     }
  //   };

  //   fetchNews();
  // }, []);
  return (
    <div className="space-y-0">
      <Navbar />
      <div className="flex flex-wrap py-4 justify-center gap-x-3 bg-gradient-to-b from-gray-200 to white">
        {error && <p className="text-red-500">{error}</p>}

        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-2">
              <Card
                imageUrl={article.urlToImage}
                title={article.title}
                description={article.description || "No description available"}
                link={article.url}
              />
            </div>
          ))
        ) : (
          <p>Loading articles...</p>
        )}
      </div>
    </div>
  );
}
