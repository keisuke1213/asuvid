
import { Suspense } from "react";
import { DisplayAllInfo } from "./displayInfo/displayAllInfo";
import { Header } from "./util/header";
import { SearchResult } from "./displayInfo/searchResult";

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
  const currentPage = Number(searchParams?.page) || 1;
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
    <>
      <Header />
      {query ? (
        <Suspense key={query + currentPage} fallback={<div></div>}>
          <SearchResult query={query} currentPage={currentPage} />
        </Suspense>
      ) : (
        <>
          <DisplayAllInfo info={info} />
        </>
      )}
    </>
  );
};

export default Home;
