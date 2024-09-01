import { DisplayAllInfo } from "./displayInfo/displayAllInfo";
import { Header } from "./common/header";
import { getAllInfos } from "./serverAction/getAllInfo";

const Home = async () => {
  const infos = await getAllInfos();
  const info = infos.map((info) => {
    return {
      id: info.id,
      name: info.name,
      content: info.content,
      deadline: new Date(info.deadline).toLocaleDateString(),
      formUrl: info.formUrl,
      dates: info.dates.map((date) => ({
        ...date,
        date: new Date(date.date).toLocaleDateString(), // 日付のフォーマットを統一
      })),
    };
  });
  return (
    <>
      <Header />
      <DisplayAllInfo info={info} />
    </>
  );
};

export default Home;
