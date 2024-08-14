import { DisplayInfo } from "../../displayInfo";
import { Header } from "../../../ui/header";
import DeleteModal from "../../modal/deleteModal";

const Delete = () => {
  return (
    <>
      <Header />
      <DisplayInfo  />
      <DeleteModal open />
    </>
  );
};

export default Delete;
