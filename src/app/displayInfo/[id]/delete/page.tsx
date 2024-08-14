import { DisplayInfo } from "../../displayInfo";
import { Header } from "../../../common/header";
import DeleteModal from "../../modal/deleteModal";

const Delete = () => {
  return (
    <>
      <Header />
      <DisplayInfo />
      <DeleteModal open />
    </>
  );
};

export default Delete;
