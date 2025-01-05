import { Suspense } from "react";
import { InfoIndex } from "./displayInfo/InfoIndex";
import { Header } from "./ui/header/Header";
import { SearchResult } from "./displayInfo/SearchResult";
import { Box, Typography } from "@mui/material";
import { ListSkeleton } from "./ui/listSkeleton";

const titleStyle = {
  ml: 4,
  fontSize: "25px",
  fontWeight: "bold",
  "@media (min-width: 1200px)": {
    ml: 12,
    fontSize: "33px",
    mb: 3,
  },
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
      title = "終了";
      break;
    case "":
      title = "締切一覧";
      break;
    default:
      title = null;
      break;
  }

  return (
    <Box sx={{ pb: 3, mb: 3 }}>
      <Header props={query} />
      <Typography component="h1" gutterBottom sx={titleStyle}>
        {title}
      </Typography>
      {query ? (
        <Suspense key={query + currentPage} fallback={<ListSkeleton />}>
          <SearchResult query={query} currentPage={currentPage} />
        </Suspense>
      ) : (
        <Suspense fallback={<ListSkeleton />}>
          <InfoIndex />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
