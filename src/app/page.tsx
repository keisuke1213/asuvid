import { DisplayAllInfo } from "./displayInfo/displayAllInfo";
import { Header } from "./util/header";
import { callGetAllInfos } from "./serverAction/callGetAllInfo";

const Home = async () => {
  const infos = await callGetAllInfos();

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
      dates: info.dates.map((date) => ({
        ...date,
        date: removeLeadingZero(date.date), 
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
