import { Suspense } from "react";
import { DisplayAllInfo } from "./displayInfo/displayAllInfo";
import { Header } from "./util/header/header";
import { SearchResult } from "./displayInfo/searchResult";
import { Box, Typography } from "@mui/material";

type Info = {
  id: number;
  name: string;
  content: string;
  deadline: string;
  formUrl: string;
  dates: Date[];
  status: string;
};

type Date = {
  id: number;
  date: string;
  infoId: number;
};

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  console.log(query);
  const currentPage = Number(searchParams?.page) || 1;

  let title: string | null = null;

  switch (query) {
    case "お知らせ":
      title = "お知らせ";
      break;
    case "清掃":
      title = "清掃";
      break;
    case "終了":
      title = "募集終了";
      break;
    case "":
      title = "募集一覧";
      break;
    default:
      title = null;
      break;
  }

  const fetchData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL_HOME;
    if (!apiUrl) {
      console.log("API URL is not defined");
    }
    try {
      const res = await fetch(apiUrl!, { cache: "no-store" });
      const data = await res.json();
      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return [];
    }
  };

  const infos: Info[] = await fetchData();

  const removeLeadingZero = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };
  console.log(infos);
  const info = infos.map((info) => {
    return {
      id: info.id,
      name: info.name,
      content: info.content,
      deadline: removeLeadingZero(info.deadline),
      formUrl: info.formUrl,
      status: info.status,
      dates: info.dates.map((date) => ({
        ...date,
        date: removeLeadingZero(date.date),
      })),
    };
  });
  return (
    <Box sx={{ pb: 2.5 }}>
      <Header />
      <Typography
        component="h1"
        gutterBottom
        sx={{ ml: 4, fontSize: "25px", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      {query ? (
        <Suspense key={query + currentPage} fallback={<div></div>}>
          <SearchResult query={query} currentPage={currentPage} />
        </Suspense>
      ) : (
        <Box>
          <DisplayAllInfo info={info} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
