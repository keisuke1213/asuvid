import { DisplayInfo } from "./displayInfo/displayInfo";
import { Header } from "./ui/header";

const Home = () => {
  return (
    <>
      <Header />
      <DisplayInfo open={false} />
    </>
  );
};

export default Home;
